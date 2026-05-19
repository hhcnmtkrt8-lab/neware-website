"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Star, Quote, ChevronRight } from "lucide-react";

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

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const params = useParams();
  const locale = (params.locale as string) || "en";

  const sectionTitle = t("title");
  const sectionSubtitle = t("subtitle");
  const viewAllText = t("viewAll");
  const trustClients = useTranslations("home.stats")("clients");
  const trustCountries = useTranslations("home.stats")("countries");
  const trustYears = useTranslations("home.stats")("years");

  // Show only first 4 testimonials on homepage
  const displayedTestimonials = testimonials.slice(0, 4);

  return (
    <section className="py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {sectionTitle}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              {sectionSubtitle}
            </p>
          </div>
          <Link
            href={`/${locale}/testimonials`}
            className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            {viewAllText}
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Testimonials Grid - 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {displayedTestimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              locale={locale}
            />
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href={`/${locale}/testimonials`}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            {viewAllText}
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-14 pt-10 border-t border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">32,000+</p>
              <p className="text-sm text-slate-600 mt-1">{trustClients}</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">150+</p>
              <p className="text-sm text-slate-600 mt-1">{trustCountries}</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">26</p>
              <p className="text-sm text-slate-600 mt-1">{trustYears}</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">4.9/5</p>
              <p className="text-sm text-slate-600 mt-1">
                {t("customerRating")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
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

export { testimonials };
