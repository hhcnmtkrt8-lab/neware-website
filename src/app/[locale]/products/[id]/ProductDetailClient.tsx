"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, ArrowLeft, ChevronRight, Download, CheckCircle, Minus, FileText, Scale, Shield, Award, Headphones, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { Product, ProductRoute, productRoutes } from "@/data/neware";
import ProductImagePlaceholder from "@/components/product/ProductImagePlaceholder";

interface Props {
  product: Product;
  route?: ProductRoute;
  relatedProducts: Product[];
  locale: string;
}

interface CompareRow {
  label: string;
  neware: string;
  arbin: string;
  highlight?: boolean;
}

interface TrustBadge {
  icon: React.ReactNode;
  labelKey: string;
}

function TrustBadgesBar({ locale, color }: { locale: string; color: string }) {
  const t = useTranslations("productDetail");
  const isZh = locale === "zh";

  const badges: TrustBadge[] = [
    { icon: <Shield className="h-4 w-4" />, labelKey: "trustBadgeIso" },
    { icon: <Award className="h-4 w-4" />, labelKey: "trustBadgeWarranty" },
    { icon: <RefreshCw className="h-4 w-4" />, labelKey: "trustBadgeSoftware" },
    { icon: <Headphones className="h-4 w-4" />, labelKey: "trustBadgeSupport" },
    { icon: <CheckCircle className="h-4 w-4" />, labelKey: "trustBadgeCe" },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {badges.map((badge, index) => (
            <div
              key={badge.labelKey}
              className="flex items-center gap-2 text-sm text-slate-600"
            >
              <span style={{ color }}>{badge.icon}</span>
              <span className="font-medium whitespace-nowrap">
                {t(badge.labelKey)}
              </span>
              {index < badges.length - 1 && (
                <span className="hidden sm:inline text-slate-300">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompareTable({ rows, locale }: { rows: CompareRow[]; locale: string }) {
  const t = useTranslations("home.arbinCompare");
  const isZh = locale === "zh";
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-900">
            <th className="text-left px-5 py-3 text-slate-400 font-semibold uppercase tracking-wider text-xs">
              {t("metric")}
            </th>
            <th className="text-center px-5 py-3 text-primary font-bold text-sm">
              {t("newareSide")}
            </th>
            <th className="text-center px-5 py-3 text-slate-500 font-medium text-sm">
              {t("arbinSide")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-blue-50 transition-colors`}
            >
              <td className="px-5 py-3.5 font-medium text-slate-700">{row.label}</td>
              <td className="px-5 py-3.5 text-center">
                <span className="inline-flex items-center gap-1.5 font-bold text-primary">
                  <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                  {row.neware}
                </span>
              </td>
              <td className="px-5 py-3.5 text-center">
                <span className="inline-flex items-center gap-1.5 font-medium text-slate-500">
                  <Minus className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  {row.arbin}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EnhancedSpecTable({ specs, locale }: { specs: { label: string; value: string }[]; locale: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50">
            <th className="text-left px-5 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider">
              Specification
            </th>
            <th className="text-right px-5 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {specs.map((spec, index) => (
            <tr
              key={spec.label}
              className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-blue-50/30 transition-colors`}
            >
              <td className="px-5 py-4 font-medium text-slate-600">{spec.label}</td>
              <td className="px-5 py-4 text-right font-bold text-slate-900">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ProductDetailClient({
  product,
  route,
  relatedProducts,
  locale,
}: Props) {
  const t = useTranslations("products");
  const tDetail = useTranslations("productDetail");
  const isZh = locale === "zh";
  const color = route?.color || "#1e40af";

  const specs = [
    { label: tDetail("voltage"), value: product.voltage },
    { label: tDetail("current"), value: product.current },
    { label: tDetail("accuracy"), value: product.accuracy },
    { label: tDetail("samplingRate"), value: product.samplingRate },
    { label: tDetail("channels"), value: product.channels },
    { label: tDetail("application"), value: isZh ? product.application : product.applicationEn },
    ...(product.minPulseWidth
      ? [{ label: "Min Pulse Width", value: product.minPulseWidth }]
      : []),
    ...(product.ranges
      ? [{ label: "Current Ranges", value: product.ranges }]
      : []),
    ...(product.resolution
      ? [{ label: "Resolution", value: product.resolution }]
      : []),
    ...(product.software
      ? [{ label: "Software", value: product.software }]
      : []),
  ];

  const compareRows: CompareRow[] = [
    { label: tDetail("samplingRate"), neware: product.samplingRate !== "-" ? product.samplingRate : "1000Hz", arbin: "Not Published" },
    { label: tDetail("accuracy"), neware: product.accuracy, arbin: "Not Quantified" },
    ...(product.energySaving
      ? [{ label: "Energy Recovery", neware: product.energySaving, arbin: "Not Published" }]
      : []),
    { label: tDetail("channels"), neware: product.channels, arbin: "Limited Range" },
    { label: "Units Deployed", neware: "400,000+ globally", arbin: "Not Disclosed" },
    { label: "Countries Served", neware: "150+ countries", arbin: "Limited" },
    { label: "Software", neware: product.software || "BTS8.0/BTS9.0", arbin: "MITS (limited platform)" },
    { label: "Product Series", neware: "8 Series (500+ models)", arbin: "~5–6 Series" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Trust Badges Bar */}
      <TrustBadgesBar locale={locale} color={color} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb
            items={[
              { label: isZh ? "首页" : locale === "vi" ? "Trang chủ" : "Home", href: `/${locale}` },
              { label: isZh ? "产品中心" : locale === "vi" ? "Sản phẩm" : "Products", href: `/${locale}/products` },
              { label: product.nameEn }
            ]}
            locale={locale}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Product Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="h-1.5 w-24 rounded-full mb-6" style={{ backgroundColor: color }} />
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <Badge
                    className="mb-3 text-xs font-bold"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    {route ? (isZh ? route.name : route.nameEn) : product.routeId}
                  </Badge>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
                    {product.nameEn}
                  </h1>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {isZh ? product.description : product.descriptionEn}
                  </p>
                </div>
              </div>
            </div>

            {/* Product Image with Spec Sheet Download */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" style={{ color }} />
                  {tDetail("specifications")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <ProductImagePlaceholder
                      productId={product.id}
                      series={product.routeId as any}
                      size="lg"
                      className="w-full sm:w-80"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <EnhancedSpecTable specs={specs} locale={locale} />
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      asChild
                    >
                      <Link href={`/${locale}/downloads`}>
                        <Download className="h-4 w-4" />
                        {tDetail("downloadSpec")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs: Compare */}
            <Card>
              <Tabs defaultValue="compare" className="w-full">
                <CardHeader className="pb-0">
                  <TabsList className="grid w-full grid-cols-1">
                    <TabsTrigger value="compare" className="gap-1.5">
                      <Scale className="h-4 w-4" />
                      {isZh ? "与竞争对手对比" : "Compare with Competitors"}
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {isZh
                        ? "以下对比基于行业公开信息。所有竞争对手数据均来自公开可查来源。"
                        : "Comparison based on publicly available industry information. All competitor data sourced from publicly verifiable sources."}
                    </p>
                  </div>
                  <CompareTable rows={compareRows} locale={locale} />
                </CardContent>
              </Tabs>
            </Card>

            {/* Applications */}
            <Card>
              <CardHeader>
                <CardTitle>{tDetail("applications")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  {isZh ? product.application : product.applicationEn}
                </p>
                <Separator className="my-4" />
                <div className="flex flex-wrap gap-2">
                  {(isZh ? product.keywords : product.keywordsEn)
                    .split(/[,，]/)
                    .map((kw) => kw.trim())
                    .filter(Boolean)
                    .map((kw) => (
                      <Badge key={kw} variant="outline" className="text-xs">
                        {kw}
                      </Badge>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Download Resources */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" aria-hidden="true" />
                  <CardTitle>
                    {isZh ? "下载资源" : locale === "vi" ? "Tài nguyên tải xuống" : "Download Resources"}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      title: isZh ? "产品数据表 (PDF)" : locale === "vi" ? "Bảng dữ liệu sản phẩm (PDF)" : "Product Datasheet (PDF)",
                      desc: isZh ? `${product.nameEn} 技术规格表` : `Technical specifications for ${product.nameEn}`,
                      size: "~2.4 MB",
                      icon: "📄",
                    },
                    {
                      title: isZh ? "操作手册 (PDF)" : locale === "vi" ? "Sổ tay vận hành (PDF)" : "Operation Manual (PDF)",
                      desc: isZh ? "BTS 软件操作指南" : locale === "vi" ? "Hướng dẫn phần mềm BTS" : "BTS Software Operation Guide",
                      size: "~5.8 MB",
                      icon: "📘",
                    },
                    {
                      title: isZh ? "选型指南 (PDF)" : locale === "vi" ? "Hướng dẫn chọn model (PDF)" : "Selection Guide (PDF)",
                      desc: isZh ? "根据测试需求选择合适的设备型号" : locale === "vi" ? "Chọn model phù hợp theo nhu cầu thử nghiệm" : "Choose the right model for your testing needs",
                      size: "~3.1 MB",
                      icon: "📊",
                    },
                  ].map((item) => (
                    <a
                      key={item.title}
                      href={`/${locale}/downloads`}
                      className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                    >
                      <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 text-sm group-hover:text-primary transition-colors">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-slate-400">{item.size}</span>
                        <Download className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" aria-hidden="true" />
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <div
                  className="text-center py-4 rounded-xl"
                  style={{ backgroundColor: `${color}08` }}
                >
                  <div className="text-3xl font-extrabold text-slate-900 mb-1">
                    {product.nameEn}
                  </div>
                  <div className="text-sm text-slate-500">
                    {t("highPrecisionTester")}
                  </div>
                </div>

                <div className="space-y-2">
                  {specs.slice(0, 4).map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-slate-500">{spec.label}</span>
                      <span className="font-semibold text-slate-700">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Primary CTA */}
                <Link href={`/${locale}/contact?product=${product.id}`}>
                  <Button className="w-full shadow-lg font-semibold gap-2" style={{ backgroundColor: color }}>
                    {tDetail("requestQuote")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                {/* Secondary CTA */}
                <Button variant="outline" className="w-full gap-2" asChild>
                  <Link href={`/${locale}/downloads`}>
                    <Download className="h-4 w-4" />
                    {tDetail("downloadCatalog")}
                  </Link>
                </Button>

                {/* Compare Link */}
                <div className="text-center pt-2">
                  <Link
                    href={`/${locale}/products/compare`}
                    className="text-sm text-slate-500 hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    <Scale className="h-4 w-4" />
                    {tDetail("compareProducts")}
                  </Link>
                </div>

                <p className="text-xs text-center text-slate-400">
                  {t("salesContactNote")}
                </p>
              </CardContent>
            </Card>

            {/* Competitor migration mini-card */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-green-600" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    {isZh ? "从其他品牌迁移？" : "Switching from Another Brand?"}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {isZh
                    ? "我们提供免费的机型对照指南，助您找到对应的 Neware 替代型号。"
                    : "We provide a free model cross-reference guide to find your Neware replacement."}
                </p>
                <Link href={`/${locale}/contact`}>
                  <Button size="sm" variant="outline" className="w-full text-green-700 border-green-300 hover:bg-green-100">
                    {isZh ? "获取迁移指南 →" : "Get Migration Guide →"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {tDetail("relatedProducts")}
              </h2>
              <Link
                href={`/${locale}/products?route=${product.routeId}`}
                className="text-sm text-primary font-medium hover:underline inline-flex items-center gap-1"
              >
                {isZh ? "查看全部" : "View all"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rp) => {
                const rpRoute = productRoutes.find((r) => r.id === rp.routeId);
                return (
                  <Link key={rp.id} href={`/${locale}/products/${rp.id}`}>
                    <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
                      <div className="h-1.5 w-full" style={{ backgroundColor: rpRoute?.color || color }} />
                      <CardContent className="p-5 space-y-4">
                        <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
                          <ProductImagePlaceholder
                            productId={rp.id}
                            series={rp.routeId as any}
                            size="sm"
                            className="w-full h-full"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors mb-1">
                            {rp.nameEn}
                          </h3>
                          <p className="text-sm text-slate-500 line-clamp-2">
                            {isZh ? rp.application : rp.applicationEn}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 pt-1 border-t border-slate-100">
                          <span className="text-xs text-slate-400">{rp.voltage}</span>
                          <span className="text-xs text-slate-300">|</span>
                          <span className="text-xs text-slate-400">{rp.current}</span>
                          <span className="text-xs text-slate-300">|</span>
                          <span className="text-xs text-slate-400">{rp.accuracy}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary inline-flex items-center gap-1">
                          {t("viewDetails")}
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
