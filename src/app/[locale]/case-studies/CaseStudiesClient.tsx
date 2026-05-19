"use client";

import { useState } from "react";
import Link from "next/link";
import { caseStudies, caseStudyIndustries, type CaseStudy } from "@/data/case-studies";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, ArrowRight, CheckCircle2, Wrench, Target, BookOpen } from "lucide-react";

interface Props {
  locale: string;
}

const industryColors: Record<string, string> = {
  ev: "bg-emerald-100 text-emerald-700",
  manufacturing: "bg-blue-100 text-blue-700",
  academic: "bg-purple-100 text-purple-700",
};

function getLocalizedStudy(study: CaseStudy, locale: string) {
  if (locale === "zh") {
    return {
      company: study.companyZh || study.companyEn || study.company,
      description: study.companyDescriptionZh || study.companyDescriptionEn || study.companyDescription,
      industry: study.industryZh || study.industryEn || study.industry,
      challenge: study.challengeZh || study.challengeEn || study.challenge,
      solution: study.solutionZh || study.solutionEn || study.solution,
      results: study.resultsZh || study.resultsEn || study.results,
      date: study.date,
    };
  }
  if (locale === "vi") {
    return {
      company: study.companyVi || study.companyEn || study.company,
      description: study.companyDescriptionVi || study.companyDescriptionEn || study.companyDescription,
      industry: study.industryVi || study.industryEn || study.industry,
      challenge: study.challengeVi || study.challengeEn || study.challenge,
      solution: study.solutionVi || study.solutionEn || study.solution,
      results: study.resultsVi || study.resultsEn || study.results,
      date: study.dateEn || study.date,
    };
  }
  return {
    company: study.companyEn || study.company,
    description: study.companyDescriptionEn || study.companyDescription,
    industry: study.industryEn || study.industry,
    challenge: study.challengeEn || study.challenge,
    solution: study.solutionEn || study.solution,
    results: study.resultsEn || study.results,
    date: study.dateEn || study.date,
  };
}

function getLocalizedTestimonial(study: CaseStudy, locale: string) {
  if (!study.testimonial) return null;
  const t = study.testimonial;
  if (locale === "zh") {
    return {
      quote: t.quoteZh || t.quoteEn || t.quote,
      name: t.nameZh || t.nameEn || t.name,
      title: t.titleZh || t.titleEn || t.title,
    };
  }
  if (locale === "vi") {
    return {
      quote: t.quoteVi || t.quoteEn || t.quote,
      name: t.nameVi || t.nameEn || t.name,
      title: t.titleVi || t.titleEn || t.title,
    };
  }
  return {
    quote: t.quoteEn || t.quote,
    name: t.nameEn || t.name,
    title: t.titleEn || t.title,
  };
}

function CaseStudyCard({ study, locale }: { study: CaseStudy; locale: string }) {
  const isZh = locale === "zh";
  const loc = getLocalizedStudy(study, locale);
  const testimonial = getLocalizedTestimonial(study, locale);
  const industryColor = industryColors[study.industry] || "bg-slate-100 text-slate-700";

  return (
    <Card className="group hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-primary to-blue-400" />
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl text-white font-bold text-lg"
              style={{ backgroundColor: study.logoColor }}
            >
              {loc.company.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 leading-tight text-lg">
                {loc.company}
              </h3>
              <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
                <MapPin className="h-3.5 w-3.5" />
                {study.location}
              </div>
            </div>
          </div>
          <Badge className={`mt-1 text-xs ${industryColor}`} variant="secondary">
            {loc.industry}
          </Badge>
        </div>

        {/* Company Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
          {loc.description}
        </p>

        {/* Challenge */}
        <div className="mb-4 p-4 bg-red-50 rounded-xl border border-red-100">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-red-600 shrink-0" />
            <span className="text-xs font-semibold text-red-700 uppercase tracking-wide">
              {isZh ? "挑战" : "Challenge"}
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {loc.challenge}
          </p>
        </div>

        {/* Solution */}
        <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="h-4 w-4 text-blue-600 shrink-0" />
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
              {isZh ? "解决方案" : "Solution"}
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {loc.solution}
          </p>
        </div>

        {/* Products Used */}
        <div className="mb-4 p-3 bg-slate-100 rounded-xl">
          <p className="text-xs text-slate-500 mb-2 font-medium">
            {isZh ? "使用产品" : "Products Used"}
          </p>
          <div className="flex flex-wrap gap-2">
            {study.productsUsed.map((product) => (
              <Badge key={product} variant="secondary" className="text-xs font-mono">
                {product}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
            {isZh ? "成果与收益" : "Results & Impact"}
          </p>
          <ul className="space-y-2">
            {loc.results.slice(0, 4).map((result, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                {result}
              </li>
            ))}
          </ul>
          {loc.results.length > 4 && (
            <p className="text-xs text-slate-400 mt-2 pl-6">
              +{loc.results.length - 4} {isZh ? "更多成果" : "more results"}
            </p>
          )}
        </div>

        {/* Testimonial */}
        {testimonial && (
          <blockquote className="border-l-4 border-primary pl-4 py-2 mb-4 bg-primary/5 rounded-r-lg">
            <p className="text-sm text-slate-600 italic leading-relaxed">
              "{testimonial.quote}"
            </p>
            <p className="text-xs text-slate-400 mt-2 font-medium">
              — {testimonial.name}, {testimonial.title}
            </p>
          </blockquote>
        )}

        {/* Date */}
        <div className="text-xs text-slate-400 pt-2 border-t border-slate-100">
          {isZh ? "案例发布于" : "Case study published"}{" "}
          {loc.date}
        </div>
      </CardContent>
    </Card>
  );
}

export default function CaseStudiesClient({ locale }: Props) {
  const isZh = locale === "zh";
  const isVi = locale === "vi";
  const [activeIndustry, setActiveIndustry] = useState("all");

  const filtered = activeIndustry === "all"
    ? caseStudies
    : caseStudies.filter((s) => s.industry === activeIndustry);

  const featuredStudies = filtered.filter((s) => s.featured);
  const otherStudies = filtered.filter((s) => !s.featured);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary via-primary to-blue-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-heading font-bold mb-3">
            {isZh ? "客户案例" : isVi ? "Khách Hàng Tiêu Biểu" : "Customer Case Studies"}
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            {isZh
              ? "查看新威尔电池测试设备在全球顶尖高校、电池制造商和科研机构的应用案例。"
              : isVi
              ? "Khám phá cách thiết bị kiểm tra pin NEWARE được sử dụng bởi các trường đại học hàng đầu và nhà sản xuất pin trên toàn thế giới."
              : "Explore how NEWARE battery testing equipment is used by leading universities and battery manufacturers worldwide."}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Industry filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          {caseStudyIndustries.map((ind) => {
            const label = isZh ? ind.labelZh : isVi ? ind.labelVi : ind.labelEn;
            const count = ind.value === "all"
              ? caseStudies.length
              : caseStudies.filter((s) => s.industry === ind.value).length;

            return (
              <button
                key={ind.value}
                onClick={() => setActiveIndustry(ind.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeIndustry === ind.value
                    ? "bg-primary text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {label}
                <span className={`ml-2 text-xs ${
                  activeIndustry === ind.value ? "text-white/70" : "text-slate-400"
                }`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Featured Case Studies */}
        {featuredStudies.length > 0 && activeIndustry === "all" && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              {isZh ? "标杆客户" : isVi ? "Khách hàng tiêu biểu" : "Featured Customers"}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredStudies.map((study) => (
                <CaseStudyCard key={study.id} study={study} locale={locale} />
              ))}
            </div>
          </div>
        )}

        {/* Other Case Studies */}
        {otherStudies.length > 0 && (
          <div>
            {(featuredStudies.length > 0 && activeIndustry === "all") && (
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                {isZh ? "更多案例" : isVi ? "Thêm nghiên cứu tình huống" : "More Case Studies"}
              </h2>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {otherStudies.map((study) => (
                <CaseStudyCard key={study.id} study={study} locale={locale} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <Building2 className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>{isZh ? "暂无该行业案例" : isVi ? "Chưa có nghiên cứu tình huống nào trong ngành này" : "No cases in this industry yet"}</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            {isZh ? "您也想成为下一个标杆案例吗？" : isVi ? "Bạn cũng muốn trở thành câu chuyện thành công tiếp theo?" : "Want to Be Our Next Success Story?"}
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            {isZh
              ? "联系我们的应用工程师，获取免费技术选型支持，让新威尔成为您测试能力的坚实后盾。"
              : isVi
              ? "Liên hệ các kỹ sư ứng dụng của chúng tôi để được hỗ trợ kỹ thuật miễn phí."
              : "Contact our application engineers for free technical selection support. Let NEWARE be your testing backbone."}
          </p>
          <a href={`/${locale}/contact`}>
            <Button size="lg" className="shadow-lg shadow-primary/30">
              {isZh ? "联系我们" : isVi ? "Liên hệ chúng tôi" : "Contact Us"}
              <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
            </Button>
          </a>
        </div>

        {/* Related Blog Articles */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {isZh ? "相关博客文章" : isVi ? "Bài viết blog liên quan" : "Related Blog Articles"}
            </h2>
            <Link
              href={`/${locale}/blog`}
              className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
            >
              {isZh ? "查看全部" : isVi ? "Xem tất cả" : "View all"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: isZh ? "如何选择合适的电池测试设备" : isVi ? "Cách chọn thiết bị thử nghiệm pin phù hợp" : "How to Choose the Right Battery Testing Equipment",
                category: isZh ? "技术指南" : isVi ? "Hướng dẫn kỹ thuật" : "Technical Guide",
                date: "2026-01-15",
              },
              {
                title: isZh ? "电池化成与分容完整指南" : isVi ? "Tạo hình và phân loại pin" : "Battery Formation and Grading Complete Guide",
                category: isZh ? "技术指南" : isVi ? "Hướng dẫn kỹ thuật" : "Technical Guide",
                date: "2026-02-03",
              },
              {
                title: isZh ? "工况模拟测试方法与实践" : isVi ? "Phương pháp và thực hành mô phỏng lái" : "Drive Cycle Simulation Methods and Practice",
                category: isZh ? "应用指南" : isVi ? "Hướng dẫn ứng dụng" : "Application Guide",
                date: "2026-02-20",
              },
            ].map((article, idx) => (
              <Link key={idx} href={`/${locale}/blog`}>
                <Card className="group hover:shadow-md hover:border-primary/20 transition-all cursor-pointer overflow-hidden h-full">
                  <div className="h-1.5 w-full bg-gradient-to-r from-primary to-blue-400" />
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="text-xs mb-2 bg-primary/10 text-primary">
                      {article.category}
                    </Badge>
                    <h3 className="font-semibold text-slate-900 text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-400">{article.date}</p>
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
