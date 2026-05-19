"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import type { vietnamProducts } from "@/data/neware-vietnam";

type Product = (typeof vietnamProducts)[number];

type Props = {
  product: Product;
  route: { id: string; name: string; nameEn: string; color: string; description: string; descriptionEn: string } | undefined;
  relatedProducts: Product[];
  locale: string;
  breadcrumbItems: { name: string; href: string }[];
  siteUrl: string;
};

const CATEGORY_COLORS: Record<string, string> = {
  "resistor-xa": "bg-red-50 text-red-700 border-red-200",
  "resistor-khoi-dong": "bg-blue-50 text-blue-700 border-blue-200",
  "resistor-tu": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "resistor-mang-kim-loai": "bg-purple-50 text-purple-700 border-purple-200",
  "resistor-mang-carbon": "bg-amber-50 text-amber-700 border-amber-200",
};

export default function ResistorDetailClient({ product, route, relatedProducts, locale, breadcrumbItems }: Props) {
  const t = useTranslations();
  const params = useParams();
  const locale_ = params.locale as string;
  const isVi = locale === "vi";
  const colorClass = CATEGORY_COLORS[product.routeId] || "bg-gray-50 text-gray-700 border-gray-200";

  const specs = [
    { label: isVi ? "Mẫu sản phẩm" : "Product Model", value: product.name },
    { label: isVi ? "Điện áp" : "Voltage", value: product.voltage },
    { label: isVi ? "Dòng điện" : "Current", value: product.current },
    { label: isVi ? "Dung sai" : "Tolerance", value: product.accuracy },
    { label: isVi ? "Dòng sản phẩm" : "Product Series", value: isVi ? route?.name : route?.nameEn },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            {breadcrumbItems.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-gray-300">/</span>}
                {i === breadcrumbItems.length - 1 ? (
                  <span className="text-gray-800 font-medium truncate max-w-xs">{item.name}</span>
                ) : (
                  <Link href={item.href} className="hover:text-red-600 whitespace-nowrap">
                    {item.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Product Header */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <div className="md:flex">
            {/* Left: Info */}
            <div className="flex-1 p-8">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full border ${colorClass}`}>
                  {isVi ? route?.name : route?.nameEn}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  {isVi ? "Còn hàng" : "In Stock"}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>
              <p className="text-lg text-gray-500 mb-1">{product.nameEn}</p>

              <p className="text-gray-600 mt-4 leading-relaxed">
                {isVi ? product.description : product.descriptionEn}
              </p>

              <p className="text-sm text-gray-500 mt-3 italic">
                {isVi ? "Ứng dụng:" : "Applications:"} {isVi ? product.application : product.applicationEn}
              </p>

              {/* Specs table */}
              <div className="mt-6 border border-gray-100 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-700 text-sm">
                    {isVi ? "Thông số kỹ thuật" : "Technical Specifications"}
                  </h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {specs.map((spec) => (
                    <div key={spec.label} className="flex items-center px-5 py-3">
                      <span className="text-sm text-gray-500 w-40 shrink-0">{spec.label}</span>
                      <span className="text-sm font-semibold text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 mt-6">
                <Link
                  href={`/${locale_}/contact?product=${encodeURIComponent(product.name)}`}
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-sm"
                >
                  {isVi ? "Yêu cầu báo giá" : "Request Quote"}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale_}/contact`}
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  {isVi ? "Tư vấn kỹ thuật" : "Technical Consultation"}
                </Link>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="md:w-80 bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex flex-col items-center justify-center border-l border-gray-100">
              <div className="w-full max-w-xs">
                {/* Placeholder product image */}
                <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 aspect-square flex items-center justify-center mb-4">
                  <div className="text-center text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                    <p className="text-sm">{product.name}</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                  <h4 className="font-semibold text-gray-800 text-sm mb-3">
                    {isVi ? "Đặc điểm nổi bật" : "Key Features"}
                  </h4>
                  <ul className="space-y-2">
                    {[
                      isVi ? "Chất lượng công nghiệp, tuổi thọ dài" : "Industrial quality, long service life",
                      isVi ? "Tản nhiệt hiệu quả, chịu tải cao" : "Efficient heat dissipation, high load capacity",
                      isVi ? "Lắp đặt dễ dàng, tương thích rộng" : "Easy installation, wide compatibility",
                      isVi ? "Bảo hành 12 tháng chính hãng" : "12-month official warranty",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Long description */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {isVi ? "Mô tả chi tiết" : "Detailed Description"}
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed">
              {isVi ? product.description : product.descriptionEn}
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              {isVi
                ? "Được thiết kế theo tiêu chuẩn công nghiệp IEC, sản phẩm này đảm bảo độ tin cậy cao trong các điều kiện vận hành khắc nghiệt. NEWARE Vietnam cung cấp đầy đủ phụ kiện lắp đặt, tài liệu kỹ thuật và hỗ trợ kỹ thuật sau bán hàng."
                : "Designed according to IEC industrial standards, this product ensures high reliability in harsh operating conditions. NEWARE Vietnam provides complete mounting accessories, technical documentation, and after-sales technical support."}
            </p>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {isVi ? "Sản phẩm liên quan" : "Related Products"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/${locale_}/resistors/${rp.id}`}
                  className="group border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-red-100 transition-all"
                >
                  <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border mb-3 ${CATEGORY_COLORS[rp.routeId] || ""}`}>
                    {isVi ? route?.name : route?.nameEn}
                  </span>
                  <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                    {rp.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {isVi ? rp.description : rp.descriptionEn}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
