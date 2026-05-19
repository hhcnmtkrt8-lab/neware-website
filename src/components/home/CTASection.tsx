"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Users, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const t = useTranslations("home.cta");
  const params = useParams();
  const locale = (params.locale as string) || "zh";
  const isZh = locale === "zh";
  const isVi = locale === "vi";
  const isRu = locale === "ru";

  const socialProof = {
    en: { clients: "32,000+", countries: "150+", uptime: "99.9%" },
    zh: { clients: "32,000+", countries: "150+", uptime: "99.9%" },
    vi: { clients: "32.000+", countries: "150+", uptime: "99.9%" },
    ru: { clients: "32 000+", countries: "150+", uptime: "99.9%" },
  };

  const proof = socialProof[locale as keyof typeof socialProof] || socialProof.en;

  return (
    <section className="py-20 sm:py-28 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }} />
      </div>
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
        {/* Social Proof Numbers */}
        <div className="flex items-center justify-center gap-6 sm:gap-12 mb-8">
          <div className="flex items-center gap-2 text-blue-100">
            <Users className="w-5 h-5" />
            <span className="font-bold text-white">{proof.clients}</span>
            <span className="text-sm opacity-80">{isZh ? "客户" : isVi ? "khách hàng" : isRu ? "клиентов" : "clients"}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-blue-100">
            <Zap className="w-5 h-5" />
            <span className="font-bold text-white">{proof.uptime}</span>
            <span className="text-sm opacity-80">{isZh ? "运行时间" : isVi ? "hoạt động" : isRu ? "время работы" : "uptime"}</span>
          </div>
          <div className="flex items-center gap-2 text-blue-100">
            <Award className="w-5 h-5" />
            <span className="font-bold text-white">{proof.countries}</span>
            <span className="text-sm opacity-80">{isZh ? "国家" : isVi ? "quốc gia" : isRu ? "стран" : "countries"}</span>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            {t("title")}
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="pt-4">
            <Link href={`/${locale}/contact`}>
              <Button
                size="xl"
                className="bg-white text-primary hover:bg-blue-50 shadow-2xl font-bold text-base px-10 animate-pulse-slow"
              >
                {t("button")}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-blue-200 opacity-80">
            {isZh ? "✓ 免费咨询  ✓ 无需信用卡  ✓ 24小时内回复" : isVi ? "✓ Tư vấn miễn phí  ✓ Không cần thẻ tín dụng  ✓ Phản hồi trong 24h" : isRu ? "✓ Бесплатная консультация  ✓ Без кредитной карты  ✓ Ответ в течение 24ч" : "✓ Free consultation  ✓ No credit card required  ✓ Response within 24h"}
          </p>
        </div>
      </div>
    </section>
  );
}
