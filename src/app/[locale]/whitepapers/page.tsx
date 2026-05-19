import { setRequestLocale, getMessages } from "next-intl/server";
import { Metadata } from "next";
import { WhitepapersClient } from "./WhitepapersClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";
  const isVi = locale === "vi";

  return {
    title: isZh ? "白皮书与指南 | NEWARE" : isVi ? "Báo cáo trắng & Hướng dẫn | NEWARE" : "Whitepapers & Guides | NEWARE",
    description: isZh
      ? "免费下载NEWARE专家编写的技术白皮书和选购指南，涵盖竞品分析、选型指南和技术白皮书"
      : isVi
      ? "Tải miễn phí các báo cáo trắng và hướng dẫn kỹ thuật từ các chuyên gia NEWARE"
      : "Download free technical whitepapers and buying guides from NEWARE experts covering competitive analysis, equipment selection, and energy recovery technology",
    keywords: ["whitepaper", "battery testing guide", "NEWARE", "competitive analysis", "equipment selection", "TCO analysis"],
    openGraph: {
      title: isZh ? "白皮书与指南 | NEWARE" : isVi ? "Báo cáo trắng & Hướng dẫn | NEWARE" : "Whitepapers & Guides | NEWARE",
      description: isZh
        ? "免费下载NEWARE专家编写的技术白皮书和选购指南"
        : isVi
        ? "Tải miễn phí các báo cáo trắng và hướng dẫn kỹ thuật từ các chuyên gia NEWARE"
        : "Download free technical whitepapers and buying guides from NEWARE experts",
      type: "website",
    },
  };
}

export default async function WhitepapersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return <WhitepapersClient locale={locale} messages={messages} />;
}
