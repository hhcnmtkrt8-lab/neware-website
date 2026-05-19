import { setRequestLocale, getMessages } from "next-intl/server";
import { Metadata } from "next";
import { TestimonialsPageClient } from "./TestimonialsPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";
  const isVi = locale === "vi";

  return {
    title: isZh ? "客户评价 | NEWARE" : isVi ? "Đánh giá khách hàng | NEWARE" : "Customer Reviews | NEWARE",
    description: isZh
      ? "查看来自全球电池实验室和制造商的NEWARE电池测试设备真实客户评价。覆盖Tesla、RWTH Aachen、CATL、LG、三星SDI等知名机构。"
      : isVi
      ? "Xem đánh giá thực tế từ khách hàng về thiết bị kiểm tra pin NEWARE từ các phòng thí nghiệm và nhà sản xuất pin trên toàn thế giới."
      : "Read genuine customer reviews of NEWARE battery testing equipment from labs and manufacturers worldwide including Tesla, RWTH Aachen, CATL, LG, and Samsung SDI.",
    keywords: ["customer reviews", "NEWARE testimonials", "battery testing review", "customer feedback"],
    openGraph: {
      title: isZh ? "客户评价 | NEWARE" : isVi ? "Đánh giá khách hàng | NEWARE" : "Customer Reviews | NEWARE",
      description: isZh
        ? "查看来自全球电池实验室和制造商的NEWARE电池测试设备真实客户评价"
        : isVi
        ? "Xem đánh giá thực tế từ khách hàng về thiết bị kiểm tra pin NEWARE"
        : "Read genuine customer reviews of NEWARE battery testing equipment from labs and manufacturers worldwide",
      type: "website",
    },
  };
}

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return <TestimonialsPageClient locale={locale} messages={messages} />;
}
