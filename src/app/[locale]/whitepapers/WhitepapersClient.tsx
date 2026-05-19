"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Download, Clock, Users, ArrowRight, BookOpen, BarChart3, Wrench, X, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { whitepapers, type Whitepaper } from "@/data/whitepapers";

interface Props {
  locale: string;
  messages: Record<string, unknown>;
}

function getLocalizedTitle(wp: Whitepaper, locale: string): string {
  if (locale === "zh") return wp.titleZh || wp.title;
  if (locale === "vi") return wp.titleVi || wp.title;
  return wp.titleEn || wp.title;
}

function getLocalizedDescription(wp: Whitepaper, locale: string): string {
  if (locale === "zh") return wp.descriptionZh || wp.description;
  if (locale === "vi") return wp.descriptionVi || wp.description;
  return wp.descriptionEn || wp.description;
}

const categoryColors: Record<string, string> = {
  "Competitive Analysis": "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  "Buying Guide": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  "Technical Guide": "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
};

const categoryIcons: Record<string, React.ElementType> = {
  "Competitive Analysis": BarChart3,
  "Buying Guide": BookOpen,
  "Technical Guide": Wrench,
};

function t(key: string, messages: Record<string, unknown>, locale: string, fallback: string): string {
  const keys = key.split(".");
  let val: unknown = messages;
  for (const k of keys) {
    val = (val as Record<string, unknown>)?.[k];
  }
  return typeof val === "string" ? val : fallback;
}

export function WhitepapersClient({ locale, messages }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedWhitepaper, setSelectedWhitepaper] = useState<Whitepaper | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const categories = ["All", "Competitive Analysis", "Buying Guide", "Technical Guide"];

  const handleDownloadClick = (wp: Whitepaper) => {
    setSelectedWhitepaper(wp);
    setShowModal(true);
    setSubmitted(false);
    setFormData({ name: "", email: "", company: "", phone: "" });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedWhitepaper(null);
    setSubmitted(false);
    setFormData({ name: "", email: "", company: "", phone: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(`neware-wp-email-${selectedWhitepaper?.id}`, formData.email);
    localStorage.setItem("neware-lead-email", formData.email);
    setSubmitted(true);
  };

  const handleDownload = () => {
    const wpSlug = selectedWhitepaper?.title.toLowerCase().replace(/\s+/g, "-") || "whitepaper";
    window.open(`/downloads/${wpSlug}.pdf`, "_blank");
    handleModalClose();
  };

  const filtered = whitepapers.filter((wp) => {
    const matchesSearch =
      search === "" ||
      getLocalizedTitle(wp, locale).toLowerCase().includes(search.toLowerCase()) ||
      getLocalizedDescription(wp, locale).toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || wp.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            {t("whitepapers.title", messages, locale, "Whitepapers & Guides")}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {t("whitepapers.subtitle", messages, locale, "Download free technical whitepapers and buying guides from NEWARE experts")}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Input
            placeholder={t("whitepapers.searchPlaceholder", messages, locale, "Search whitepapers...")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat === "All"
                  ? t("whitepapers.categories.all", messages, locale, "All")
                  : t(`whitepapers.categories.${cat.toLowerCase().replace(" ", "")}`, messages, locale, cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Whitepaper */}
        {search === "" && activeCategory === "All" && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-amber-600 mb-4 flex items-center gap-2">
              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-bold">FEATURED</span>
              {t("whitepapers.featured", messages, locale, "Featured Resource")}
            </h2>
            {whitepapers.filter((wp) => wp.featured).slice(0, 1).map((wp) => {
              const Icon = categoryIcons[wp.category] || FileText;
              return (
                <Card
                  key={wp.id}
                  className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 dark:border-amber-800 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-amber-100 dark:bg-amber-900 p-8 flex items-center justify-center md:w-48 shrink-0">
                      <Icon className="w-16 h-16 text-amber-600 dark:text-amber-400" />
                    </div>
                    <CardContent className="p-8 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <Badge className={`${categoryColors[wp.category]} mb-3`}>{wp.category}</Badge>
                          <h3 className="text-2xl font-bold mb-2">{getLocalizedTitle(wp, locale)}</h3>
                          <p className="text-slate-600 dark:text-slate-400 mb-4">{getLocalizedDescription(wp, locale)}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              {wp.pages} {t("whitepapers.pages", messages, locale, "pages")}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {wp.downloadCount.toLocaleString()} {t("whitepapers.downloads", messages, locale, "downloads")}
                            </span>
                          </div>
                        </div>
                        <Button onClick={() => handleDownloadClick(wp)} className="shrink-0 bg-amber-600 hover:bg-amber-700 gap-2">
                          <Download className="w-4 h-4" />
                          {t("whitepapers.download", messages, locale, "Download PDF")}
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Whitepapers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((wp) => {
            const Icon = categoryIcons[wp.category] || FileText;
            return (
              <Card key={wp.id} className="hover:shadow-lg transition-shadow group">
                <div className="bg-slate-100 dark:bg-slate-800 h-36 flex items-center justify-center">
                  <Icon className="w-12 h-12 text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <CardContent className="p-6">
                  <Badge className={`${categoryColors[wp.category]} mb-3 text-xs`}>{wp.category}</Badge>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{getLocalizedTitle(wp, locale)}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                    {getLocalizedDescription(wp, locale)}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {wp.pages} {t("whitepapers.pages", messages, locale, "pages")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {wp.downloadCount.toLocaleString()}
                    </span>
                  </div>
                  <Button onClick={() => handleDownloadClick(wp)} className="w-full gap-2 group/btn">
                    <Download className="w-4 h-4" />
                    {t("whitepapers.download", messages, locale, "Download PDF")}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">
              {locale === "zh" ? "未找到相关白皮书" : locale === "vi" ? "Không tìm thấy báo cáo trắng phù hợp" : "No whitepapers found for your search"}
            </p>
          </div>
        )}
      </div>

      {/* Email Capture Modal */}
      {showModal && selectedWhitepaper && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleModalClose}
          />
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 fade-in duration-300">
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {locale === "zh" ? "下载链接已准备好！" : locale === "vi" ? "Liên kết tải xuống đã sẵn sàng!" : "Your download is ready!"}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {locale === "zh"
                    ? `感谢您对《${getLocalizedTitle(selectedWhitepaper, locale)}》的关注`
                    : locale === "vi"
                    ? `Cảm ơn bạn đã quan tâm đến "${getLocalizedTitle(selectedWhitepaper, locale)}"`
                    : `Thank you for your interest in "${getLocalizedTitle(selectedWhitepaper, locale)}"`}
                </p>
                <Button onClick={handleDownload} className="w-full gap-2 bg-amber-600 hover:bg-amber-700">
                  <Download className="w-4 h-4" />
                  {locale === "zh" ? "立即下载" : locale === "vi" ? "Tải xuống ngay" : "Download Now"}
                </Button>
                <p className="text-xs text-slate-500 mt-3">
                  {locale === "zh" ? "文件也将发送到您的邮箱" : locale === "vi" ? "Tệp cũng sẽ được gửi đến email của bạn" : "File will also be sent to your email"}
                </p>
              </div>
            ) : (
              /* Form State */
              <>
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    {locale === "zh" ? "获取免费白皮书" : locale === "vi" ? "Nhận báo cáo trắng miễn phí" : "Get Your Free Whitepaper"}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    {getLocalizedTitle(selectedWhitepaper, locale)}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="dl-name">
                      {locale === "zh" ? "姓名" : locale === "vi" ? "Tên" : "Name"}
                    </Label>
                    <Input
                      id="dl-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={locale === "zh" ? "张三" : locale === "vi" ? "Nguyễn Văn A" : "John Smith"}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dl-email">
                      {locale === "zh" ? "工作邮箱" : locale === "vi" ? "Email công việc" : "Work Email"} *
                    </Label>
                    <Input
                      id="dl-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dl-company">
                      {locale === "zh" ? "公司" : locale === "vi" ? "Công ty" : "Company"}
                    </Label>
                    <Input
                      id="dl-company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={locale === "zh" ? "公司名称" : locale === "vi" ? "Tên công ty" : "Company name"}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dl-phone">
                      {locale === "zh" ? "电话" : locale === "vi" ? "Điện thoại" : "Phone"}
                    </Label>
                    <Input
                      id="dl-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 234 567 890"
                      className="mt-1"
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2 bg-amber-600 hover:bg-amber-700 mt-2">
                    <Download className="w-4 h-4" />
                    {locale === "zh" ? "立即下载" : locale === "vi" ? "Tải xuống ngay" : "Download Now"}
                  </Button>
                  <p className="text-xs text-center text-slate-500">
                    {locale === "zh"
                      ? "我们重视您的隐私，不会向第三方分享您的信息"
                      : locale === "vi"
                      ? "Chúng tôi tôn trọng quyền riêng tư của bạn"
                      : "We respect your privacy and will never share your information"}
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
