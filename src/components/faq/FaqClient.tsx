"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
  questionZh: string;
  answerZh: string;
  questionVi: string;
  answerVi: string;
}

interface FaqCategory {
  [key: string]: FaqItem[];
}

interface FaqClientProps {
  faqData: FaqCategory;
  locale: string;
}

export function FaqClient({ faqData, locale }: FaqClientProps) {
  const t = useTranslations("faq");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const isZh = locale === "zh";
  const isVi = locale === "vi";

  const categories = [
    { key: "all", label: t("categories.all") },
    { key: "productSelection", label: t("categories.productSelection") },
    { key: "technicalSupport", label: t("categories.technicalSupport") },
    { key: "dataMigration", label: t("categories.dataMigration") },
    { key: "pricingOrders", label: t("categories.pricingOrders") },
  ];

  const toggleItem = (index: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const getQuestion = (item: FaqItem) => {
    if (isZh) return item.questionZh;
    if (isVi) return item.questionVi;
    return item.question;
  };

  const getAnswer = (item: FaqItem) => {
    if (isZh) return item.answerZh;
    if (isVi) return item.answerVi;
    return item.answer;
  };

  const filteredData = Object.entries(faqData).reduce((acc, [category, items]) => {
    if (activeCategory === "all" || activeCategory === category) {
      const filteredItems = items.filter((item) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
          getQuestion(item).toLowerCase().includes(query) ||
          getAnswer(item).toLowerCase().includes(query)
        );
      });
      if (filteredItems.length > 0) {
        acc.push(...filteredItems.map((item, idx) => ({ ...item, category, index: `${category}-${idx}` })));
      }
    }
    return acc;
  }, [] as Array<FaqItem & { category: string; index: string }>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              activeCategory === cat.key
                ? "bg-primary text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.index}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-shadow hover:shadow-md"
            >
              <button
                onClick={() => toggleItem(item.index)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={expandedItems.has(item.index)}
              >
                <span className="font-medium text-slate-900 pr-4">
                  {getQuestion(item)}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-slate-400 shrink-0 transition-transform",
                    expandedItems.has(item.index) && "rotate-180"
                  )}
                />
              </button>
              {expandedItems.has(item.index) && (
                <div className="px-5 pb-5 pt-0">
                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-slate-600 leading-relaxed">
                      {getAnswer(item)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-slate-500">
            <svg
              className="mx-auto h-12 w-12 mb-4 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg font-medium">{isZh ? "未找到相关问题" : isVi ? "Không tìm thấy câu hỏi liên quan" : "No matching questions found"}</p>
            <p className="text-sm mt-1">{isZh ? "请尝试其他关键词" : isVi ? "Vui lòng thử từ khóa khác" : "Please try a different search term"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
