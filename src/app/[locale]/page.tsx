import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ClientLogosSection } from "@/components/home/ClientLogosSection";
import { ProductSection } from "@/components/home/ProductSection";
import { WhyNewareSection } from "@/components/home/WhyNewareSection";
import { ApplicationSection } from "@/components/home/ApplicationSection";
import { VideoSection } from "@/components/home/VideoSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";
  const isVi = locale === "vi";

  return {
    title: {
      default: isZh
        ? "NEWARE — 精密电池测试设备制造专家"
        : isVi
        ? "NEWARE Vietnam — Thiết bị kiểm tra pin chính xác cao"
        : "NEWARE — Precision Battery Testing Equipment Since 1998",
      template: "%s | NEWARE",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <ClientLogosSection />
      <ProductSection />
      <VideoSection />
      <WhyNewareSection />
      <ApplicationSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
