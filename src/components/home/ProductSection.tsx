"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { productRoutes } from "@/data/neware";

export function ProductSection() {
  const t = useTranslations("home.products");
  const tProducts = useTranslations("products");
  const params = useParams();
  const locale = (params.locale as string) || "zh";
  const isZh = locale === "zh";

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productRoutes.map((route, i) => (
            <Link key={route.id} href={`/${locale}/products?route=${route.id}`}>
              <Card className="group cursor-pointer h-full overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 ring-1 ring-slate-200 hover:ring-2 animate-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}>
                <div className="h-1.5 w-full" style={{ backgroundColor: route.color }} />
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-white"
                      style={{ backgroundColor: route.color }}
                    >
                      {route.id.toUpperCase()}
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                      {isZh ? route.name : route.nameEn}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                      {isZh ? route.description : route.descriptionEn}
                    </p>
                  </div>
                  <div className="pt-2">
                    <span
                      className="text-sm font-semibold inline-flex items-center gap-1 transition-all"
                      style={{ color: route.color }}
                    >
                      {tProducts("viewDetails")}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-14 animate-fade-in">
          <Link href={`/${locale}/products`}>
            <Button size="lg" className="shadow-xl shadow-primary/20 font-semibold">
              {t("viewAll")}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
