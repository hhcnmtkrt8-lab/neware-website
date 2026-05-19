// Smart document retrieval for Q&A system
// Combines n-gram tokenization (Chinese-friendly) + keyword boost + section matching

import { documents, type Document } from "./index";
import { getArticleContent, type ArticleContent } from "./articles";

export type QARetrievedDoc = {
  doc: Document;
  score: number;
  matchedSections: string[];
};

// ── Tokenization (handles both Chinese characters and English words) ───────────

function isChineseChar(char: string): boolean {
  const code = char.charCodeAt(0);
  return code >= 0x4e00 && code <= 0x9fff;
}

function tokenize(text: string): string[] {
  // Split into Chinese chars and English words
  const tokens: string[] = [];
  let currentWord = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i].toLowerCase();

    if (isChineseChar(char)) {
      // Flush any pending English word
      if (currentWord.length > 1) tokens.push(currentWord);
      currentWord = "";
      // Push single Chinese char
      tokens.push(char);
      // Also push 2-char and 3-char n-grams for better matching
      if (i + 1 < text.length && isChineseChar(text[i + 1])) {
        tokens.push(char + text[i + 1].toLowerCase());
        if (i + 2 < text.length && isChineseChar(text[i + 2])) {
          tokens.push(char + text[i + 1].toLowerCase() + text[i + 2].toLowerCase());
        }
      }
    } else if (/[a-z0-9]/.test(char)) {
      currentWord += char;
    } else {
      if (currentWord.length > 1) tokens.push(currentWord);
      currentWord = "";
    }
  }
  if (currentWord.length > 1) tokens.push(currentWord);

  return [...new Set(tokens.filter((t) => t.length > 0))];
}

// ── N-gram TF-IDF ─────────────────────────────────────────────────────────────

function termFrequency(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  for (const token of tokens) {
    tf.set(token, (tf.get(token) ?? 0) + 1);
  }
  for (const [k, v] of tf) {
    tf.set(k, v / tokens.length);
  }
  return tf;
}

function inverseDocFrequency(corpus: string[][]): Map<string, number> {
  const idf = new Map<string, number>();
  const N = corpus.length;
  const df = new Map<string, number>();

  for (const doc of corpus) {
    const seen = new Set<string>();
    for (const token of doc) {
      if (!seen.has(token)) {
        df.set(token, (df.get(token) ?? 0) + 1);
        seen.add(token);
      }
    }
  }

  for (const [token, freq] of df) {
    idf.set(token, Math.log(N / (freq + 1)) + 1);
  }
  return idf;
}

function cosineSim(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (const [t, va] of a) {
    const vb = b.get(t) ?? 0;
    dot += va * vb;
    normA += va * va;
  }
  for (const [, vb] of b) {
    normB += vb * vb;
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-10);
}

// ── Keyword boost (exact match terms get a heavy boost) ──────────────────────

const PRODUCT_KEYWORDS_ZH = ["bts4000", "bts8000", "bts9000", "btsda", "ce6000", "igbt"];
const PRODUCT_KEYWORDS_EN = ["bts4000", "bts8000", "bts9000", "btsda", "ce6000", "igbt"];
const METHOD_KEYWORDS_ZH = [
  "dcir", "脉冲", "循环", "充电", "放电", "故障", "连接", "设置", "安装", "配置",
  "测试", "数据", "备份", "导出", "保护模式", "入门", "快速",
];
const METHOD_KEYWORDS_EN = [
  "dcir", "pulse", "cycle", "charge", "discharge", "fault", "connection", "setup",
  "installation", "configuration", "test", "data", "backup", "export", "protection mode",
  "quickstart", "guide",
];

function keywordBoost(tokens: string[], docTokens: string[]): number {
  const docSet = new Set(docTokens);
  let boost = 0;

  const qLower = tokens.join(" ").toLowerCase();

  for (const kw of [...PRODUCT_KEYWORDS_ZH, ...PRODUCT_KEYWORDS_EN]) {
    if (docSet.has(kw)) boost += 0.1;
  }
  for (const kw of [...METHOD_KEYWORDS_ZH, ...METHOD_KEYWORDS_EN]) {
    if (qLower.includes(kw) && docSet.has(kw)) boost += 0.05;
  }

  return boost;
}

// ── Build corpus ─────────────────────────────────────────────────────────────

function buildCorpus(): { tokens: string[][]; contentMap: Map<string, string> } {
  const tokens: string[][] = [];
  const contentMap = new Map<string, string>();

  for (const doc of documents) {
    const article = getArticleContent(doc.id);
    const textParts: string[] = [];

    if (article) {
      for (const section of article.sections) {
        textParts.push(section.content);
        textParts.push(section.heading);
        textParts.push(section.contentEn);
        textParts.push(section.headingEn);
      }
    }

    textParts.push(doc.summary, doc.summaryEn);
    textParts.push(...doc.tags, ...doc.tagsEn);

    const text = textParts.join(" ");
    const docTokens = tokenize(text);
    tokens.push(docTokens);
    contentMap.set(doc.id, text);
  }

  return { tokens, contentMap };
}

const corpus = buildCorpus();
const idf = inverseDocFrequency(corpus.tokens);

// ── Score a document ──────────────────────────────────────────────────────────

// ── Relevance ratio check: if query tokens barely overlap with doc, lower confidence ──

function relevanceRatio(queryTokens: string[], docTokens: string[]): number {
  if (queryTokens.length === 0) return 0;
  const docSet = new Set(docTokens);
  const overlap = queryTokens.filter((t) => docSet.has(t)).length;
  return overlap / queryTokens.length;
}

function scoreDocument(docId: string, queryTokens: string[]): number {
  const idx = documents.findIndex((d) => d.id === docId);
  if (idx < 0) return 0;

  const docTokens = corpus.tokens[idx];
  if (!docTokens || docTokens.length === 0) return 0;

  const qTF = termFrequency(queryTokens);
  const dTF = termFrequency(docTokens);

  const qTFIDF = new Map<string, number>();
  const dTFIDF = new Map<string, number>();

  for (const [t, val] of qTF) {
    qTFIDF.set(t, val * (idf.get(t) ?? 1));
  }
  for (const [t, val] of dTF) {
    dTFIDF.set(t, val * (idf.get(t) ?? 1));
  }

  const baseScore = cosineSim(qTFIDF, dTFIDF);
  const boost = keywordBoost(queryTokens, docTokens);
  const ratio = relevanceRatio(queryTokens, docTokens);

  return Math.min((baseScore + boost) * (0.3 + ratio * 0.7), 1.0);
}

// ── Find matched sections ────────────────────────────────────────────────────

function findMatchedSections(doc: Document, queryTokens: string[]): string[] {
  const article = getArticleContent(doc.id);
  if (!article) return [];

  const matched: Array<{ sectionIdx: number; score: number; preview: string; heading: string }> = [];
  const querySet = new Set(queryTokens);

  for (let i = 0; i < article.sections.length; i++) {
    const section = article.sections[i];
    const sectionText = section.content + " " + section.heading;
    const sectionTokens = tokenize(sectionText);
    const intersection = sectionTokens.filter((t) => querySet.has(t));

    if (intersection.length > 0) {
      const preview = section.content
        .replace(/\*\*+/g, "")
        .replace(/\n+/g, " ")
        .trim()
        .slice(0, 280);

      matched.push({
        sectionIdx: i,
        score: intersection.length,
        preview: `【${section.heading}】${preview}${preview.length >= 280 ? "..." : ""}`,
        heading: section.heading,
      });
    }
  }

  matched.sort((a, b) => b.score - a.score);
  return matched.slice(0, 3).map((m) => m.preview);
}

// ── Fallback: keyword-only search (for Chinese queries with no n-gram overlap) ─

function keywordOnlySearch(query: string): QARetrievedDoc[] {
  const qLower = query.toLowerCase();
  const results: QARetrievedDoc[] = [];

  for (const doc of documents) {
    const article = getArticleContent(doc.id);
    let matchScore = 0;
    let matchedSections: string[] = [];

    // Check title
    if (doc.title.toLowerCase().includes(qLower) || doc.titleEn.toLowerCase().includes(qLower)) {
      matchScore += 5;
    }

    // Check tags
    const tagMatches = [...doc.tags, ...doc.tagsEn].filter(
      (t) => t.toLowerCase().includes(qLower) || qLower.includes(t.toLowerCase())
    );
    matchScore += tagMatches.length * 2;

    // Check article sections
    if (article) {
      for (let i = 0; i < article.sections.length; i++) {
        const section = article.sections[i];
        const sText = (section.content + section.heading + section.contentEn + section.headingEn).toLowerCase();
        if (sText.includes(qLower)) {
          matchScore += 1;
          if (matchedSections.length < 3) {
            const preview = section.content.replace(/\*\*+/g, "").replace(/\n+/g, " ").trim().slice(0, 200);
            matchedSections.push(`【${section.heading}】${preview}...`);
          }
        }
      }
    }

    if (matchScore > 0) {
      results.push({ doc, score: matchScore, matchedSections });
    }
  }

  results.sort((a, b) => b.score - a.score);
  // Normalize keyword scores to 0-1 range, but only if there's actual signal
  const maxScore = results[0]?.score ?? 0;
  if (maxScore === 0) return [];
  return results.slice(0, 3).map((r) => ({ ...r, score: r.score / maxScore }));
}

// ── Main retrieval ───────────────────────────────────────────────────────────

export function retrieveRelevantDocuments(question: string, topK = 3): QARetrievedDoc[] {
  const queryTokens = tokenize(question);
  if (queryTokens.length === 0) return [];

  // Method 1: N-gram TF-IDF scoring
  const tfidfResults = documents.map((doc) => ({
    doc,
    score: scoreDocument(doc.id, queryTokens),
    matchedSections: findMatchedSections(doc, queryTokens),
  }));

  tfidfResults.sort((a, b) => b.score - a.score);

  // Method 2: Keyword-only fallback
  const keywordResults = keywordOnlySearch(question);

  // Combine: use whichever has a higher top score
  // If TF-IDF top score is very low, query is likely garbage/no-match — use keyword search
  const tfidfTop = tfidfResults[0]?.score ?? 0;
  const keywordTop = keywordResults[0]?.score ?? 0;

  // Threshold: if TF-IDF best match is weak (<0.05) and keyword search also weak, return empty
  if (tfidfTop < 0.05 && keywordTop < 0.5) {
    return [];
  }

  if (tfidfTop > keywordTop) {
    return tfidfResults.slice(0, topK);
  } else if (keywordTop > 0) {
    return keywordResults.slice(0, topK);
  } else {
    return [];
  }
}

// ── Answer builder ───────────────────────────────────────────────────────────

export type QAResult = {
  answer: string;
  answerEn: string;
  confidence: number;
  sources: Array<{
    docId: string;
    title: string;
    titleEn: string;
    excerpt: string;
    url: string;
  }>;
};

function buildAnswer(question: string, retrieved: QARetrievedDoc[], isZh: boolean): string {
  if (retrieved.length === 0 || retrieved.every((r) => r.score < 0.01)) {
    return isZh
      ? "抱歉，我目前没有找到与您问题相关的文档信息。请尝试用不同的关键词描述问题（如「BTS4000连接」或「DCIR测试」），或者联系我们的技术支持团队获取帮助。"
      : "Sorry, I couldn't find relevant information in the knowledge base for your question. Try different keywords (e.g. 'BTS4000 connection' or 'DCIR test'), or contact our technical support team for assistance.";
  }

  const top = retrieved[0];
  const topDoc = top.doc;
  const article = getArticleContent(topDoc.id);
  const title = isZh ? topDoc.title : topDoc.titleEn;

  if (article && article.sections.length > 0) {
    // Pick the section with the most matches
    const bestSectionIdx =
      top.matchedSections.length > 0
        ? top.matchedSections[0].match(/^【(.+?)】/)?.[1]
          ? 0
          : 0
        : 0;

    const section = article.sections[bestSectionIdx] ?? article.sections[0];
    const sectionTitle = isZh ? section.heading : section.headingEn;
    const sectionContent = (isZh ? section.content : section.contentEn)
      .replace(/\*\*+/g, "")
      .replace(/\n+/g, " ")
      .trim()
      .slice(0, 500);

    const body = `${sectionTitle}\n\n${sectionContent}${sectionContent.length >= 500 ? "..." : ""}`;

    if (isZh) {
      return `根据知识库文档《${title}》，相关答案如下：\n\n${body}\n\n如果这个回答没有完全解决您的问题，您可以查看完整文档获取更多详细信息。`;
    } else {
      return `Based on the knowledge base document "${title}", here is the relevant answer:\n\n${body}\n\nIf this answer doesn't fully address your question, please refer to the full document for more details.`;
    }
  }

  const summary = isZh ? topDoc.summary : topDoc.summaryEn;
  if (isZh) {
    return `根据知识库文档《${title}》：\n\n${summary}\n\n您可以在知识库中查看完整文档获取详细步骤和说明。`;
  } else {
    return `Based on the knowledge base document "${title}":\n\n${summary}\n\nYou can view the full document in the knowledge base for detailed steps and instructions.`;
  }
}

export function answerQuestion(question: string, locale = "zh"): QAResult {
  const isZh = locale === "zh";
  const retrieved = retrieveRelevantDocuments(question, 3);

  const answer = buildAnswer(question, retrieved, isZh);
  const confidence = Math.round((retrieved[0]?.score ?? 0) * 100);

  const sources = retrieved.slice(0, 2).map(({ doc, matchedSections }) => ({
    docId: doc.id,
    title: isZh ? doc.title : doc.titleEn,
    titleEn: doc.titleEn,
    excerpt:
      matchedSections[0] ??
      (isZh ? doc.summary : doc.summaryEn).slice(0, 200),
    url: `/${locale}/knowledge-base`,
  }));

  return { answer, answerEn: answer, confidence, sources };
}
