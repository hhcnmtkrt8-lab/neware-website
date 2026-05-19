"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  Send,
  Bot,
  User,
  BookOpen,
  ChevronDown,
  ExternalLink,
  Copy,
  CheckCheck,
  Zap,
  MessageSquare,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: QASource[];
  confidence?: number;
  timestamp: Date;
};

export type QASource = {
  docId: string;
  title: string;
  titleEn: string;
  excerpt: string;
  url: string;
};

export type QAAPIResponse = {
  success: boolean;
  answer: string;
  confidence: number;
  sources: QASource[];
  question: string;
  locale: string;
};

const SUGGESTED_QUESTIONS_ZH = [
  "BTS4000 如何连接电脑？",
  "DCIR 测试怎么做？",
  "BTS8.0 脉冲测试设置步骤",
  "循环寿命测试的工艺配置",
  "通道进入保护模式怎么办？",
];

const SUGGESTED_QUESTIONS_EN = [
  "How to connect BTS4000 to PC?",
  "How to perform DCIR test?",
  "BTS8.0 pulse test setup steps",
  "Cycle life test recipe configuration",
  "Channel entered protection mode — what to do?",
];

function MessageBubble({
  message,
  locale,
  onSourceClick,
}: {
  message: ChatMessage;
  locale: string;
  onSourceClick?: (source: QASource) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isZh = locale === "zh";

  return (
    <div
      className={cn(
        "flex gap-3 w-full animate-in slide-in-from-bottom-2",
        message.role === "user" ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold shadow-sm",
          message.role === "user"
            ? "bg-primary shadow-primary/30"
            : "bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-200"
        )}
      >
        {message.role === "user" ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          "flex flex-col gap-2 max-w-[75%]",
          message.role === "user" ? "items-end" : "items-start"
        )}
      >
        {/* Content */}
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
            message.role === "user"
              ? "bg-primary text-white rounded-tr-sm shadow-primary/20"
              : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm"
          )}
        >
          {message.content}
        </div>

        {/* Sources */}
        {message.role === "assistant" && message.sources && message.sources.length > 0 && (
          <div className="w-full max-w-lg">
            <button
              onClick={() => setSourcesOpen((o) => !o)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors mb-1"
            >
              <BookOpen className="h-3 w-3" />
              <span>
                {isZh ? "参考文档" : "Sources"}{" "}
                <span className="text-slate-500">({message.sources.length})</span>
              </span>
              <ChevronDown
                className={cn(
                  "h-3 w-3 transition-transform",
                  sourcesOpen && "rotate-180"
                )}
              />
            </button>

            {sourcesOpen && (
              <div className="space-y-2">
                {message.sources.map((source, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSourceClick?.(source)}
                    className="w-full text-left bg-white border border-slate-200 rounded-xl p-3 hover:border-primary/30 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-primary group-hover:underline flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {source.title}
                      </span>
                      <ExternalLink className="h-3 w-3 text-slate-300 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {source.excerpt}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-2">
          {message.role === "assistant" && message.confidence !== undefined && (
            <div className="flex items-center gap-1">
              <div className="h-1 w-16 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${message.confidence}%`,
                    backgroundColor:
                      message.confidence >= 70
                        ? "#10b981"
                        : message.confidence >= 40
                        ? "#f59e0b"
                        : "#ef4444",
                  }}
                />
              </div>
              <span className="text-[10px] text-slate-400">
                {message.confidence >= 70
                  ? isZh ? "高相关" : "High match"
                  : message.confidence >= 40
                  ? isZh ? "中相关" : "Medium match"
                  : isZh ? "低相关" : "Low match"}
              </span>
            </div>
          )}
          <button
            onClick={handleCopy}
            className="text-[10px] text-slate-300 hover:text-slate-500 transition-colors flex items-center gap-1"
          >
            {copied ? (
              <>
                <CheckCheck className="h-3 w-3" />
                {isZh ? "已复制" : "Copied"}
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                {isZh ? "复制" : "Copy"}
              </>
            )}
          </button>
          <span className="text-[10px] text-slate-300">
            {message.timestamp.toLocaleTimeString(locale === "zh" ? "zh-CN" : "en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

function TypingIndicator({ locale }: { locale: string }) {
  const isZh = locale === "zh";
  return (
    <div className="flex gap-3 items-end animate-in slide-in-from-bottom-2">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm font-bold shadow-sm">
        <Bot className="h-4 w-4" />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce [animation-delay:0ms]" />
          <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce [animation-delay:150ms]" />
          <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce [animation-delay:300ms]" />
          <span className="text-xs text-slate-400 ml-1">
            {isZh ? "正在检索..." : "Searching..."}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main Q&A Client Component ─────────────────────────────────────────────────

export default function QAClient() {
  const params = useParams();
  const locale = (params.locale as string) || "zh";
  const isZh = locale === "zh";

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedQuestions = isZh ? SUGGESTED_QUESTIONS_ZH : SUGGESTED_QUESTIONS_EN;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSourceClick = useCallback((source: QASource) => {
    // Navigate to knowledge base
    window.open(`/${locale}/knowledge-base`, "_blank");
  }, [locale]);

  const handleSubmit = useCallback(async (question?: string) => {
    const q = (question ?? input).trim();
    if (!q || isLoading) return;

    setShowWelcome(false);
    setError(null);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: q,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/knowledge-base/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, locale }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Request failed");
      }

      const data: QAAPIResponse = await res.json();

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.answer,
        sources: data.sources,
        confidence: data.confidence,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(isZh ? `请求失败：${msg}` : `Request failed: ${msg}`);

      // Add a friendly error message
      const errorMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: isZh
          ? "抱歉，服务暂时不可用，请稍后重试。您也可以直接联系我们的技术支持团队。"
          : "Sorry, the service is temporarily unavailable. Please try again later or contact our technical support team.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, locale, isZh]);


  const clearChat = () => {
    setMessages([]);
    setShowWelcome(true);
    setError(null);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-200">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-heading font-bold text-slate-900">
              {isZh ? "技术支持助手" : "Technical Support Assistant"}
            </h1>
            <p className="text-xs text-slate-400">
              {isZh
                ? "基于新威尔知识库的智能问答"
                : "AI-powered Q&A based on Neware knowledge base"}
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearChat}
            className="text-slate-400 hover:text-slate-600 text-xs gap-1.5"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            {isZh ? "清空对话" : "Clear chat"}
          </Button>
        )}
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* Welcome screen */}
          {showWelcome && messages.length === 0 && (
            <div className="flex flex-col items-center text-center py-12 animate-in fade-in zoom-in-95">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 text-white mb-6 shadow-2xl shadow-violet-200">
                <Zap className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-slate-900 mb-2">
                {isZh ? "您好，有什么可以帮您？" : "Hi, how can I help you?"}
              </h2>
              <p className="text-slate-500 mb-8 max-w-md">
                {isZh
                  ? "向我提问关于新威尔 BTS 设备的问题——从软件设置到故障排查"
                  : "Ask me anything about Neware BTS equipment — from software setup to troubleshooting"}
              </p>

              {/* Suggested questions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSubmit(q)}
                    className="text-left bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-primary/60 text-xs font-medium">Q{idx + 1}</span>
                      <span className="group-hover:underline">{q}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-8 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>26+ {isZh ? "篇技术文档" : "technical docs"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5" />
                  <span>{isZh ? "智能检索" : "Smart search"}</span>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              locale={locale}
              onSourceClick={handleSourceClick}
            />
          ))}

          {/* Typing indicator */}
          {isLoading && <TypingIndicator locale={locale} />}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="bg-white border-t border-slate-200 px-4 py-4 shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-end gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
            <textarea
              ref={inputRef as never}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder={
                isZh
                  ? "输入您的问题，按 Enter 发送..."
                  : "Ask a question, press Enter to send..."
              }
              rows={1}
              className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 resize-none outline-none py-1 max-h-32 leading-relaxed"
              style={{ minHeight: "24px" }}
            />
            <Button
              size="sm"
              onClick={() => handleSubmit()}
              disabled={!input.trim() || isLoading}
              className="shrink-0 h-8 w-8 p-0 rounded-xl shadow-lg"
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-[10px] text-slate-300 text-center mt-2">
            {isZh
              ? "基于新威尔技术文档知识库生成，回答仅供参考"
              : "Answers generated from Neware technical documentation — for reference only"}
          </p>
        </div>
      </div>
    </div>
  );
}
