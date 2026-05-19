"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimateOnScroll } from "@/components/layout/AnimateOnScroll";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { solutionsData } from "@/data/solutions";

const appIcons: Record<string, React.ReactNode> = {
  rd: (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  mfg: (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  ev: (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  ess: (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
    </svg>
  ),
  consumer: (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  supercap: (
    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

const appColors: Record<string, string> = {
  rd: "#2563eb",
  mfg: "#059669",
  ev: "#dc2626",
  ess: "#7c3aed",
  consumer: "#d97706",
  supercap: "#0891b2",
};

interface Props {
  locale: string;
}

export function SolutionsClient({ locale }: Props) {
  const t = useTranslations("solutions");
  const isZh = locale === "zh";
  const isVi = locale === "vi";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb
          items={[
            { label: isZh ? "首页" : isVi ? "Trang chủ" : "Home", href: `/${locale}` },
            { label: t("title") }
          ]}
          locale={locale}
        />
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {solutionsData.map((sol, i) => {
          const color = appColors[sol.id] ?? "#1e40af";

          return (
            <AnimateOnScroll key={sol.id} delay={i * 0.1}>
              <Card className="overflow-hidden">
                <div className="h-1.5 w-full" style={{ backgroundColor: color }} aria-hidden="true" />
                <CardContent className="p-8 sm:p-10">
                  <div className="grid lg:grid-cols-3 gap-10">
                    {/* Left: Info */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="flex items-center gap-4">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-2xl"
                          style={{ backgroundColor: `${color}15`, color }}
                          aria-hidden="true"
                        >
                          {appIcons[sol.id]}
                        </div>
                        <h2 className="text-2xl font-extrabold text-slate-900">
                          {isZh ? sol.title.zh : sol.title.en}
                        </h2>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {isZh ? sol.desc.zh : sol.desc.en}
                      </p>

                      {/* Features */}
                      <div>
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
                          {t("keyFeatures")}
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {(isZh ? sol.features.zh : sol.features.en).map((feat) => (
                            <div key={feat} className="flex items-center gap-2 text-sm text-slate-600">
                              <div
                                className="h-1.5 w-1.5 rounded-full shrink-0"
                                style={{ backgroundColor: color }}
                                aria-hidden="true"
                              />
                              {feat}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Products */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                        {isZh ? sol.products.zh : sol.products.en}
                      </h3>
                      <div className="space-y-2">
                        {(isZh ? sol.productLinks.zh : sol.productLinks.en).map((prod) => (
                          <div
                            key={prod}
                            className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                          >
                            <span className="text-sm font-medium text-slate-700">{prod}</span>
                            <ArrowRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                          </div>
                        ))}
                      </div>
                      <Link href={`/${locale}/solutions`}>
                        <Button
                          variant="outline"
                          className="w-full mt-2 font-semibold"
                          style={{ borderColor: color, color }}
                        >
                          {t("learnMore")}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          );
        })}
      </div>
    </div>
  );
}
