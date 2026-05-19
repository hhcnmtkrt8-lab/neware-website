"use client";

import Link from "next/link";
import { competitors, comparisonMetrics, Competitor } from "@/data/competitors";
import { comparisonMetrics as metricsConfig } from "@/data/competitors";

interface CompareClientProps {
  competitors: Competitor[];
  locale: string;
  messages: Record<string, unknown>;
}

export function CompareClient({ competitors, locale, messages }: CompareClientProps) {
  const t = messages.compare as Record<string, string>;
  const isZh = locale === "zh";
  const isVi = locale === "vi";

  const getLocaleLabel = (metricKey: string): string => {
    const labelMap: Record<string, Record<string, string>> = {
      en: {
        metricAccuracy: "Accuracy",
        metricSamplingRate: "Max Sampling Rate",
        metricEnergyRecovery: "Energy Recovery",
        metricChannels: "Max Channels",
        metricVoltage: "Max Voltage",
        metricCurrent: "Max Current",
        metricProductSeries: "Product Series",
        metricCountries: "Countries Served",
        metricCustomers: "Customers",
        metricSoftware: "Software Updates",
        metricMigration: "Data Migration",
        metricSupport: "Support Hours",
        metricWarranty: "Warranty",
        metricPrice: "Price Range",
      },
      zh: {
        metricAccuracy: "精度",
        metricSamplingRate: "最高采样率",
        metricEnergyRecovery: "能量回收",
        metricChannels: "最多通道数",
        metricVoltage: "最高电压",
        metricCurrent: "最大电流",
        metricProductSeries: "产品系列",
        metricCountries: "服务国家",
        metricCustomers: "客户数量",
        metricSoftware: "软件升级",
        metricMigration: "数据迁移",
        metricSupport: "支持时间",
        metricWarranty: "保修期",
        metricPrice: "价格区间",
      },
      vi: {
        metricAccuracy: "Độ chính xác",
        metricSamplingRate: "Tần số lấy mẫu tối đa",
        metricEnergyRecovery: "Phục hồi năng lượng",
        metricChannels: "Kênh tối đa",
        metricVoltage: "Điện áp tối đa",
        metricCurrent: "Dòng điện tối đa",
        metricProductSeries: "Dòng sản phẩm",
        metricCountries: "Quốc gia phục vụ",
        metricCustomers: "Khách hàng",
        metricSoftware: "Cập nhật phần mềm",
        metricMigration: "Di chuyển dữ liệu",
        metricSupport: "Giờ hỗ trợ",
        metricWarranty: "Bảo hành",
        metricPrice: "Mức giá",
      },
      ru: {
        metricAccuracy: "Точность",
        metricSamplingRate: "Макс. частота дискретизации",
        metricEnergyRecovery: "Возврат энергии",
        metricChannels: "Макс. количество каналов",
        metricVoltage: "Макс. напряжение",
        metricCurrent: "Макс. ток",
        metricProductSeries: "Серии продукции",
        metricCountries: "Страны присутствия",
        metricCustomers: "Клиенты",
        metricSoftware: "Обновления ПО",
        metricMigration: "Миграция данных",
        metricSupport: "Часы поддержки",
        metricWarranty: "Гарантия",
        metricPrice: "Диапазон цен",
      },
    };
    return labelMap[locale as keyof typeof labelMap]?.[metricKey] || labelMap.en[metricKey] || metricKey;
  };

  const getLocalizedValue = (competitor: Competitor, flagKey: string): string => {
    const flag = competitor.flags[flagKey as keyof typeof competitor.flags];
    if (!flag) return "";
    
    if (isZh) {
      const zhValues: Record<string, string> = {
        "Not supported": "不支持",
        "Limited": "有限支持",
        "Not available": "不可用",
        "Annual license fee": "年费许可",
        "Included": "包含",
        "Free Support": "免费支持",
        "Lifetime Free": "终身免费",
        "Business hours": "工作时间",
        "7×24h": "7×24小时",
      };
      return zhValues[flag.value] || flag.value;
    }
    
    if (isVi) {
      const viValues: Record<string, string> = {
        "Not supported": "Không hỗ trợ",
        "Limited": "Hạn chế",
        "Not available": "Không khả dụng",
        "Annual license fee": "Phí license hàng năm",
        "Included": "Bao gồm",
        "Free Support": "Hỗ trợ miễn phí",
        "Lifetime Free": "Miễn phí trọn đời",
        "Business hours": "Giờ hành chính",
        "7×24h": "7×24h",
      };
      return viValues[flag.value] || flag.value;
    }

    if (locale === "ru") {
      const ruValues: Record<string, string> = {
        "Not supported": "Не поддерживается",
        "Limited": "Ограничено",
        "Not available": "Недоступно",
        "Annual license fee": "Ежегодная лицензия",
        "Included": "Включено",
        "Free Support": "Бесплатная поддержка",
        "Lifetime Free": "Бесплатно на весь срок",
        "Business hours": "Рабочее время",
        "7×24h": "7×24ч",
      };
      return ruValues[flag.value] || flag.value;
    }

    return flag.value;
  };

  const renderPriceIndicator = (value: string) => {
    const count = value.replace(/[^$]/g, "").length;
    return (
      <div className="flex items-center gap-1">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className={`text-lg font-semibold ${i < count ? "text-amber-500" : "text-gray-300"}`}
          >
            $
          </span>
        ))}
      </div>
    );
  };

  const renderCellValue = (competitor: Competitor, flagKey: string) => {
    const flag = competitor.flags[flagKey as keyof typeof competitor.flags];
    if (!flag) return null;

    const isNeware = competitor.id === "neware";
    const isWinner = flag.winner && !isNeware;

    if (flagKey === "priceRange") {
      return (
        <div className={isWinner ? "opacity-50" : ""}>
          {renderPriceIndicator(flag.value)}
        </div>
      );
    }

    return (
      <div className={`flex items-center gap-2 ${isWinner ? "opacity-50" : ""}`}>
        <span className={isWinner ? "text-gray-400 line-through" : ""}>
          {getLocalizedValue(competitor, flagKey)}
        </span>
        {flag.winner && (
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-600">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.highlightNote || "NEWARE highlighted"}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t.title || "Battery Tester Comparison"}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              {t.subtitle || "Compare NEWARE with Arbin, Maccor and Bio-Logic"}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-emerald-500/25"
            >
              {t.getQuote || "Get Free Quote"}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Overview Cards */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {competitors.map((competitor) => {
              const isNeware = competitor.id === "neware";
              return (
                <div
                  key={competitor.id}
                  className={`bg-white rounded-xl p-6 shadow-md border-2 transition-all ${
                    isNeware
                      ? "border-emerald-500 shadow-emerald-100 ring-2 ring-emerald-500/20"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  {isNeware && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded mb-3">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {t.metricWinner || "Winner"}
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-400">
                        {competitor.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className={`font-bold ${isNeware ? "text-emerald-600" : "text-gray-900"}`}>
                        {competitor.name}
                      </h3>
                      <p className="text-sm text-gray-500">{competitor.founded}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{competitor.tagline}</p>
                  <p className="text-xs text-gray-500">{competitor.headquarters}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {competitor.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-4 font-semibold text-gray-700 sticky left-0 bg-gray-50 min-w-[180px]">
                      {t.metric || "Metric"}
                    </th>
                    {competitors.map((competitor) => (
                      <th
                        key={competitor.id}
                        className={`px-6 py-4 font-bold text-center min-w-[160px] ${
                          competitor.id === "neware"
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700"
                        }`}
                      >
                        {competitor.name}
                        {competitor.id === "neware" && (
                          <span className="ml-2 inline-flex items-center justify-center w-4 h-4 bg-emerald-500 text-white text-xs rounded-full">
                            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonMetrics.map((metric, index) => (
                    <tr
                      key={metric.key}
                      className={`border-b border-gray-100 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-700 sticky left-0 bg-inherit">
                        {getLocaleLabel(metric.labelKey)}
                      </td>
                      {competitors.map((competitor) => (
                        <td
                          key={competitor.id}
                          className={`px-6 py-4 text-center ${
                            competitor.id === "neware" ? "bg-emerald-50/50" : ""
                          }`}
                        >
                          {renderCellValue(competitor, metric.key)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-6 p-4">
              {competitors.map((competitor) => {
                const isNeware = competitor.id === "neware";
                return (
                  <div
                    key={competitor.id}
                    className={`rounded-xl border-2 overflow-hidden ${
                      isNeware ? "border-emerald-500" : "border-gray-200"
                    }`}
                  >
                    <div
                      className={`px-4 py-3 font-bold text-center ${
                        isNeware ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {competitor.name}
                    </div>
                    <div className="divide-y divide-gray-100">
                      {comparisonMetrics.map((metric) => (
                        <div
                          key={metric.key}
                          className="flex justify-between items-center px-4 py-3"
                        >
                          <span className="text-sm text-gray-600">
                            {getLocaleLabel(metric.labelKey)}
                          </span>
                          <span
                            className={`text-sm font-medium ${
                              isNeware ? "text-emerald-700" : "text-gray-900"
                            }`}
                          >
                            {renderCellValue(competitor, metric.key)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pros & Cons Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {isZh ? "详细对比" : isVi ? "So sánh chi tiết" : "Detailed Comparison"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {competitors.map((competitor) => {
              const isNeware = competitor.id === "neware";
              return (
                <div
                  key={competitor.id}
                  className={`bg-white rounded-xl shadow-md overflow-hidden border-2 ${
                    isNeware ? "border-emerald-500" : "border-gray-100"
                  }`}
                >
                  <div
                    className={`px-6 py-4 font-bold text-lg ${
                      isNeware ? "bg-emerald-500 text-white" : "bg-gray-800 text-white"
                    }`}
                  >
                    {competitor.name}
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Pros */}
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-emerald-600 mb-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {t.pros || "Pros"}
                      </h4>
                      <ul className="space-y-2">
                        {competitor.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-emerald-500 mt-0.5">+</span>
                            <span>{isZh && isNeware ? pro : isVi && isNeware ? pro : pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Cons */}
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-red-500 mb-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {t.cons || "Cons"}
                      </h4>
                      <ul className="space-y-2">
                        {competitor.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-red-400 mt-0.5">−</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Certifications */}
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        {t.certifications || "Certifications"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {competitor.certifications.map((cert) => (
                          <span
                            key={cert}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
            {t.ctaTitle || "Ready to Choose the Best Battery Tester?"}
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            {t.ctaSubtitle ||
              "Contact our engineers for a personalized recommendation and free quote"}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105"
          >
            {t.getQuote || "Get Free Quote"}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
