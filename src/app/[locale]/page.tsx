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
import { VietnamHomeSection } from "@/components/home/VietnamHomeSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === "vi";
  const isZh = locale === "zh";

  return {
    title: {
      default: isVi
        ? "NEWARE Vietnam — Thiết bị kiểm tra pin & Điện trở công nghiệp"
        : isZh
        ? "NEWARE — 精密电池测试设备制造专家"
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
  const isZh = locale === "zh";
  const isVi = locale === "vi";

  if (isVi) {
    return (
      <>
        <VietnamHomeSection />
        <StatsSection />
        <ProductSection />
        <WhyNewareSection />
        <ApplicationSection />
        <VideoSection />
        <TestimonialsSection />
        <CTASection />
      </>
    );
  }

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
