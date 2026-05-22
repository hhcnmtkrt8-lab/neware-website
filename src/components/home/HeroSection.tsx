"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Shield, Zap, Globe, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroComparison } from "@/components/home/HeroComparison";
import { useParams } from "next/navigation";

function TrustBadge({
  icon: Icon,
  label,
  color,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  color: string;
}) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] whitespace-nowrap">
      <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} />
      <span>{label}</span>
    </div>
  );
}

export function HeroSection() {
  const t = useTranslations("home.hero");
  const params = useParams();
  const locale = (params.locale as string) || "en";

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#f8fafc" }}>

      {/* Layer 1: Aero-light radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 70% 0%, rgba(219,234,254,0.55) 0%, rgba(238,242,255,0.25) 45%, rgba(248,250,252,0) 100%)",
        }}
      />

      {/* Layer 2: Precision micro-grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(203,213,225,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(203,213,225,0.18) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          opacity: 0.5,
        }}
      />

      {/* Layer 3: Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(248,250,252,1) 0%, transparent 100%)" }}
      />

      {/* Layer 4: Top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.9), transparent)" }}
      />

      {/* Main container */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: Text content */}
          <div className="space-y-8 max-w-xl">

            {/* Animated badge pill */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-sm font-medium text-blue-700 shadow-sm leading-snug">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                {t("badge")}
              </div>
            </div>

            {/* Main headline */}
            <div className="space-y-0.5 animate-fade-in-up-1">
              <h1 className="text-[2.75rem] sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-extrabold tracking-tight leading-[1.05] text-slate-900">
                {t("title")}
              </h1>
              <p className="text-[2.75rem] sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-extrabold tracking-tight leading-[1.05] bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
                {t("titleLine2")}
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed animate-fade-in-up-2">
              {t("subtitle")}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up-3">
              <Link href={`/${locale}/products`}>
                <Button
                  size="xl"
                  className="w-full sm:w-auto font-semibold text-[0.9375rem] px-6 py-3.5 rounded-xl shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 whitespace-nowrap"
                >
                  {t("cta")}
                  <ArrowRight className="h-4 w-4 shrink-0 ml-1" />
                </Button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <Button
                  size="xl"
                  variant="outline"
                  className="w-full sm:w-auto font-semibold text-[0.9375rem] px-6 py-3.5 rounded-xl border border-slate-200 text-slate-700 bg-white hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  {t("ctaAlt")}
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-2 animate-fade-in-up-4">
              <TrustBadge icon={Shield} label={t("trustIso9001")}   color="#22c55e" />
              <TrustBadge icon={Globe}  label={t("trustCountries")}  color="#3b82f6" />
              <TrustBadge icon={Clock}  label={t("trustExperience")} color="#f59e0b" />
              <TrustBadge icon={Zap}    label={t("trustAccuracy")}   color="#8b5cf6" />
            </div>
          </div>

          {/* RIGHT: Dashboard card (desktop) */}
          <div className="relative hidden lg:flex items-center justify-center animate-fade-in-up-2">
            <HeroComparison locale={locale} />
          </div>

          {/* Mobile fallback */}
          <div className="relative lg:hidden animate-fade-in-up-2">
            <HeroComparison locale={locale} />
          </div>

        </div>
      </div>
    </section>
  );
}
