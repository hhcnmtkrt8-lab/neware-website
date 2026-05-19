"use client";

import { useState } from "react";
import { Star, Quote, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    id: "1",
    name: "Dr. S. C.",
    title: "Senior Battery R&D Engineer",
    company: "Leading Electric Vehicle Manufacturer (US)",
    country: "USA",
    quote: "We migrated from Arbin to NEWARE BTS9000 for our R&D lab. The 0.02% accuracy and 1000Hz sampling rate gave us data quality we never had before.",
    rating: 5,
    initials: "SC",
    color: "bg-blue-600",
    highlights: ["0.02% Accuracy", "1000Hz Sampling", "Smooth Migration"],
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
    color: "bg-emerald-600",
    highlights: ["5+ Years Running", "Intuitive Software", "EU Support"],
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
    color: "bg-purple-600",
    highlights: ["Energy Recovery", "$50K+ Savings/Year", "8-Month ROI"],
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
    color: "bg-orange-600",
    highlights: ["High Precision", "Seamless Migration", "Next-Gen Research"],
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
    color: "bg-teal-600",
    highlights: ["24/7 Operation", "Zero Failures", "Responsive Support"],
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
    color: "bg-cyan-600",
    highlights: ["5,000+ Channels", "Networked System", "Excellent Data Mgmt"],
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
    color: "bg-indigo-600",
    highlights: ["DCIR Precision", "Solid-State R&D", "Next-Gen Data"],
  },
  {
    id: "8",
    name: "Prof. Hans Mueller",
    title: "Head of Energy Storage Department",
    company: "Fraunhofer Institute",
    country: "Germany",
    quote: "NEWARE Germany provides outstanding technical support. Their engineers understand battery science deeply and help us optimize our test protocols. Best equipment support I have experienced in 20 years.",
    rating: 5,
    initials: "HM",
    color: "bg-slate-600",
    highlights: ["Deep Technical Knowledge", "Protocol Optimization", "20 Years Experience"],
  },
];

const countryFlags: Record<string, string> = {
  USA: "🇺🇸",
  Germany: "🇩🇪",
  China: "🇨🇳",
  Japan: "🇯🇵",
  "South Korea": "🇰🇷",
};

interface Props {
  locale: string;
  messages: Record<string, unknown>;
}

function t(key: string, messages: Record<string, unknown>, locale: string, fallback: string): string {
  const keys = key.split(".");
  let val: unknown = messages;
  for (const k of keys) {
    val = (val as Record<string, unknown>)?.[k];
  }
  return typeof val === "string" ? val : fallback;
}

export function TestimonialsPageClient({ locale, messages }: Props) {
  const [activeCountry, setActiveCountry] = useState<string>("All");

  const countries = ["All", ...Array.from(new Set(testimonials.map((t) => t.country)))];
  const filtered = testimonials.filter(
    (t) => activeCountry === "All" || t.country === activeCountry
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            {t("testimonials.title", messages, locale, "Customer Reviews")}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {t(
              "testimonials.subtitle",
              messages,
              locale,
              "Trusted by leading battery labs and manufacturers worldwide"
            )}
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">{testimonials.length}</div>
              <div className="text-sm text-slate-500">
                {locale === "zh" ? "客户评价" : locale === "vi" ? "Đánh giá" : "Reviews"}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">4.9</div>
              <div className="text-sm text-slate-500 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {locale === "zh" ? "平均评分" : locale === "vi" ? "Đánh giá TB" : "Avg Rating"}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">32,000+</div>
              <div className="text-sm text-slate-500">
                {locale === "zh" ? "全球客户" : locale === "vi" ? "Khách hàng" : "Global Clients"}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">150+</div>
              <div className="text-sm text-slate-500">
                {locale === "zh" ? "覆盖国家" : locale === "vi" ? "Quốc gia" : "Countries"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Country Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => setActiveCountry(country)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCountry === country
                  ? "bg-primary text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {country === "All"
                ? locale === "zh"
                  ? "全部"
                  : locale === "vi"
                  ? "Tất cả"
                  : "All"
                : `${countryFlags[country] || "🌍"} ${country}`}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-slate-200 dark:text-slate-700" />
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic pl-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.highlights.map((h) => (
                    <Badge key={h} variant="secondary" className="text-xs">
                      {h}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div
                    className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0`}
                  >
                    {item.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900 dark:text-white">{item.name}</div>
                    <div className="text-sm text-slate-500 truncate">{item.title}</div>
                    <div className="flex items-center gap-1 text-sm text-slate-500 mt-0.5">
                      <Building2 className="w-3 h-3 shrink-0" />
                      <span>{item.company}</span>
                      <span>{countryFlags[item.country] || "🌍"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
