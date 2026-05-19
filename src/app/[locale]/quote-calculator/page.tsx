import { setRequestLocale, getMessages } from "next-intl/server";
import { Metadata } from "next";
import { CalculatorClient } from "./CalculatorClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";
  const isVi = locale === "vi";

  return {
    title: isZh ? "产品配置器 | NEWARE" : isVi ? "Cấu hình sản phẩm | NEWARE" : "Product Configurator | NEWARE",
    description: isZh
      ? "回答几个简单问题，NEWARE系统为您推荐最适合的电池测试设备配置，并获取详细报价"
      : isVi
      ? "Trả lời một vài câu hỏi đơn giản để hệ thống NEWARE đề xuất cấu hình thiết bị kiểm tra pin phù hợp nhất và nhận báo giá chi tiết"
      : "Answer a few simple questions and get NEWARE's recommendation for the best battery testing equipment configuration for your needs, plus a detailed quote",
    keywords: ["product configurator", "NEWARE quote", "battery tester selection", "equipment recommendation"],
    openGraph: {
      title: isZh ? "产品配置器 | NEWARE" : isVi ? "Cấu hình sản phẩm | NEWARE" : "Product Configurator | NEWARE",
      description: isZh
        ? "回答几个简单问题，获取NEWARE设备推荐和详细报价"
        : isVi
        ? "Trả lời một vài câu hỏi đơn giản để nhận đề xuất thiết bị NEWARE và báo giá chi tiết"
        : "Answer a few questions to get NEWARE equipment recommendations and a detailed quote",
      type: "website",
    },
  };
}

export default async function QuoteCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return <CalculatorClient locale={locale} messages={messages} />;
}
