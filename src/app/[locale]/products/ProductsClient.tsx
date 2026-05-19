"use client";

import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Search, ChevronRight, Scale, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import type { Product, ProductRoute } from "@/lib/get-products";
import ProductImagePlaceholder from "@/components/product/ProductImagePlaceholder";

interface ProductsClientProps {
  products: Product[];
  routes: ProductRoute[];
  locale: string;
}

function ProductsClientInner({ products, routes, locale }: ProductsClientProps) {
  const t = useTranslations("products");
  const params = useParams();
  const router = useRouter();
  const isZh = locale === "zh";
  const isVi = locale === "vi";

  const [selectedRoute, setSelectedRoute] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchRoute = selectedRoute === "all" || p.routeId === selectedRoute;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.keywords.toLowerCase().includes(q) ||
        p.keywordsEn.toLowerCase().includes(q) ||
        p.application.toLowerCase().includes(q) ||
        p.applicationEn.toLowerCase().includes(q);
      return matchRoute && matchSearch;
    });
  }, [selectedRoute, search, products]);

  const route = routes.find((r) => r.id === selectedRoute);
  const routeColor = route?.color || "#1e40af";

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else if (newSet.size < 4) {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleCompare = () => {
    if (selectedProducts.size >= 2) {
      const ids = Array.from(selectedProducts).join(",");
      router.push(`/${locale}/products/compare?ids=${ids}`);
    }
  };

  const clearSelection = () => {
    setSelectedProducts(new Set());
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Breadcrumb — refined with padding, border, and gray palette */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 border-b border-gray-100">
        <Breadcrumb
          items={[
            { label: isZh ? "首页" : isVi ? "Trang chủ" : "Home", href: `/${locale}` },
            { label: isZh ? "产品中心" : isVi ? "Sản phẩm" : "Products" }
          ]}
          locale={locale}
        />
      </div>

      {/* Page Header — deep tech halo gradient with industrial grid texture */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-20 sm:py-24">
        {/* Industrial grid texture overlay */}
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        {/* Radial glow orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-indigo-200/80 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar — B2B clean, no rainbow dots */}
          <aside className="lg:w-60 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder={t("searchPlaceholder")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-white"
                />
              </div>

              {/* Filter Categories */}
              <div>
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">
                  {t("filter")}
                </h3>

                {/* All — accent blue left border when active */}
                <button
                  onClick={() => setSelectedRoute("all")}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    selectedRoute === "all"
                      ? "bg-blue-50 text-blue-600 font-semibold border-l-2 border-blue-600 -ml-[2px] pl-[14px]"
                      : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {t("all")}
                </button>

                {/* Route items — clean, no colored dots */}
                <div className="space-y-1 mt-1">
                  {routes.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRoute(r.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                        selectedRoute === r.id
                          ? "bg-blue-50 text-blue-600 font-semibold border-l-2 border-blue-600 -ml-[2px] pl-[14px]"
                          : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      <span className="truncate block">{isZh ? r.name : r.nameEn}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick stats card */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  {isZh ? "产品统计" : isVi ? "Thống kê sản phẩm" : "At a Glance"}
                </p>
                {[
                  { label: isZh ? "产品型号" : isVi ? "Model sản phẩm" : "Models", value: products.length },
                  { label: isZh ? "产品系列" : isVi ? "Dòng sản phẩm" : "Series", value: routes.length },
                  { label: isZh ? "应用领域" : isVi ? "Lĩnh vực" : "Applications", value: "150+" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{stat.label}</span>
                    <span className="text-sm font-bold text-slate-700">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-sm bg-white border border-gray-200 text-gray-600 font-medium">
                  {filteredProducts.length} {t("productCountUnit")}
                </Badge>
                {selectedRoute !== "all" && (
                  <Badge
                    className="text-sm cursor-pointer border-0 font-semibold"
                    style={{ backgroundColor: `${routeColor}15`, color: routeColor }}
                    onClick={() => setSelectedRoute("all")}
                  >
                    {isZh
                      ? routes.find((r) => r.id === selectedRoute)?.name
                      : routes.find((r) => r.id === selectedRoute)?.nameEn}
                    <X className="h-3 w-3 ml-1.5" />
                  </Badge>
                )}
              </div>

              {/* Compare mode indicator */}
              {selectedProducts.size > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm bg-white border-gray-200 text-gray-500">
                    {selectedProducts.size} selected
                  </Badge>
                  <button
                    onClick={clearSelection}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => {
                  const routeInfo = routes.find((r) => r.id === product.routeId);
                  const color = routeInfo?.color || "#1e40af";
                  const isSelected = selectedProducts.has(product.id);

                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="relative"
                    >
                      {/* Compare checkbox — elevated z-index */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleProductSelection(product.id);
                        }}
                        className={`absolute top-4 right-4 z-20 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-150 shadow-sm ${
                          isSelected
                            ? "bg-primary border-primary text-white"
                            : "bg-white/90 backdrop-blur-sm border-gray-300 hover:border-primary hover:shadow-md"
                        }`}
                        aria-label={isSelected ? "Remove from comparison" : "Add to comparison"}
                      >
                        {isSelected && <Check className="h-4 w-4" />}
                      </button>

                      <Link href={`/${locale}/products/${product.id}`}>
                        <div
                          className={`group bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 h-full flex flex-col ${
                            isSelected
                              ? "border-primary shadow-md ring-2 ring-primary/10"
                              : "border-gray-100 hover:border-gray-200"
                          }`}
                        >
                          {/* Color accent stripe */}
                          <div className="h-1 w-full" style={{ backgroundColor: color }} />

                          <div className="p-6 flex-1 flex flex-col space-y-4">
                            {/* Category badge + arrow */}
                            <div className="flex items-center justify-between">
                              <Badge
                                className="text-[11px] font-bold border-0"
                                style={{ backgroundColor: `${color}12`, color }}
                              >
                                {routeInfo
                                  ? isZh ? routeInfo.name : routeInfo.nameEn
                                  : product.routeId}
                              </Badge>
                              <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-150" />
                            </div>

                            {/* Product Image */}
                            <div className="aspect-video bg-slate-50 rounded-xl overflow-hidden">
                              <ProductImagePlaceholder
                                productId={product.id}
                                series={product.routeId as any}
                                size="md"
                                className="w-full h-full"
                              />
                            </div>

                            {/* Title */}
                            <h3 className="text-base font-bold text-slate-800 group-hover:text-primary transition-colors leading-snug">
                              {product.nameEn}
                            </h3>

                            {/* Specs grid */}
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { labelKey: "specVoltage", value: product.voltage },
                                { labelKey: "specCurrent", value: product.current },
                                { labelKey: "specAccuracy", value: product.accuracy },
                                { labelKey: "specChannels", value: product.channels },
                              ].map((spec) => (
                                <div key={spec.labelKey} className="bg-slate-50/80 rounded-lg p-2.5">
                                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5 leading-none">
                                    {t(spec.labelKey)}
                                  </div>
                                  <div className="text-xs font-bold text-slate-600 truncate leading-tight mt-1">
                                    {spec.value}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Application */}
                            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 flex-1">
                              {isZh ? product.application : product.applicationEn}
                            </p>

                            {/* CTA row */}
                            <div className="pt-2 border-t border-gray-100">
                              <span
                                className="text-sm font-semibold inline-flex items-center gap-1.5 transition-all group-hover:gap-2.5"
                                style={{ color }}
                              >
                                {t("viewDetails")}
                                <ArrowRight className="h-4 w-4" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-24">
                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <Search className="h-9 w-9 text-slate-300" />
                </div>
                <p className="text-slate-500 text-base font-medium">{t("noResults")}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Compare Button */}
      <AnimatePresence>
        {selectedProducts.size >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <Button
              onClick={handleCompare}
              size="lg"
              className="shadow-2xl gap-2 px-8 rounded-full"
              style={{ backgroundColor: routeColor }}
            >
              <Scale className="h-5 w-5" />
              {isZh ? "对比所选产品" : "Compare Selected"}
              <Badge variant="secondary" className="ml-1 bg-white/20 text-white border-0 backdrop-blur-sm">
                {selectedProducts.size}
              </Badge>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductsClient({ products, routes, locale }: ProductsClientProps) {
  return (
    <ProductsClientInner products={products} routes={routes} locale={locale} />
  );
}
