"use client";

interface Props {
  locale: string;
  siteUrl: string;
}

export function ComparisonJsonLd({ locale, siteUrl }: Props) {
  const productGroups = [
    {
      "@type": "ProductGroup",
      "name": locale === "zh" ? "NEWARE CT-4000 电池循环测试仪" : locale === "vi" ? "NEWARE CT-4000 Bộ kiểm tra pin" : "NEWARE CT-4000 Battery Cycler",
      "description": locale === "zh" ? "0.05%FS精度，10/100Hz采样率，科研实验室最佳性价比" : locale === "vi" ? "Độ chính xác 0.05% FS, tốc độ lấy mẫu 10/100Hz, giá trị tốt nhất cho phòng thí nghiệm R&D" : "0.05% FS accuracy, 10/100Hz sampling rate, best value for research laboratories",
      "hasVariant": [
        {
          "@type": "Product",
          "name": locale === "zh" ? "NEWARE CT-4000 5V3A" : locale === "vi" ? "NEWARE CT-4000 5V3A" : "NEWARE CT-4000 5V3A",
          "description": locale === "zh" ? "5V/3A纽扣电池和小容量电池测试" : locale === "vi" ? "Thử nghiệm pin cúc áo và pin dung lượng nhỏ 5V/3A" : "Coin cell and small capacity battery testing at 5V/3A",
          "url": `${siteUrl}/${locale}/products/ct4000`,
        },
      ],
    },
    {
      "@type": "ProductGroup",
      "name": locale === "zh" ? "NEWARE BTS9000 高精度电池测试系统" : locale === "vi" ? "NEWARE BTS9000 Hệ thống thử nghiệm pin chính xác cao" : "NEWARE BTS9000 High-Precision Battery Testing System",
      "description": locale === "zh" ? "0.02%FS精度，1000Hz采样率，为先进研发设计" : locale === "vi" ? "Độ chính xác 0.02% FS, tốc độ lấy mẫu 1000Hz, được thiết kế cho R&D tiên tiến" : "0.02% FS accuracy, 1000Hz sampling, designed for advanced R&D",
      "hasVariant": [
        {
          "@type": "Product",
          "name": locale === "zh" ? "NEWARE BTS9000 5V6A" : locale === "vi" ? "NEWARE BTS9000 5V6A" : "NEWARE BTS9000 5V6A",
          "description": locale === "zh" ? "5V/6A高精度DCIR和脉冲测试" : locale === "vi" ? "Thử nghiệm DCIR và xung chính xác cao 5V/6A" : "High-precision DCIR and pulse testing at 5V/6A",
          "url": `${siteUrl}/${locale}/products/ct9000`,
        },
      ],
    },
    {
      "@type": "ProductGroup",
      "name": locale === "zh" ? "NEWARE CE-6000 能量回收电池测试系统" : locale === "vi" ? "NEWARE CE-6000 Hệ thống thử nghiệm pin thu hồi năng lượng" : "NEWARE CE-6000 Energy Recovery Battery Testing System",
      "description": locale === "zh" ? "IGBT能量回收技术，节省70%以上电费，为生产成型设计" : locale === "vi" ? "Công nghệ thu hồi năng lượng IGBT, tiết kiệm trên 70% chi phí điện, được thiết kế cho sản xuất tạo hình" : "IGBT energy recovery technology, saves 70%+ electricity costs, designed for production formation",
      "hasVariant": [
        {
          "@type": "Product",
          "name": locale === "zh" ? "NEWARE CE-6000 5V100A" : locale === "vi" ? "NEWARE CE-6000 5V100A" : "NEWARE CE-6000 5V100A",
          "description": locale === "zh" ? "5V/100A高功率成型和测试" : locale === "vi" ? "Tạo hình và thử nghiệm công suất cao 5V/100A" : "High-power formation and testing at 5V/100A",
          "url": `${siteUrl}/${locale}/products/ce6000`,
        },
      ],
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": locale === "zh" ? "NEWARE vs 竞品电池测试设备对比" : locale === "vi" ? "NEWARE vs Đối thủ cạnh tranh Thiết bị kiểm tra pin" : "NEWARE vs Competitors Battery Testing Equipment Comparison",
    "description": locale === "zh" ? "NEWARE与Arbin、Maccor等竞品的详细技术对比" : locale === "vi" ? "So sánh kỹ thuật chi tiết giữa NEWARE và Arbin, Maccor" : "Detailed technical comparison between NEWARE and Arbin, Maccor",
    "itemListElement": productGroups.map((group, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": group,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
