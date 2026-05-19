"use client";

interface Props {
  locale: string;
  siteUrl: string;
}

export function GlossaryJsonLd({ locale, siteUrl }: Props) {
  const terms = [
    { term: "DCIR (Direct Current Internal Resistance)", zh: "直流内阻", vi: "Điện trở nội một chiều" },
    { term: "Full Scale (FS)", zh: "满量程", vi: "Thang đo đầy đủ (FS)" },
    { term: "Accuracy", zh: "精度", vi: "Độ chính xác" },
    { term: "Sampling Rate", zh: "采样率", vi: "Tốc độ lấy mẫu" },
    { term: "Energy Recovery", zh: "能量回收", vi: "Thu hồi năng lượng" },
    { term: "Formation", zh: "成型", vi: "Tạo hình" },
    { term: "HPPC (Hybrid Pulse Power Characterization)", zh: "脉冲功率特性", vi: "Đặc tính công suất xung" },
    { term: "CCCV (Constant Current Constant Voltage)", zh: "恒流恒压", vi: "Dòng không đổi Điện áp không đổi" },
    { term: "Cycle Life", zh: "循环寿命", vi: "Tuổi thọ chu kỳ" },
    { term: "Channel", zh: "通道", vi: "Kênh" },
    { term: "SEI Layer (Solid Electrolyte Interphase)", zh: "SEI层", vi: "Lớp SEI" },
    { term: "State of Charge (SOC)", zh: "荷电状态", vi: "Trạng thái sạc" },
    { term: "C-Rate", zh: "C倍率", vi: "Tốc độ C" },
    { term: "OCV (Open Circuit Voltage)", zh: "开路电压", vi: "Điện áp hở mạch" },
    { term: "Internal Resistance", zh: "内阻", vi: "Điện trở nội" },
    { term: "Pulse Test", zh: "脉冲测试", vi: "Thử nghiệm xung" },
    { term: "IGBT (Insulated Gate Bipolar Transistor)", zh: "绝缘栅双极晶体管", vi: "Transistor lưỡng cực cổng cách ly" },
    { term: "Power Factor", zh: "功率因数", vi: "Hệ số công suất" },
    { term: "Grid-tied", zh: "并网", vi: "Kết nối lưới" },
    { term: "Gigafactory", zh: "超级工厂", vi: "Nhà máy gigafactory" },
  ];

  const descriptions: Record<string, string> = {
    en: "NEWARE battery testing equipment glossary with detailed definitions for DCIR, accuracy, sampling rate, energy recovery, and core concepts for battery researchers and engineers.",
    zh: "NEWARE电池测试设备专业术语表，包含DCIR、精度、采样率、能量回收等核心概念的详细定义，为电池研究人员和工程师提供全面的技术参考。",
    vi: "Bảng thuật ngữ thiết bị kiểm tra pin NEWARE với định nghĩa chi tiết về DCIR, độ chính xác, tốc độ lấy mẫu, thu hồi năng lượng cho các nhà nghiên cứu pin.",
  };

  const localizedTerms = terms.map(t => ({
    "@type": "DefinedTerm",
    "name": locale === "zh" ? `${t.term} / ${t.zh}` : locale === "vi" ? `${t.term} / ${t.vi}` : t.term,
    "description": descriptions[locale] || descriptions.en,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": locale === "zh" ? "电池测试术语表" : locale === "vi" ? "Bảng thuật ngữ kiểm tra pin" : "Battery Testing Glossary",
    "description": descriptions[locale] || descriptions.en,
    "url": `${siteUrl}/${locale}/glossary`,
    "publisher": {
      "@type": "Organization",
      "name": "NEWARE",
      "url": siteUrl,
    },
    "about": {
      "@type": "Thing",
      "name": locale === "zh" ? "电池测试设备" : locale === "vi" ? "Thiết bị kiểm tra pin" : "Battery Testing Equipment",
    },
    "hasDefinedTerm": localizedTerms,
    "inLanguage": locale === "vi" ? "vi" : locale === "zh" ? "zh" : "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
