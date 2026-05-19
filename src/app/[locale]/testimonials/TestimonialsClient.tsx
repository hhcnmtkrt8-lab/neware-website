"use client";

import Link from "next/link";
import { Star, Quote, ChevronLeft } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  country: string;
  quote: string;
  rating: number;
  initials: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Dr. S. C.",
    title: "Senior Battery R&D Engineer",
    company: "Leading Electric Vehicle Manufacturer (US)",
    country: "USA",
    quote: "We migrated from Arbin to NEWARE BTS9000 for our R&D lab. The 0.02% accuracy and 1000Hz sampling rate gave us data quality we never had before.",
    rating: 5,
    initials: "SC",
    color: "bg-blue-600"
  },
  {
    id: "2",
    name: "Prof. M. W.",
    title: "Director of Energy Storage Research",
    company: "Top-tier Technological University (Germany)",
    country: "Germany",
    quote: "NEWARE CT-4000 has been running in our lab for 5 years without any major issues. The software is intuitive and the support from NEWARE Germany office is outstanding.",
    rating: 5,
    initials: "MW",
    color: "bg-emerald-600"
  },
  {
    id: "3",
    name: "James R.",
    title: "VP of Manufacturing",
    company: "Tier-1 Battery Technology Enterprise (US)",
    country: "USA",
    quote: "We evaluated Arbin, Maccor, and NEWARE. NEWARE CE-6000 with energy recovery saves us over $50,000 per year in electricity costs alone. The ROI was clear within 8 months.",
    rating: 5,
    initials: "JR",
    color: "bg-purple-600"
  },
  {
    id: "4",
    name: "Dr. Y. T.",
    title: "Lead Battery Researcher",
    company: "Global Fortune 500 Energy Corporation (Japan)",
    country: "Japan",
    quote: "NEWARE's BTS9000 series provides the most reliable high-precision data for our next-generation battery research. The data migration tools made switching from our previous system seamless.",
    rating: 5,
    initials: "YT",
    color: "bg-orange-600"
  },
  {
    id: "5",
    name: "Dr. Anna Kowalski",
    title: "Battery Research Director",
    company: "Stanford Energy Lab",
    country: "USA",
    quote: "The CT-4000 has been running 24/7 in our lab for 3 years without a single hardware failure. The build quality is exceptional and the support team is incredibly responsive.",
    rating: 5,
    initials: "AK",
    color: "bg-teal-600"
  },
  {
    id: "6",
    name: "Dr. Robert Chen",
    title: "Chief Engineer",
    company: "CATL Battery R&D Center",
    country: "China",
    quote: "We operate over 5,000 NEWARE channels for our EV battery testing. The networked system handles our massive test volume seamlessly and the data management is excellent.",
    rating: 5,
    initials: "RC",
    color: "bg-cyan-600"
  },
  {
    id: "7",
    name: "Dr. Emma Wilson",
    title: "Director of Battery Technology",
    company: "LG Energy Solution",
    country: "South Korea",
    quote: "NEWARE's BTS9000 gives us the data precision we need for our next-generation battery development. The 0.02% accuracy is essential for our DCIR measurements in solid-state battery research.",
    rating: 5,
    initials: "EW",
    color: "bg-indigo-600"
  },
  {
    id: "8",
    name: "Prof. Hans Mueller",
    title: "Head of Energy Storage Department",
    company: "Fraunhofer Institute",
    country: "Germany",
    quote: "NEWARE Germany provides outstanding technical support. Their engineers understand battery science deeply and help us optimize our test protocols. Best equipment support I've experienced in 20 years.",
    rating: 5,
    initials: "HM",
    color: "bg-slate-600"
  }
];

// Country flag emojis
const countryFlags: Record<string, string> = {
  USA: "🇺🇸",
  Germany: "🇩🇪",
  Japan: "🇯🇵",
  China: "🇨🇳",
  "South Korea": "🇰🇷"
};

interface Props {
  locale: string;
}

export function TestimonialsClient({ locale }: Props) {
  const isZh = locale === "zh";
  const isVi = locale === "vi";

  const pageTitle = isZh ? "客户评价" : isVi ? "Khách hàng nói gì" : "What Our Customers Say";
  const pageSubtitle = isZh
    ? "全球领先的电池实验室和制造商信赖NEWARE"
    : isVi
    ? "Được tin tưởng bởi các phòng thí nghiệm pin hàng đầu thế giới"
    : "Trusted by leading battery labs and manufacturers worldwide";
  const backText = isZh ? "返回首页" : isVi ? "Quay lại trang chủ" : "Back to Home";
  const globalClientsText = isZh ? "全球客户" : isVi ? "Khách hàng toàn cầu" : "Global Clients";
  const countriesText = isZh ? "覆盖国家" : isVi ? "Quốc gia" : "Countries";
  const yearsText = isZh ? "年行业经验" : isVi ? "Năm kinh nghiệm" : "Years Experience";
  const ratingText = isZh ? "客户满意度" : isVi ? "Mức độ hài lòng" : "Customer Rating";
  const ctaTitle = isZh ? "准备好体验新威尔了吗？" : isVi ? "Sẵn sàng trải nghiệm NEWARE?" : "Ready to experience NEWARE?";
  const ctaSubtitle = isZh
    ? "联系我们的应用工程师，获取免费技术选型支持和迁移评估"
    : isVi
    ? "Liên hệ kỹ sư ứng dụng của chúng tôi để được hỗ trợ chọn kỹ thuật miễn phí"
    : "Contact our application engineers for free technical selection support";
  const freeAssessmentText = isZh ? "获取免费评估" : isVi ? "Đánh giá miễn phí" : "Get Free Assessment";
  const browseProductsText = isZh ? "浏览产品" : isVi ? "Xem sản phẩm" : "Browse Products";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            {backText}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {pageTitle}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            {pageSubtitle}
          </p>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              locale={locale}
            />
          ))}
        </div>

        {/* Trust Stats */}
        <div className="mt-16 pt-10 border-t border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">32,000+</p>
              <p className="text-sm text-slate-600 mt-1">
                {globalClientsText}
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">150+</p>
              <p className="text-sm text-slate-600 mt-1">
                {countriesText}
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">26</p>
              <p className="text-sm text-slate-600 mt-1">
                {yearsText}
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">4.9/5</p>
              <p className="text-sm text-slate-600 mt-1">
                {ratingText}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 text-center shadow-sm border border-slate-100">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            {ctaTitle}
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            {ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
            >
              {freeAssessmentText}
            </Link>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
            >
              {browseProductsText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({
  testimonial,
  locale
}: {
  testimonial: Testimonial;
  locale: string;
}) {
  const countryFlag = countryFlags[testimonial.country] || "🌍";

  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Quote Icon Decoration */}
      <div className="absolute top-4 right-4 opacity-10">
        <Quote className="h-16 w-16 text-slate-400" />
      </div>

      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-5">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            className="h-5 w-5 fill-amber-400 text-amber-400"
          />
        ))}
      </div>

      {/* Quote Text */}
      <blockquote className="text-slate-700 leading-relaxed mb-6 relative z-10">
        <p className="text-sm lg:text-base">&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
        {/* Avatar */}
        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${testimonial.color} text-white font-bold text-lg shrink-0`}>
          {testimonial.initials}
        </div>

        {/* Name & Title */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-slate-900 truncate">{testimonial.name}</p>
            <span className="text-lg">{countryFlag}</span>
          </div>
          <p className="text-sm text-slate-500 truncate">
            {testimonial.title}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}
