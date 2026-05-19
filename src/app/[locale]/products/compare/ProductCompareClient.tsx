"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, Check, X, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/data/neware";
import ProductImagePlaceholder from "@/components/product/ProductImagePlaceholder";

interface ProductCompareClientProps {
  products: Product[];
  locale: string;
}

interface CompareSpec {
  label: string;
  getValue: (product: Product) => string;
  highlight?: boolean;
}

export default function ProductCompareClient({
  products,
  locale,
}: ProductCompareClientProps) {
  const t = useTranslations("products");
  const tCompare = useTranslations("compare");
  const tDetail = useTranslations("productDetail");
  const isZh = locale === "zh";

  const specs: CompareSpec[] = [
    { label: tDetail("voltage"), getValue: (p) => p.voltage, highlight: true },
    { label: tDetail("current"), getValue: (p) => p.current, highlight: true },
    { label: tDetail("accuracy"), getValue: (p) => p.accuracy, highlight: true },
    { label: tDetail("samplingRate"), getValue: (p) => p.samplingRate },
    { label: tDetail("channels"), getValue: (p) => p.channels },
    { label: "Software", getValue: (p) => p.software || "BTS8.0/BTS9.0" },
    { label: "Resolution", getValue: (p) => p.resolution || "-" },
    { label: "Energy Recovery", getValue: (p) => p.energySaving || "-" },
    { label: "Min Pulse Width", getValue: (p) => p.minPulseWidth || "-" },
  ];

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Scale className="h-16 w-16 mx-auto text-slate-300 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {isZh ? "请选择要对比的产品" : "Please select products to compare"}
            </h2>
            <p className="text-slate-500 mb-6">
              {isZh
                ? "在产品列表页面勾选至少2个产品进行对比"
                : "Select at least 2 products on the products page to compare"}
            </p>
            <Link href={`/${locale}/products`}>
              <Button>{isZh ? "浏览产品" : "Browse Products"}</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
              {tCompare("title")}
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              {tCompare("subtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Product Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-primary to-primary-dark" />
              <CardContent className="p-5">
                <div className="aspect-video bg-slate-50 rounded-lg overflow-hidden mb-4">
                  <ProductImagePlaceholder
                    productId={product.id}
                    series={product.routeId as any}
                    size="sm"
                    className="w-full h-full"
                  />
                </div>
                <Badge variant="outline" className="mb-2 text-xs">
                  {product.routeId.toUpperCase()}
                </Badge>
                <h3 className="font-bold text-slate-900 mb-2">{product.nameEn}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                  {isZh ? product.description : product.descriptionEn}
                </p>
                <Link href={`/${locale}/products/${product.id}`} className="block">
                  <Button variant="outline" size="sm" className="w-full gap-1">
                    {t("viewDetails")}
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-200">
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              {isZh ? "规格对比" : "Specifications Comparison"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="text-left px-6 py-4 text-slate-600 font-semibold text-sm whitespace-nowrap">
                      {isZh ? "规格" : "Specification"}
                    </th>
                    {products.map((product) => (
                      <th
                        key={product.id}
                        className="text-center px-6 py-4 font-bold text-slate-900 whitespace-nowrap min-w-[180px]"
                      >
                        {product.nameEn}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {specs.map((spec, index) => (
                    <tr
                      key={spec.label}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-blue-50/30 transition-colors`}
                    >
                      <td className="px-6 py-4 font-medium text-slate-700 whitespace-nowrap">
                        {spec.label}
                      </td>
                      {products.map((product) => {
                        const value = spec.getValue(product);
                        const isBest = checkIfBest(value, spec.label, products, spec.highlight);
                        return (
                          <td
                            key={product.id}
                            className={`px-6 py-4 text-center whitespace-nowrap ${
                              isBest ? "bg-green-50" : ""
                            }`}
                          >
                            <span className={`font-semibold ${isBest ? "text-green-700" : "text-slate-900"}`}>
                              {value}
                              {isBest && <Check className="inline h-4 w-4 ml-1 text-green-600" />}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  {/* Application Row */}
                  <tr className={specs.length % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="px-6 py-4 font-medium text-slate-700 whitespace-nowrap">
                      {tDetail("application")}
                    </td>
                    {products.map((product) => (
                      <td key={product.id} className="px-6 py-4 text-center">
                        <span className="text-sm text-slate-600">
                          {isZh ? product.application : product.applicationEn}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="mt-12 text-center bg-white rounded-2xl border border-slate-200 p-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            {tCompare("ctaTitle")}
          </h2>
          <p className="text-slate-500 mb-6 max-w-xl mx-auto">
            {tCompare("ctaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`}>
              <Button size="lg" className="gap-2">
                {tCompare("getQuote")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/${locale}/products`}>
              <Button variant="outline" size="lg">
                {isZh ? "继续浏览" : "Continue Browsing"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function checkIfBest(
  value: string,
  specLabel: string,
  products: Product[],
  highlight?: boolean
): boolean {
  if (!highlight) return false;

  const numericValues = products
    .map((p) => {
      const match = (p: Product, label: string) => {
        switch (label) {
          case "Voltage":
            return parseFloat(p.voltage.replace(/[^0-9.]/g, "")) || 0;
          case "Current":
            return parseFloat(p.current.replace(/[^0-9.]/g, "")) || 0;
          case "Accuracy":
            return parseFloat(p.accuracy.replace(/[^0-9.]/g, "")) || 0;
          default:
            return 0;
        }
      };
      return match(p, specLabel);
    })
    .filter((v) => v > 0);

  if (numericValues.length < 2) return false;

  const maxValue = Math.max(...numericValues);
  const currentValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;

  if (specLabel === "Accuracy") {
    return currentValue > 0 && currentValue < maxValue * 0.5;
  }

  return currentValue === maxValue && currentValue > 0;
}
