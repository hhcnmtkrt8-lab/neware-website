"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import type { ProductRoute } from "@/data/neware";
import type { vietnamProducts } from "@/data/neware-vietnam";

type Product = (typeof vietnamProducts)[number];

type Props = {
  routes: ProductRoute[];
  products: Product[];
  locale: string;
};

const CATEGORY_COLORS: Record<string, string> = {
  "resistor-xa": "bg-red-50 text-red-700 border-red-200",
  "resistor-khoi-dong": "bg-blue-50 text-blue-700 border-blue-200",
  "resistor-tu": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "resistor-mang-kim-loai": "bg-purple-50 text-purple-700 border-purple-200",
  "resistor-mang-carbon": "bg-amber-50 text-amber-700 border-amber-200",
};

export function ResistorsClient({ routes, products, locale }: Props) {
  const t = useTranslations();
  const params = useParams();
  const locale_ = params.locale as string;
  const [activeRoute, setActiveRoute] = useState<string>("all");
  const [search, setSearch] = useState("");

  const isVi = locale === "vi";

  const filteredProducts = products.filter((p) => {
    const matchRoute = activeRoute === "all" || p.routeId === activeRoute;
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      p.keywords.toLowerCase().includes(search.toLowerCase());
    return matchRoute && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            {isVi ? "Phân phối chính hãng tại Việt Nam" : "Official distributor in Vietnam"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isVi ? "Điện trở công nghiệp" : "Industrial Resistors"}
          </h1>
          <p className="text-lg text-red-100 max-w-2xl mx-auto mb-8">
            {isVi
              ? "Điện trở xả, khởi động, dạng tủ — cho cầu trục, băng tải, thang máy, ngành thép, xi măng. NEWARE Vietnam phân phối chính hãng với bảo hành 12 tháng."
              : "Braking, starting, and cabinet resistors — for cranes, conveyors, elevators, steel, cement industries. NEWARE Vietnam official distributor with 12-month warranty."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            {[
              isVi ? "Điện trở xả RXG20" : "RXG20 Braking Resistors",
              isVi ? "Điện trở khởi động BK" : "BK Motor Starting Resistors",
              isVi ? "Điện trở dạng tủ ZX" : "ZX Cabinet Resistors",
              isVi ? "Điện trở màng kim loại" : "Metal Film Resistors",
            ].map((tag) => (
              <span key={tag} className="bg-white/20 rounded-full px-4 py-1.5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href={`/${locale_}`} className="hover:text-red-600">
            {isVi ? "Trang chủ" : "Home"}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">
            {isVi ? "Điện trở công nghiệp" : "Industrial Resistors"}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder={isVi ? "Tìm kiếm sản phẩm..." : "Search products..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">
                {isVi ? "Danh mục sản phẩm" : "Product Categories"}
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveRoute("all")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeRoute === "all"
                      ? "bg-red-50 text-red-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {isVi ? "Tất cả sản phẩm" : "All Products"}
                  <span className="ml-1 text-gray-400 text-xs">({products.length})</span>
                </button>
                {routes.map((route) => {
                  const count = products.filter((p) => p.routeId === route.id).length;
                  return (
                    <button
                      key={route.id}
                      onClick={() => setActiveRoute(route.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeRoute === route.id
                          ? "bg-red-50 text-red-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {isVi ? route.name : route.nameEn}
                      <span className="ml-1 text-gray-400 text-xs">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-6 bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-5 text-white">
              <h3 className="font-semibold mb-2">
                {isVi ? "Cần tư vấn kỹ thuật?" : "Need Technical Advice?"}
              </h3>
              <p className="text-red-100 text-sm mb-4">
                {isVi
                  ? "Đội ngũ kỹ sư NEWARE Vietnam sẵn sàng hỗ trợ chọn điện trở phù hợp cho ứng dụng của bạn."
                  : "NEWARE Vietnam engineering team ready to help you select the right resistor for your application."}
              </p>
              <Link
                href={`/${locale_}/contact`}
                className="block w-full bg-white text-red-700 text-center rounded-lg py-2.5 text-sm font-semibold hover:bg-red-50 transition-colors"
              >
                {isVi ? "Liên hệ ngay" : "Contact Now"}
              </Link>
              <div className="mt-3 text-center text-red-100 text-sm">
                +84-28-3823-6888
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                {isVi ? "Hiển thị" : "Showing"} <strong>{filteredProducts.length}</strong>{" "}
                {isVi ? "sản phẩm" : "products"}
              </p>
            </div>

            {/* Products grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {isVi ? "Không tìm thấy sản phẩm" : "No products found"}
                </h3>
                <p className="text-gray-500 text-sm">
                  {isVi
                    ? "Thử thay đổi từ khóa tìm kiếm hoặc danh mục"
                    : "Try changing your search term or category"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product) => {
                  const route = routes.find((r) => r.id === product.routeId);
                  const colorClass = CATEGORY_COLORS[product.routeId] || "bg-gray-50 text-gray-700 border-gray-200";

                  return (
                    <Link
                      key={product.id}
                      href={`/${locale_}/resistors/${product.id}`}
                      className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-red-100 transition-all duration-300"
                    >
                      {/* Header */}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <span
                            className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${colorClass}`}
                          >
                            {isVi ? route?.name : route?.nameEn}
                          </span>
                          <span className="text-xs text-gray-400">
                            {isVi ? "Xem chi tiết →" : "View details →"}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-red-700 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {isVi ? product.description : product.descriptionEn}
                        </p>
                      </div>

                      {/* Specs */}
                      <div className="px-5 pb-5">
                        <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-lg p-3">
                          <div>
                            <p className="text-xs text-gray-400 mb-0.5">
                              {isVi ? "Điện áp" : "Voltage"}
                            </p>
                            <p className="text-sm font-semibold text-gray-800">{product.voltage}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-0.5">
                              {isVi ? "Dòng điện" : "Current"}
                            </p>
                            <p className="text-sm font-semibold text-gray-800">{product.current}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
