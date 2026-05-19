"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { MapPin, Award, Users, TrendingUp, Phone, Mail, ArrowRight, CheckCircle, Building2, Globe, Clock, Target, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { AnimateOnScroll } from "@/components/layout/AnimateOnScroll";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { company } from "@/data/neware";

interface Props {
  locale: string;
}

const STATS = [
  { value: "26", suffix: "+", key: "statsYears" },
  { value: "500", suffix: "+", key: "statsEmployees" },
  { value: "150", suffix: "+", key: "statsCountries" },
  { value: "32,000", suffix: "+", key: "statsClients" },
  { value: "400,000", suffix: "+", key: "statsChannels" },
  { value: "1,000", suffix: "+", key: "statsPatents" },
];

const TIMELINE_EVENTS = [
  { year: 1998, titleKey: "timeline1998Title", descKey: "timeline1998Desc" },
  { year: 2003, titleKey: "timeline2003Title", descKey: "timeline2003Desc" },
  { year: 2005, titleKey: "timeline2005Title", descKey: "timeline2005Desc" },
  { year: 2012, titleKey: "timeline2012Title", descKey: "timeline2012Desc" },
  { year: 2018, titleKey: "timeline2018Title", descKey: "timeline2018Desc" },
  { year: 2024, titleKey: "timeline2024Title", descKey: "timeline2024Desc" },
];

const CERTIFICATIONS = [
  { zh: "ISO9001:2015质量管理体系认证", en: "ISO9001:2015 Quality Management" },
  { zh: "CE认证", en: "CE Certified" },
  { zh: "UL认证", en: "UL Listed" },
  { zh: "国家高新技术企业", en: "National High-Tech Enterprise" },
  { zh: "深圳企业500强", en: "Shenzhen Top 500 Enterprise" },
];

export function AboutClient({ locale }: Props) {
  const t = useTranslations("about");
  const isZh = locale === "zh";
  const isVi = locale === "vi";
  const isRu = locale === "ru";

  const shenzhenOffice = company.offices[0];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb
          items={[
            { label: isZh ? "首页" : isVi ? "Trang chủ" : isRu ? "Главная" : "Home", href: `/${locale}` },
            { label: isZh ? "关于我们" : isVi ? "Về chúng tôi" : isRu ? "О нас" : "About" }
          ]}
          locale={locale}
        />
      </div>

      {/* Hero */}
      <div className="relative bg-gradient-to-r from-primary via-primary-dark to-blue-700 text-white py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <Clock className="h-3.5 w-3.5" />
            {isZh ? "专注电池检测设备制造26年" : isVi ? "26 năm chuyên về thiết bị kiểm tra pin" : isRu ? "Прецизионное тестирование аккумуляторов с 1998 года" : "Precision Battery Testing Since 1998"}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            {isZh ? "关于 NEWARE" : isVi ? "Về NEWARE" : isRu ? "О компании NEWARE" : "About NEWARE"}
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            {isZh 
              ? "新威尔（NEWARE）成立于1998年，总部位于深圳，是全球领先的精密电池测试设备制造商。我们的设备服务于150+国家的32,000+客户。"
              : isVi
              ? "NEWARE được thành lập năm 1998, trụ sở tại Thâm Quyến, là nhà sản xuất thiết bị kiểm tra pin chính xác hàng đầu thế giới."
              : isRu
              ? "NEWARE основана в 1998 году, штаб-квартира в Шэньчжэне. Ведущий мировой производитель прецизионного оборудования для тестирования аккумуляторов, обслуживающий более 32 000 клиентов в 150+ странах."
              : "NEWARE was founded in 1998, headquartered in Shenzhen. We are the world's leading precision battery testing equipment manufacturer serving 32,000+ clients across 150+ countries."}
          </p>
          <Link href={`/${locale}/contact`}>
            <Button size="lg" className="bg-white text-primary hover:bg-blue-50 shadow-xl font-bold">
              {isZh ? "获取免费技术咨询" : isVi ? "Nhận tư vấn kỹ thuật miễn phí" : "Get Free Technical Consultation"}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-slate-900 text-white py-8 -mt-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {STATS.map((stat) => (
              <AnimateOnScroll key={stat.key}>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-primary">
                    {stat.value}<span className="text-primary/80">{stat.suffix}</span>
                  </div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">
                    {t(stat.key)}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Mission, Vision, Values */}
        <AnimateOnScroll>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t("mission")}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {isZh 
                    ? "为全球科研工作者和制造商提供最精准、最可靠、最具性价比的电池测试解决方案。"
                    : isVi
                    ? "Cung cấp các giải pháp kiểm tra pin chính xác, đáng tin cậy và tiết kiệm chi phí nhất cho các nhà nghiên cứu và nhà sản xuất trên toàn thế giới."
                    : "To provide researchers and manufacturers worldwide with the most precise, reliable, and cost-effective battery testing solutions."}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
              <CardContent className="p-8 text-center">
                <div className="h-14 w-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t("vision")}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {isZh 
                    ? "通过更快、更好的电池开发，加速全球清洁能源转型进程。"
                    : isVi
                    ? "Đẩy nhanh quá trình chuyển đổi năng lượng sạch toàn cầu bằng cách phát triển pin nhanh hơn và tốt hơn."
                    : "To accelerate the global transition to clean energy by enabling faster, better battery development."}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 border-emerald-500/20">
              <CardContent className="p-8 text-center">
                <div className="h-14 w-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t("values")}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {isZh 
                    ? "客户至上 · 创新驱动 · 品质为本 · 合作共赢"
                    : isVi
                    ? "Khách hàng là trung tâm · Đổi mới sáng tạo · Chất lượng là nền tảng · Hợp tác cùng có lợi"
                    : "Customer First · Innovation Driven · Quality Focused · Win-Win Partnership"}
                </p>
              </CardContent>
            </Card>
          </div>
        </AnimateOnScroll>

        <Separator />

        {/* Company Story */}
        <AnimateOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              {t("story")}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {isZh 
                ? "从1998年深圳一间小办公室，到今天服务150+国家的全球企业"
                : isVi
                ? "Từ một văn phòng nhỏ tại Thâm Quyến năm 1998 đến doanh nghiệp toàn cầu phục vụ 150+ quốc gia hôm nay"
                : "From a small office in Shenzhen in 1998 to a global enterprise serving 150+ countries today"}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p className="text-lg">
                {isZh
                  ? "1998年，五位工程师在深圳南山区创立了新威尔，立志打造属于中国自己的高精度电池测试设备。他们的第一款产品——CT-3000，虽然简陋，却开创了中国电池测试设备的先河。"
                  : isVi
                  ? "Năm 1998, năm kỹ sư thành lập NEWARE tại quận Nam Sơn, Thâm Quyến, với quyết tâm tạo ra thiết bị kiểm tra pin chính xác của riêng mình. Sản phẩm đầu tiên của họ - CT-3000, dù đơn giản, đã mở đường cho thiết bị kiểm tra pin Trung Quốc."
                  : "In 1998, five engineers founded NEWARE in Nanshan District, Shenzhen, determined to create China's own high-precision battery testing equipment. Their first product—the CT-3000, though simple, pioneered Chinese battery testing equipment."}
              </p>
              <p>
                {isZh
                  ? "2005年，CT-4000系列的发布标志着新威尔在精度方面取得了突破性进展。2012年，BTS9000系列问世，实现了0.02%的精度和1000Hz采样率，达到了当时的世界领先水平。"
                  : isVi
                  ? "Năm 2005, dòng sản phẩm CT-4000 đánh dấu bước đột phá về độ chính xác của NEWARE. Năm 2012, dòng BTS9000 ra mắt, đạt độ chính xác 0.02% và tần số lấy mẫu 1000Hz, đạt trình độ tiên tiến nhất thế giới."
                  : "In 2005, the CT-4000 series marked a breakthrough in accuracy. In 2012, the BTS9000 series achieved 0.02% accuracy and 1000Hz sampling rate, reaching world-leading standards."}
              </p>
              <p>
                {isZh
                  ? "2018年，新威尔推出CE-6000系列IGBT能量回馈测试系统，放电能量回收利用率超过70%，为大型电池生产线的节能降耗提供了革命性的解决方案。今天，新威尔已在全球部署超过40万通道电池测试设备。"
                  : isVi
                  ? "Năm 2018, NEWARE ra mắt dòng CE-6000 IGBT với hệ thống kiểm tra phục hồi năng lượng, đạt hiệu suất hồi phục hơn 70%. Ngày nay, NEWARE đã triển khai hơn 400.000 kênh thiết bị kiểm tra pin trên toàn thế giới."
                  : "In 2018, NEWARE launched the CE-6000 IGBT energy feedback testing system with 70%+ energy recovery. Today, NEWARE has deployed over 400,000 battery testing channels worldwide."}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                {isZh ? "公司历程" : isVi ? "Lịch sử công ty" : "Company Timeline"}
              </h3>
              <div className="space-y-4">
                {TIMELINE_EVENTS.map((event, i) => (
                  <div key={event.year} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-primary">{event.year}</span>
                      </div>
                      {i < TIMELINE_EVENTS.length - 1 && (
                        <div className="w-0.5 h-full bg-slate-200 my-2" />
                      )}
                    </div>
                    <div className="pb-6">
                      <h4 className="font-semibold text-slate-900 text-sm">{t(event.titleKey)}</h4>
                      <p className="text-xs text-slate-500">{t(event.descKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        <Separator />

        {/* Neware vs Competitor Comparison Table */}
        <AnimateOnScroll>
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              {t("vsCompetitor.title")}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {t("vsCompetitor.subtitle")}
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-900">
                    <th className="text-left px-6 py-4 text-slate-400 font-semibold uppercase tracking-wider text-xs">
                      {t("vsCompetitor.metric")}
                    </th>
                    <th className="text-center px-6 py-4 text-primary font-bold text-base">
                      {t("vsCompetitor.newareCol")} <CheckCircle className="inline h-4 w-4 ml-1" />
                    </th>
                    <th className="text-center px-6 py-4 text-slate-500 font-medium text-base">
                      {t("vsCompetitor.competitorCol")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { metricKey: "samplingRate", newareKey: "samplingNeware", competitorKey: "samplingCompetitor", highlight: true },
                    { metricKey: "accuracy", newareKey: "accuracyNeware", competitorKey: "accuracyCompetitor", highlight: true },
                    { metricKey: "energyRecovery", newareKey: "energyRecoveryNeware", competitorKey: "energyRecoveryCompetitor", highlight: true },
                    { metricKey: "unitsDeployed", newareKey: "unitsDeployedNeware", competitorKey: "unitsDeployedCompetitor", highlight: true },
                    { metricKey: "customers", newareKey: "customersNeware", competitorKey: "customersCompetitor", highlight: false },
                    { metricKey: "countries", newareKey: "countriesNeware", competitorKey: "countriesCompetitor", highlight: false },
                    { metricKey: "productSeries", newareKey: "productSeriesNeware", competitorKey: "productSeriesCompetitor", highlight: false },
                    { metricKey: "teamSize", newareKey: "teamSizeNeware", competitorKey: "teamSizeCompetitor", highlight: false },
                  ].map((row, i) => (
                    <tr
                      key={row.metricKey}
                      className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-blue-50 transition-colors`}
                    >
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {t(`vsCompetitor.${row.metricKey}` as any)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 font-bold text-primary">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                          {t(`vsCompetitor.${row.newareKey}` as any)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-slate-500 font-medium">
                        {t(`vsCompetitor.${row.competitorKey}` as any)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <CardContent className="px-6 py-4 bg-slate-50 border-t">
              <p className="text-xs text-slate-400">{t("vsCompetitor.note")}</p>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Link href={`/${locale}/contact`}>
              <Button size="lg" className="shadow-xl shadow-primary/30 font-semibold">
                {isZh ? "获取免费迁移评估" : isVi ? "Đánh giá di chuyển miễn phí" : "Get a Free Migration Assessment"}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </AnimateOnScroll>

        <Separator />

        {/* Global Offices */}
        <AnimateOnScroll>
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              {t("globalPresence")}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {isZh ? "在全球主要市场设有服务中心和代理商" : isVi ? "Có trung tâm dịch vụ và đại lý tại các thị trường chính trên toàn cầu" : "Service centers and agents in major markets worldwide"}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {company.offices.map((office, i) => (
              <AnimateOnScroll key={i} delay={i * 0.05}>
                <Card className="hover:shadow-lg hover:border-primary/30 transition-all h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">
                          {isZh ? office.city : office.cityEn}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {isZh ? office.country : office.countryEn}
                        </p>
                      </div>
                      <div className="text-xs font-semibold text-primary bg-primary/5 px-3 py-1.5 rounded-full">
                        {isZh ? office.role : office.roleEn}
                      </div>
                    </div>
                    <Separator />
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {isZh ? office.address : office.addressEn}
                    </p>
                    {office.phone && (
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Phone className="h-4 w-4 text-primary/60 shrink-0" />
                        <a href={`tel:${office.phone}`} className="hover:text-primary transition-colors">
                          {office.phone}
                        </a>
                      </div>
                    )}
                    {office.email && (
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Mail className="h-4 w-4 text-primary/60 shrink-0" />
                        <a href={`mailto:${office.email}`} className="hover:text-primary transition-colors">
                          {office.email}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>

        <Separator />

        {/* Certifications */}
        <AnimateOnScroll>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center">
            {t("certifications")}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <AnimateOnScroll key={typeof cert === 'string' ? cert : cert.zh} delay={i * 0.05}>
                <div className="flex items-center gap-2 bg-white rounded-full border border-slate-200 px-5 py-2.5 hover:shadow-md hover:border-primary/30 transition-all">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-slate-700">
                    {isZh ? cert.zh : cert.en}
                  </span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-primary via-primary-dark to-blue-700 rounded-2xl p-12 text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            {isZh ? "准备好与新威尔合作了吗？" : isVi ? "Sẵn sàng hợp tác với NEWARE?" : "Ready to Partner with NEWARE?"}
          </h3>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            {isZh 
              ? "联系我们的应用工程师，获取最适合您需求的解决方案"
              : isVi
              ? "Liên hệ kỹ sư ứng dụng của chúng tôi để được tư vấn giải pháp phù hợp nhất"
              : "Contact our application engineers for the solution that best fits your needs"}
          </p>
          <Link href={`/${locale}/contact`}>
            <Button size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold shadow-xl">
              {t("ctaButton")}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
