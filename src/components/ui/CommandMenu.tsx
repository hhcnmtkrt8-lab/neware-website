"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Search, FileText, Package, HelpCircle, File, X, ArrowRight } from "lucide-react";
import { products } from "@/data/neware";
import { cn } from "@/lib/utils";

interface SearchItem {
  id: string;
  type: "product" | "blog" | "faq" | "page";
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
}

const searchData: SearchItem[] = [
  // Products
  ...products.slice(0, 12).map((p) => ({
    id: p.id,
    type: "product" as const,
    title: p.nameEn || p.name,
    description: p.descriptionEn || p.description,
    href: `/products/${p.id}`,
    icon: Package,
  })),
  // FAQ items (key questions)
  {
    id: "faq-1",
    type: "faq" as const,
    title: "What accuracy levels does NEWARE offer?",
    description: "NEWARE offers 0.02% FS (high precision) and 0.05% FS (standard) accuracy across different series.",
    href: "/faq",
    icon: HelpCircle,
  },
  {
    id: "faq-2",
    type: "faq" as const,
    title: "How to migrate from Arbin to NEWARE?",
    description: "NEWARE provides free migration assessment, hardware cross-reference guides, and data compatibility tools.",
    href: "/faq",
    icon: HelpCircle,
  },
  {
    id: "faq-3",
    type: "faq" as const,
    title: "What is the sampling rate capability?",
    description: "BTS9000 series supports up to 1000Hz sampling rate, while CT-4000 supports up to 10Hz.",
    href: "/faq",
    icon: HelpCircle,
  },
  {
    id: "faq-4",
    type: "faq" as const,
    title: "Does NEWARE support energy recovery?",
    description: "Yes, CE-6000 series supports 70%+ energy feedback, significantly reducing electricity costs.",
    href: "/faq",
    icon: HelpCircle,
  },
  {
    id: "faq-5",
    type: "faq" as const,
    title: "What voltage ranges are available?",
    description: "Available from 5V to 1000V depending on the series and configuration.",
    href: "/faq",
    icon: HelpCircle,
  },
  // Pages
  {
    id: "page-1",
    type: "page" as const,
    title: "Products Overview",
    description: "Browse our complete line of battery testing equipment",
    href: "/products",
    icon: File,
  },
  {
    id: "page-2",
    type: "page" as const,
    title: "Compare Brands",
    description: "Compare NEWARE with Arbin, Maccor and Bio-Logic",
    href: "/compare",
    icon: File,
  },
  {
    id: "page-3",
    type: "page" as const,
    title: "Downloads & Software",
    description: "Download BTS software, manuals, and certificates",
    href: "/downloads",
    icon: FileText,
  },
  {
    id: "page-4",
    type: "page" as const,
    title: "Knowledge Base",
    description: "Technical documentation and guides for NEWARE systems",
    href: "/knowledge-base",
    icon: FileText,
  },
  {
    id: "page-5",
    type: "page" as const,
    title: "Case Studies",
    description: "See how leading battery labs use NEWARE equipment",
    href: "/case-studies",
    icon: FileText,
  },
  {
    id: "page-6",
    type: "page" as const,
    title: "About NEWARE",
    description: "26 years of precision battery testing expertise",
    href: "/about",
    icon: File,
  },
  {
    id: "page-7",
    type: "page" as const,
    title: "Contact Us",
    description: "Get free technical support and quotes",
    href: "/contact",
    icon: File,
  },
  {
    id: "page-8",
    type: "page" as const,
    title: "Solutions",
    description: "Industry-specific battery testing solutions",
    href: "/solutions",
    icon: File,
  },
];

const categoryLabels: Record<SearchItem["type"], { en: string; zh: string; vi: string }> = {
  product: { en: "Products", zh: "产品", vi: "Sản phẩm" },
  blog: { en: "Blog Articles", zh: "博客文章", vi: "Bài viết" },
  faq: { en: "FAQ", zh: "常见问题", vi: "FAQ" },
  page: { en: "Pages", zh: "页面", vi: "Trang" },
};

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) || "en";

  const filteredResults = searchData.filter(
    (item) =>
      query === "" ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  const groupedResults = filteredResults.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<SearchItem["type"], SearchItem[]>);

  const flatResults = Object.values(groupedResults).flat();

  const getCategoryLabel = (type: SearchItem["type"]) => {
    const labels = categoryLabels[type];
    return labels[locale as keyof typeof labels] || labels.en;
  };

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setSelectedIndex(0);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const handleSelect = useCallback(
    (item: SearchItem) => {
      router.push(`/${locale}${item.href}`);
      handleClose();
    },
    [router, locale, handleClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, flatResults.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && flatResults[selectedIndex]) {
        e.preventDefault();
        handleSelect(flatResults[selectedIndex]);
      } else if (e.key === "Escape") {
        handleClose();
      }
    },
    [flatResults, selectedIndex, handleSelect, handleClose]
  );

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        handleOpen();
      }
    };
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [handleOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative flex min-h-full items-start justify-center p-4 pt-[15vh]">
        <div
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onKeyDown={handleKeyDown}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4">
            <Search className="h-5 w-5 text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                locale === "zh"
                  ? "搜索产品、文章、常见问题..."
                  : locale === "vi"
                  ? "Tìm kiếm sản phẩm, bài viết, FAQ..."
                  : "Search products, articles, FAQ..."
              }
              className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 outline-none text-base"
            />
            <button
              onClick={handleClose}
              className="flex items-center justify-center h-6 w-6 rounded bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {flatResults.length === 0 ? (
              <div className="py-12 text-center">
                <div className="flex h-16 w-16 mx-auto mb-4 items-center justify-center rounded-full bg-slate-100">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-slate-600 font-medium">
                  {locale === "zh"
                    ? "未找到结果"
                    : locale === "vi"
                    ? "Không tìm thấy kết quả"
                    : "No results found"}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  {locale === "zh"
                    ? "尝试其他搜索词"
                    : locale === "vi"
                    ? "Thử từ khóa tìm kiếm khác"
                    : "Try different search terms"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {(Object.keys(groupedResults) as SearchItem["type"][]).map((type) => (
                  <div key={type}>
                    <div className="px-3 py-2">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {getCategoryLabel(type)}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      {groupedResults[type].map((item) => {
                        const globalIndex = flatResults.findIndex((r) => r.id === item.id);
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleSelect(item)}
                            className={cn(
                              "w-full flex items-start gap-3 px-3 py-3 rounded-lg text-left transition-colors",
                              globalIndex === selectedIndex
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-slate-50 text-slate-700"
                            )}
                          >
                            <div
                              className={cn(
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                                globalIndex === selectedIndex
                                  ? "bg-primary/20"
                                  : "bg-slate-100"
                              )}
                            >
                              <Icon
                                className={cn(
                                  "h-4 w-4",
                                  globalIndex === selectedIndex ? "text-primary" : "text-slate-500"
                                )}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={cn(
                                  "font-medium truncate",
                                  globalIndex === selectedIndex && "text-primary"
                                )}
                              >
                                {item.title}
                              </p>
                              <p className="text-sm text-slate-500 truncate mt-0.5">
                                {item.description}
                              </p>
                            </div>
                            {globalIndex === selectedIndex && (
                              <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-1" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 px-4 py-3 bg-slate-50/50">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 font-mono text-[10px]">
                    ↑↓
                  </kbd>
                  <span>
                    {locale === "zh" ? "导航" : locale === "vi" ? "Điều hướng" : "Navigate"}
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 font-mono text-[10px]">
                    ↵
                  </kbd>
                  <span>
                    {locale === "zh" ? "选择" : locale === "vi" ? "Chọn" : "Select"}
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 font-mono text-[10px]">
                    Esc
                  </kbd>
                  <span>
                    {locale === "zh" ? "关闭" : locale === "vi" ? "Đóng" : "Close"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SearchButton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-150",
        className
      )}
      aria-label="Search"
    >
      <Search className="h-[1.05rem] w-[1.05rem]" />
    </button>
  );
}
