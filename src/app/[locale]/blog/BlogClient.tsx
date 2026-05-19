"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { blogPosts, blogCategories, type BlogPost } from "@/data/blog-posts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Clock, Calendar, ArrowRight, BookOpen, Star, Building2, Mail, ChevronDown, Factory, GraduationCap, Zap } from "lucide-react";

interface Props {
  locale: string;
}

function getLocalizedArray(
  post: BlogPost,
  locale: string
): string[] {
  if (locale === "zh") return post.tags || [];
  if (locale === "vi") return post.tagsVi || post.tagsEn || post.tags || [];
  return post.tagsEn || post.tags || [];
}

function getLocalizedValue(
  post: BlogPost,
  locale: string
): { title: string; summary: string; category: string; author: string } {
  if (locale === "zh") {
    return {
      title: post.titleZh || post.titleEn || post.title,
      summary: post.summaryZh || post.summaryEn || post.summary,
      category: post.categoryZh || post.categoryEn || post.category,
      author: post.author,
    };
  }
  if (locale === "vi") {
    return {
      title: post.titleVi || post.titleEn || post.title,
      summary: post.summaryVi || post.summaryEn || post.summary,
      category: post.categoryVi || post.categoryEn || post.category,
      author: post.author,
    };
  }
  return {
    title: post.titleEn || post.title,
    summary: post.summaryEn || post.summary,
    category: post.categoryEn || post.category,
    author: post.authorEn || post.author,
  };
}

function getAuthorInitials(name: string): string {
  if (!name) return "NW";
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function getRelatedProducts(post: BlogPost): string[] {
  const productKeywords: Record<string, string[]> = {
    "CT-4000": ["ct-4000", "ct4000"],
    "BTS9000": ["bts9000", "ct-9000", "ct9000"],
    "CE-6000": ["ce-6000", "ce6000", "igbt"],
    "BTSDA": ["btsda", "software"],
  };
  const related: string[] = [];
  const content = (post.content || "").toLowerCase();
  for (const [product, keywords] of Object.entries(productKeywords)) {
    if (keywords.some(k => content.includes(k))) {
      related.push(product);
    }
  }
  return related.slice(0, 2);
}

function ShareButtons({ url, title }: { url: string; title: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2 mt-3">
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 rounded-md bg-slate-100 hover:bg-blue-100 text-slate-500 hover:text-blue-600 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 rounded-md bg-slate-100 hover:bg-sky-100 text-slate-500 hover:text-sky-500 transition-colors"
        aria-label="Share on X (Twitter)"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        className="p-1.5 rounded-md bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-500 transition-colors"
        aria-label="Share via Email"
      >
        <Mail className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

function BlogCard({ post, locale }: { post: BlogPost; locale: string }) {
  const isZh = locale === "zh";
  const isVi = locale === "vi";
  const localized = getLocalizedValue(post, locale);
  const tags = getLocalizedArray(post, locale);
  const date = isZh ? post.date : post.dateEn;
  const authorInitials = getAuthorInitials(localized.author);
  const relatedProducts = getRelatedProducts(post);
  const currentUrl = typeof window !== "undefined" ? window.location.origin : "https://www.neware.com.cn";
  const shareUrl = `${currentUrl}/${locale}/blog/${post.slug}`;

  return (
    <Card className="group hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-primary to-blue-400" />
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
            {localized.category}
          </Badge>
          {post.featured && (
            <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
          {relatedProducts.length > 0 && (
            <div className="flex gap-1 ml-auto">
              {relatedProducts.map((product) => (
                <Link
                  key={product}
                  href={`/${locale}/products/${product.toLowerCase().replace("-", "")}`}
                  className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {product}
                </Link>
              ))}
            </div>
          )}
        </div>
        <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {localized.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-4">
          {localized.summary}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs text-slate-500">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime} {isZh ? "分钟" : isVi ? "phút đọc" : "min read"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">
              {authorInitials}
            </div>
            <span className="text-xs text-slate-500">{localized.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShareButtons url={shareUrl} title={localized.title} />
            <Link
              href={`/${locale}/blog/${post.slug}`}
              className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all"
            >
              {isZh ? "阅读" : isVi ? "Đọc" : "Read"}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function BlogClient({ locale }: Props) {
  const params = useParams();
  const currentLocale = (params.locale as string) || locale;
  const isZh = currentLocale === "zh";
  const isVi = currentLocale === "vi";
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Extract unique categories from blog posts
  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    blogPosts.forEach((p) => {
      const cat = p.categoryEn || p.category;
      if (cat) categories.add(cat);
    });
    return Array.from(categories);
  }, []);

  const allTags = Array.from(
    new Set(blogPosts.flatMap((p) => p.tagsEn || []))
  );

  const filtered = blogPosts.filter((p) => {
    const localized = getLocalizedValue(p, currentLocale);

    const matchesSearch =
      !search ||
      (localized.title + localized.summary)
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || localized.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort by date
  const sortedFiltered = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.date || a.dateEn || 0).getTime();
      const dateB = new Date(b.date || b.dateEn || 0).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [filtered, sortOrder]);

  const featuredPosts = sortedFiltered.filter((p) => p.featured);
  const regularPosts = sortedFiltered.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary via-primary to-blue-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="h-7 w-7 text-blue-200" />
            <span className="text-blue-200 font-medium">
              {isZh ? "技术博客" : isVi ? "Blog kỹ thuật" : "Technical Blog"}
            </span>
          </div>
          <h1 className="text-4xl font-heading font-bold mb-3">
            {isZh ? "电池测试技术深度解读" : isVi ? "Hiểu Biết Sâu Về Thử Nghiệm Pin" : "In-Depth Battery Testing Insights"}
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            {isZh
              ? "来自新威尔技术团队的实战经验，涵盖充放电曲线分析、EV 测试方法、工况模拟和工艺配置等核心主题。"
              : isVi
              ? "Thông tin chi tiết từ đội ngũ kỹ thuật NEWARE, bao gồm phân tích đường cong sạc/xả, phương pháp thử nghiệm EV và cấu hình quy trình."
              : "Practical insights from the NEWARE technical team, covering charge/discharge curve analysis, EV testing, drive cycle simulation, and process configuration."}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Search, Sort & Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder={isZh ? "搜索文章标题或内容..." : isVi ? "Tìm kiếm bài viết..." : "Search articles..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 border-slate-200 focus:border-primary/50"
              />
            </div>
            <div className="flex items-center gap-2">
              <ChevronDown className="h-4 w-4 text-slate-400" />
              <Select value={sortOrder} onValueChange={(v: "newest" | "oldest") => setSortOrder(v)}>
                <SelectTrigger className="w-36 border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">
                    {isZh ? "最新优先" : isVi ? "Mới nhất" : "Newest First"}
                  </SelectItem>
                  <SelectItem value="oldest">
                    {isZh ? "最早优先" : isVi ? "Cũ nhất" : "Oldest First"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeCategory === "all"
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {isZh ? "全部" : isVi ? "Tất cả" : "All"}
              </button>
              {uniqueCategories.map((cat) => {
                const label = isZh ? cat : isVi ? cat : cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
          {search && (
            <p className="text-sm text-slate-500 mt-3">
              {isZh ? "找到" : isVi ? "Tìm thấy" : "Found"}{" "}
              <strong className="text-primary">{sortedFiltered.length}</strong>{" "}
              {isZh ? "篇文章" : isVi ? "bài viết" : "articles"}
            </p>
          )}
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && activeCategory === "all" && !search && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              {isZh ? "精选文章" : isVi ? "Bài viết nổi bật" : "Featured Articles"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} locale={currentLocale} />
              ))}
            </div>
          </div>
        )}

        {/* All Posts Grid */}
        {regularPosts.length > 0 && (
          <div>
            {featuredPosts.length > 0 && activeCategory === "all" && !search && (
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                {isZh ? "最新文章" : isVi ? "Bài viết mới nhất" : "Latest Articles"}
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <BlogCard key={post.id} post={post} locale={currentLocale} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>{isZh ? "未找到相关文章" : isVi ? "Không tìm thấy bài viết nào" : "No articles found"}</p>
          </div>
        )}

        {/* Related Case Studies */}
        <div className="mt-16 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl p-8 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              {isZh ? "相关客户案例" : isVi ? "Nghiên cứu tình huống liên quan" : "Related Case Studies"}
            </h2>
            <Link
              href={`/${currentLocale}/case-studies`}
              className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
            >
              {isZh ? "查看全部" : isVi ? "Xem tất cả" : "View all"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: isZh ? "CATL 电池测试" : isVi ? "CATL Thử nghiệm pin" : "CATL Battery Testing",
                desc: isZh ? "使用 CT-9000 系列进行大规模电池性能测试" : isVi ? "Sử dụng dòng CT-9000 để thử nghiệm pin quy mô lớn" : "Using CT-9000 series for large-scale battery performance testing",
                icon: <Factory className="h-6 w-6" />,
                color: "from-emerald-500 to-teal-500",
              },
              {
                title: isZh ? "斯坦福大学研究" : isVi ? "Đại học Stanford" : "Stanford University Research",
                desc: isZh ? "CT-4000 系列用于先进电池材料研究" : isVi ? "Dòng CT-4000 cho nghiên cứu vật liệu pin tiên tiến" : "CT-4000 series for advanced battery material research",
                icon: <GraduationCap className="h-6 w-6" />,
                color: "from-blue-500 to-indigo-500",
              },
              {
                title: isZh ? "比亚迪 EV 测试" : isVi ? "BYD Thử nghiệm EV" : "BYD EV Testing",
                desc: isZh ? "CE-6000 系列用于动力电池工况模拟测试" : isVi ? "Dòng CE-6000 cho thử nghiệm mô phỏng lái pin EV" : "CE-6000 series for EV battery drive cycle simulation testing",
                icon: <Zap className="h-6 w-6" />,
                color: "from-amber-500 to-orange-500",
              },
            ].map((study, idx) => (
              <Link key={idx} href={`/${currentLocale}/case-studies`}>
                <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden h-full">
                  <div className={`h-1.5 w-full bg-gradient-to-r ${study.color}`} />
                  <CardContent className="p-5">
                    <div className="mb-3 text-primary">{study.icon}</div>
                    <h3 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-primary transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{study.desc}</p>
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
