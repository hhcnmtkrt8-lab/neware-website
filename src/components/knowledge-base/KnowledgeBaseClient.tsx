"use client";

import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  Search,
  BookOpen,
  Settings,
  Cpu,
  BarChart3,
  FileText,
  Shield,
  Wrench,
  Zap,
  Gauge,
  Cable,
  ChevronRight,
  Clock,
  ArrowLeft,
  Download,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  categories,
  documents,
  type CategorySlug,
  type Document,
  type Category,
  getDocumentsByCategory,
  searchDocuments,
} from "@/data/knowledge-base";
import { getArticleContent } from "@/data/knowledge-base/articles";

// ── Precompiled regexes for markdown rendering ─────────────────────────────────
const RE_TABLE = /^\| /;
const RE_STEP = /^\*\*(?:步骤|Step)\s*(\d+)[：:]\s*(.+)\*\*$/;
const RE_SUBSTEP = /^\*\*(\d+)\.\s+(.+)\*\*$/;
const RE_HEADING_BOLD = /^\*\*([^*：:]+)[：:]\s*\*\*?$/;
const RE_FULL_BOLD = /^\*\*(.+)\*\*$/;
const RE_DL = /^\*\*(?:下载|Download)[：:]\s*([^*]+)\*\*/;
const RE_LIST = /^[*-] /;
const RE_NUM_LIST = /^(\d+)\.\s+(.+)$/;
const RE_SEP_ROW = /^[-:]+$/;
const RE_INLINE_BOLD_EM = /\*\*[^*]+\*\*|\*[^*]+\*/;

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Settings,
  Cpu,
  BarChart3,
  FileText,
  Shield,
  Wrench,
  Zap,
  Gauge,
  Cable,
};

function CategoryIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const Icon = iconMap[icon] ?? BookOpen;
  return <Icon className={className} />;
}

// ── Difficulty badge ─────────────────────────────────────────────────────────

const difficultyConfig = {
  beginner: { label: "初级", labelEn: "Beginner", color: "bg-emerald-100 text-emerald-700" },
  intermediate: { label: "中级", labelEn: "Intermediate", color: "bg-amber-100 text-amber-700" },
  advanced: { label: "高级", labelEn: "Advanced", color: "bg-red-100 text-red-700" },
};

// ── Software badge ───────────────────────────────────────────────────────────

const softwareConfig: Record<string, { label: string; labelEn: string; color: string }> = {
  BTS7: { label: "BTS7", labelEn: "BTS7", color: "bg-blue-100 text-blue-700" },
  BTS8: { label: "BTS8", labelEn: "BTS8", color: "bg-sky-100 text-sky-700" },
  BTS9: { label: "BTS9", labelEn: "BTS9", color: "bg-violet-100 text-violet-700" },
  BTSDA: { label: "BTSDA", labelEn: "BTSDA", color: "bg-purple-100 text-purple-700" },
  "N/A": { label: "通用", labelEn: "General", color: "bg-slate-100 text-slate-600" },
};

// ── Document Card ────────────────────────────────────────────────────────────

function DocumentCard({
  doc,
  isZh,
}: {
  doc: Document;
  isZh: boolean;
}) {
  const locale = isZh ? "zh" : "en";
  const [activeTab, setActiveTab] = useState<"zh" | "en">(
    isZh ? "zh" : "en"
  );

  const diff = difficultyConfig[doc.difficulty];
  const swCfg = softwareConfig[doc.software ?? "N/A"];

  return (
    <Card className="group hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-0.5">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <Badge className={swCfg.color} variant="secondary">
              {isZh ? swCfg.label : swCfg.labelEn}
            </Badge>
            <Badge className={diff.color} variant="secondary">
              {isZh ? diff.label : diff.labelEn}
            </Badge>
          </div>
          <span className="flex items-center gap-1 text-xs text-slate-400 shrink-0">
            <Clock className="h-3 w-3" />
            {doc.readingTime} min
          </span>
        </div>
        <CardTitle className="text-base leading-snug mt-2 group-hover:text-primary transition-colors">
          {isZh ? doc.title : doc.titleEn}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-xs">
          {isZh ? doc.summary : doc.summaryEn}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {(isZh ? doc.tags : doc.tagsEn)
            .slice(0, 5)
            .map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500"
              >
                {tag}
              </span>
            ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            {doc.lastUpdated}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-primary/70 hover:text-primary gap-1"
            onClick={() => setActiveTab(activeTab === "zh" ? "en" : "zh")}
          >
            {activeTab === "zh" ? "EN" : "中文"}
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Category Card ─────────────────────────────────────────────────────────────

function CategoryCard({
  category,
  isZh,
}: {
  category: Category;
  isZh: boolean;
}) {
  const docs = getDocumentsByCategory(category.slug).slice(0, 3);
  const count = getDocumentsByCategory(category.slug).length;

  return (
    <Card className="group hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden">
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: category.color }}
      />
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg"
            style={{ backgroundColor: category.color }}
          >
            <CategoryIcon
              icon={category.icon}
              className="h-5 w-5"
            />
          </div>
          <div>
            <CardTitle className="text-base">
              {isZh ? category.label : category.labelEn}
            </CardTitle>
            <p className="text-xs text-slate-400">
              {count} {isZh ? "篇文档" : "documents"}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-slate-500 line-clamp-2 mb-3">
          {isZh ? category.description : category.descriptionEn}
        </p>
        <div className="space-y-1.5">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center gap-2 text-xs text-slate-600 hover:text-primary transition-colors"
            >
              <ChevronRight
                className="h-3 w-3 shrink-0"
                style={{ color: category.color }}
              />
              <span className="line-clamp-1">
                {isZh ? doc.title : doc.titleEn}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Article View ─────────────────────────────────────────────────────────────

function ArticleView({
  doc,
  isZh,
  onBack,
}: {
  doc: Document;
  isZh: boolean;
  onBack: () => void;
}) {
  const content = getArticleContent(doc.id);
  const diff = difficultyConfig[doc.difficulty];
  const swCfg = softwareConfig[doc.software ?? "N/A"];

  const relatedDocs = (doc.relatedDocIds ?? [])
    .map((id) => documents.find((d) => d.id === id))
    .filter(Boolean) as Document[];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="mb-6 gap-2 text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" />
        {isZh ? "返回知识库" : "Back to Knowledge Base"}
      </Button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className={swCfg.color} variant="secondary">
            {isZh ? swCfg.label : swCfg.labelEn}
          </Badge>
          <Badge className={diff.color} variant="secondary">
            {isZh ? diff.label : diff.labelEn}
          </Badge>
          <Badge variant="secondary" className="bg-slate-100 text-slate-600">
            <Clock className="h-3 w-3 mr-1" />
            {doc.readingTime} {isZh ? "分钟" : "min read"}
          </Badge>
        </div>
        <h1 className="text-3xl font-heading font-bold text-slate-900 mb-3">
          {isZh ? doc.title : doc.titleEn}
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          {isZh ? doc.summary : doc.summaryEn}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {(isZh ? doc.tags : doc.tagsEn).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      {content ? (
        <div className="space-y-8">
          {content.sections.map((section, idx) => (
            <section key={idx}>
              <h2
                className="text-xl font-heading font-bold text-slate-800 mb-4 pb-2 border-b border-slate-200"
                style={{ borderColor: "#e2e8f0" }}
              >
                <span className="text-primary mr-2">{idx + 1}.</span>
                {isZh ? section.heading : section.headingEn}
              </h2>
              <div className="prose prose-slate prose-sm max-w-none">
                <div
                  className="text-slate-700 leading-relaxed whitespace-pre-wrap"
                  style={{ fontFamily: "inherit" }}
                >
                  {/* Simple markdown-like rendering */}
                  {renderMarkdown(isZh ? section.content : section.contentEn)}
                </div>
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-400">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>
            {isZh ? "详细文档内容正在整理中..." : "Detailed content coming soon..."}
          </p>
        </div>
      )}

      {/* Related documents */}
      {relatedDocs.length > 0 && (
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-heading font-bold text-slate-800 mb-4">
            {isZh ? "相关文档" : "Related Documents"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedDocs.map((rel) => (
              <Card
                key={rel.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-slate-800 line-clamp-1">
                    {isZh ? rel.title : rel.titleEn}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                    {isZh ? rel.summary : rel.summaryEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Enhanced markdown renderer ───────────────────────────────────────────────────

function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Table rows
    if (RE_TABLE.test(line) && line.endsWith(" |")) {
      const tableRows: string[] = [];
      while (i < lines.length && RE_TABLE.test(lines[i]) && lines[i].endsWith(" |")) {
        tableRows.push(lines[i]);
        i++;
      }
      elements.push(
        <div key={`table-${elements.length}`} className="overflow-x-auto my-4 rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <tbody>
              {tableRows.map((row, ri) => {
                const cells = row.split("|").slice(1, -1).map((c) => c.trim());
                const isSep = cells.every((c) => RE_SEP_ROW.test(c));
                if (isSep) return null;
                return (
                  <tr key={ri} className={ri % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                    {cells.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-4 py-2.5 text-slate-700 ${
                          ri === 0 ? "font-semibold text-slate-800" : ""
                        }`}
                      >
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Step marker
    const stepMatch = line.match(RE_STEP);
    if (stepMatch) {
      const num = stepMatch[1];
      const rest = stepMatch[2];
      elements.push(
        <div key={`step-${elements.length}`} className="flex gap-3 mt-4 mb-2">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
            {num}
          </div>
          <div className="flex-1 pt-1">
            <p className="font-semibold text-slate-800 leading-relaxed">{renderInline(rest)}</p>
          </div>
        </div>
      );
      i++;
      continue;
    }

    // Sub-step
    const subStepMatch = line.match(RE_SUBSTEP);
    if (subStepMatch) {
      elements.push(
        <p key={`substep-${elements.length}`} className="font-semibold text-slate-800 mt-3 mb-1 ml-4 leading-relaxed">
          {subStepMatch[1]}. {renderInline(subStepMatch[2])}
        </p>
      );
      i++;
      continue;
    }

    // Heading bold line
    const headingMatch = line.match(RE_HEADING_BOLD);
    if (headingMatch) {
      elements.push(
        <p key={`heading-${elements.length}`} className="font-semibold text-slate-800 mt-4 mb-2 leading-relaxed">
          {headingMatch[1]}
        </p>
      );
      i++;
      continue;
    }

    // Full bold line (no colon)
    const fullBoldMatch = line.match(RE_FULL_BOLD) && !line.includes("：") && !line.includes(":");
    if (fullBoldMatch) {
      elements.push(
        <p key={`bold-${elements.length}`} className="font-semibold text-slate-800 mt-3 mb-1 leading-relaxed">
          {renderInline(line.slice(2, -2))}
        </p>
      );
      i++;
      continue;
    }

    // Download link
    const dlMatch = line.match(RE_DL);
    if (dlMatch) {
      elements.push(
        <div key={`dl-${elements.length}`} className="flex items-center gap-2 my-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <span className="text-sm text-blue-700 font-medium">{renderInline(line.replace(/\*\*/g, "").trim())}</span>
        </div>
      );
      i++;
      continue;
    }

    // List item
    if (RE_LIST.test(line)) {
      const content = line.slice(2);
      elements.push(
        <li key={`li-${elements.length}`} className="ml-5 text-slate-700 mb-1 leading-relaxed list-disc">
          {renderInline(content)}
        </li>
      );
      i++;
      continue;
    }

    // Numbered list
    const numListMatch = line.match(RE_NUM_LIST);
    if (numListMatch) {
      elements.push(
        <li key={`nli-${elements.length}`} className="ml-5 text-slate-700 mb-1 leading-relaxed list-decimal">
          {renderInline(numListMatch[2])}
        </li>
      );
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Regular paragraph with bold
    if (line.includes("**")) {
      elements.push(
        <p key={`para-${elements.length}`} className="text-slate-700 mb-2 leading-relaxed">
          {renderInline(line)}
        </p>
      );
    } else {
      elements.push(
        <p key={`plain-${elements.length}`} className="text-slate-700 mb-2 leading-relaxed">
          {line}
        </p>
      );
    }
    i++;
  }

  return <>{elements}</>;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(RE_INLINE_BOLD_EM);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-slate-800">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={idx} className="italic text-slate-600">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

// ── Main Knowledge Base Client ─────────────────────────────────────────────────

export default function KnowledgeBaseClient() {
  const params = useParams();
  const locale = (params.locale as string) || "zh";
  const isZh = locale === "zh";

  const [view, setView] = useState<"home" | "category" | "article">("home");
  const [activeCategory, setActiveCategory] = useState<CategorySlug | null>(null);
  const [activeDoc, setActiveDoc] = useState<Document | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSoftware, setSelectedSoftware] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  const softwareFilters = [
    { value: "all", label: isZh ? "全部软件" : "All Software" },
    { value: "BTS8", label: "BTS8.0" },
    { value: "BTS9", label: "BTS9" },
    { value: "BTSDA", label: "BTSDA" },
    { value: "N/A", label: isZh ? "通用" : "General" },
  ];

  const difficultyFilters = [
    { value: "all", label: isZh ? "全部难度" : "All Levels" },
    { value: "beginner", label: isZh ? "初级" : "Beginner" },
    { value: "intermediate", label: isZh ? "中级" : "Intermediate" },
    { value: "advanced", label: isZh ? "高级" : "Advanced" },
  ];

  const filteredDocs = (() => {
    let docs = searchQuery ? searchDocuments(searchQuery) : documents;
    if (selectedSoftware !== "all") {
      docs = docs.filter((d) => d.software === selectedSoftware);
    }
    if (selectedDifficulty !== "all") {
      docs = docs.filter((d) => d.difficulty === selectedDifficulty);
    }
    return docs;
  })();

  const handleCategoryClick = useCallback((slug: CategorySlug) => {
    setActiveCategory(slug);
    setView("category");
  }, []);

  const handleDocClick = useCallback((doc: Document) => {
    setActiveDoc(doc);
    setView("article");
  }, []);

  const handleBack = useCallback(() => {
    if (view === "article") {
      setView(activeCategory ? "category" : "home");
      setActiveDoc(null);
    } else if (view === "category") {
      setView("home");
      setActiveCategory(null);
    }
  }, [view, activeCategory]);

  const categoryDocs = activeCategory
    ? getDocumentsByCategory(activeCategory)
    : [];

  return (
    <div id="main-content" className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary via-primary to-blue-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-heading font-bold mb-3">
            {isZh ? "技术支持知识库" : "Technical Knowledge Base"}
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            {isZh
              ? "新威尔电池测试系统完整技术文档，包含 BTS4000/BTS9000 软件操作、测试工艺配置、数据分析方法和国际标准应用指南。"
              : "Complete technical documentation for Neware battery testing systems, covering BTS4000/BTS9000 software operation, test profile configuration, data analysis methods, and international standard application guides."}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb / Back */}
        {view !== "home" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="mb-6 gap-2 text-slate-500"
          >
            <ArrowLeft className="h-4 w-4" />
            {isZh ? "返回" : "Back"}
          </Button>
        )}

        {/* ── Home View ─────────────────────────────────────────────── */}
        {view === "home" && (
          <>
            {/* Search & Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder={isZh ? "搜索文档标题、内容或标签..." : "Search documents..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-slate-200 focus:border-primary/50"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <select
                    value={selectedSoftware}
                    onChange={(e) => setSelectedSoftware(e.target.value)}
                    className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-600 focus:outline-none focus:border-primary/50"
                  >
                    {softwareFilters.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-600 focus:outline-none focus:border-primary/50"
                  >
                    {difficultyFilters.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {searchQuery && (
                <p className="text-sm text-slate-500 mt-2">
                  {isZh ? "找到" : "Found"}{" "}
                  <strong className="text-primary">{filteredDocs.length}</strong>{" "}
                  {isZh ? "篇文档" : "documents"}
                  {selectedSoftware !== "all" && ` (${softwareFilters.find((f) => f.value === selectedSoftware)?.label})`}
                </p>
              )}
            </div>

            {/* Search Results */}
            {searchQuery ? (
              <div className="mb-8">
                <h2 className="text-xl font-heading font-bold text-slate-800 mb-4">
                  {isZh ? "搜索结果" : "Search Results"}
                </h2>
                {filteredDocs.length === 0 ? (
                  <div className="text-center py-16 text-slate-400">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>{isZh ? "未找到相关文档" : "No documents found"}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDocs.map((doc) => (
                      <div
                        key={doc.id}
                        onClick={() => handleDocClick(doc)}
                        className="cursor-pointer"
                      >
                        <DocumentCard doc={doc} isZh={isZh} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Categories Grid */}
                <div className="mb-12">
                  <h2 className="text-xl font-heading font-bold text-slate-800 mb-6">
                    {isZh ? "文档分类" : "Categories"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((cat) => (
                      <div
                        key={cat.slug}
                        onClick={() => handleCategoryClick(cat.slug)}
                        className="cursor-pointer"
                      >
                        <CategoryCard category={cat} isZh={isZh} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Documents */}
                <div>
                  <h2 className="text-xl font-heading font-bold text-slate-800 mb-6">
                    {isZh ? "全部文档" : "All Documents"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents.slice(0, 9).map((doc) => (
                      <div
                        key={doc.id}
                        onClick={() => handleDocClick(doc)}
                        className="cursor-pointer"
                      >
                        <DocumentCard doc={doc} isZh={isZh} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* ── Category View ─────────────────────────────────────────── */}
        {view === "category" && activeCategory && (
          <>
            {(() => {
              const cat = categories.find((c) => c.slug === activeCategory);
              if (!cat) return null;
              return (
                <>
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
                        style={{ backgroundColor: cat.color }}
                      >
                        <CategoryIcon icon={cat.icon} className="h-5 w-5" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-heading font-bold text-slate-900">
                          {isZh ? cat.label : cat.labelEn}
                        </h1>
                        <p className="text-sm text-slate-500">
                          {isZh ? cat.description : cat.descriptionEn}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryDocs.map((doc) => (
                      <div
                        key={doc.id}
                        onClick={() => handleDocClick(doc)}
                        className="cursor-pointer"
                      >
                        <DocumentCard doc={doc} isZh={isZh} />
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </>
        )}

        {/* ── Article View ──────────────────────────────────────────── */}
        {view === "article" && activeDoc && (
          <ArticleView
            doc={activeDoc}
            isZh={isZh}
            onBack={handleBack}
          />
        )}

        {/* Related Downloads Section */}
        <div className="mt-12 bg-gradient-to-br from-primary/5 to-blue-50/20 rounded-2xl p-6 border border-primary/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              {isZh ? "热门下载资源" : "Popular Downloads"}
            </h2>
            <Link
              href={`/${params.locale}/downloads`}
              className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
            >
              {isZh ? "查看全部" : "View all"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                title: isZh ? "BTS9000 软件" : "BTS9000 Software",
                desc: isZh ? "最新版 BTS9.0 软件包" : "Latest BTS9.0 Software Package",
                icon: "📦",
              },
              {
                title: isZh ? "产品目录" : "Product Catalog",
                desc: isZh ? "500+ 型号完整产品目录" : "Complete catalog with 500+ models",
                icon: "📚",
              },
              {
                title: isZh ? "技术规格书" : "Technical Datasheets",
                desc: isZh ? "各系列设备详细技术规格" : "Detailed specs for all series",
                icon: "📄",
              },
              {
                title: isZh ? "操作手册" : "Operation Manuals",
                desc: isZh ? "软件操作与配置指南" : "Software operation guides",
                icon: "📘",
              },
            ].map((item, idx) => (
              <Link key={idx} href={`/${params.locale}/downloads`}>
                <Card className="group hover:shadow-md hover:border-primary/20 transition-all cursor-pointer h-full">
                  <CardContent className="p-4 text-center">
                    <span className="text-3xl mb-3 block">{item.icon}</span>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
