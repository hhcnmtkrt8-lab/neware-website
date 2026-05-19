# NEWARE Products Hub — Visual & UI/UX Audit Blueprint
## Prepared for: Bolt.new | External UI/UX Design Partner
## Date: 2026-05-19 | Author: Internal Frontend Architecture Team

---

## TABLE OF CONTENTS

1. System Architecture Context — Engineering Constraints Disclaimer
2. Hero Section — Current Structural Skeleton
3. Products Hub Page — Current Structural Skeleton
4. AI Designer Prompt — Visual Aesthetic Direction Guide

---

# 1. SYSTEM ARCHITECTURE CONTEXT
## Engineering Constraints Disclaimer for External Design Partner

### Technology Stack (Immutable — Do Not Modify)

This project is a production-grade Next.js 14+ application with the following non-negotiable constraints:

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 14+ (App Router) | Server Components + Client Components |
| Language | TypeScript (strict) | No type regressions allowed |
| Styling | Tailwind CSS v3 | Only className modifications permitted |
| i18n | `next-intl` | ALL user-facing text must use `t("key.path")` hooks |
| Animation | `framer-motion` | Already integrated; use only for motion |
| Component Lib | `@/components/ui/*` | shadcn/ui primitives — do not replace |

### i18n Key Preservation Rule (CRITICAL)

**You are FORBIDDEN from modifying or deleting any `t("...")` translation key references.**

All visible text is fully internationalized. You may ONLY change `className` attributes (and inline style values for color/opacity/background). Every text label must remain as-is.

Allowed operations:
- `className="..."` → modify only
- `style={{ ... }}` → modify only for visual effect
- `aria-label="..."` → modify only for accessibility improvement

Forbidden operations:
- Deleting or replacing `{t("...")}` nodes
- Changing `href={...}` destinations
- Removing `<Link>` wrappers
- Deleting `aria-*` or `role` attributes
- Modifying DOM nesting structure (adding/removing wrappers)

### File Ownership

| File | Purpose | Partner Access |
|---|---|---|
| `src/app/[locale]/products/ProductsClient.tsx` | Products page client shell | READ + className only |
| `src/app/[locale]/products/page.tsx` | Server page (metadata only) | READ only |
| `src/components/home/HeroSection.tsx` | Homepage hero | READ + className only |
| `src/components/home/HeroComparison.tsx` | Hero dashboard card | READ + className only |

### Translation Keys You Must Not Touch

**Hero section keys** (used in `HeroSection.tsx`):
- `t("home.hero.badge")` — "World-Leading Battery Testing Equipment Manufacturer"
- `t("home.hero.title")` — "Precision Battery"
- `t("home.hero.titleLine2")` — "Testing Equipment"
- `t("home.hero.subtitle")` — "Since 1998 — Trusted by 32,000+ clients..."
- `t("home.hero.cta")` — "Get Free Migration Assessment"
- `t("home.hero.ctaAlt")` — "Request a Quote"
- `t("home.hero.trustIso9001")`, `t("home.hero.trustCountries")`, `t("home.hero.trustHighTech")`, `t("home.hero.trustExperience")`

**Products hub keys** (used in `ProductsClient.tsx`):
- `t("products.title")` — "Products"
- `t("products.subtitle")` — "500+ models covering all testing needs..."
- `t("products.searchPlaceholder")` — "Search products..."
- `t("products.filter")` — "Filter by Series"
- `t("products.all")` — "All"
- `t("products.productCountUnit")` — "products"
- `t("products.specVoltage")` — "Voltage"
- `t("products.specCurrent")` — "Current"
- `t("products.specAccuracy")` — "Accuracy"
- `t("products.specChannels")` — "Channels"
- `t("products.viewDetails")` — "View Details"
- `t("products.noResults")` — "No matching products found"

---

# 2. CURRENT HERO SECTION STRUCTURAL SKELETON

**File:** `src/components/home/HeroSection.tsx`
**Last verified:** 2026-05-19

```tsx
// CURRENT HERO SECTION STRUCTURAL SKELETON
// =========================================
// NOTE: All text uses t("home.hero.*") i18n keys.
// You may ONLY modify className and inline style values.

export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative overflow-hidden bg-slate-50">

      {/* Layer 1: Aero-light radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 72% 20%, rgba(59,130,246,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 25% 80%, rgba(14,165,233,0.06) 0%, transparent 55%), radial-gradient(ellipse 100% 80% at 50% 100%, rgba(99,102,241,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Layer 2: Precision micro-grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.45]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Layer 3: Bottom ambient glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(248,250,252,1) 0%, rgba(248,250,252,0) 100%)" }}
        aria-hidden="true"
      />

      {/* Layer 4: Top-edge subtle gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(241,245,249,1) 0%, rgba(241,245,249,0) 100%)" }}
        aria-hidden="true"
      />

      {/* Main content container */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* LEFT: Text content */}
          <div className="space-y-7">

            {/* Animated badge pill */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-200/80 bg-blue-50/70 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-blue-700 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                {t("badge")}
              </div>
            </div>

            {/* Main headline */}
            <div className="space-y-1 animate-fade-in-up-1">
              <h1 className="text-5xl sm:text-5xl lg:text-6xl xl:text-[3.75rem] font-black leading-[1.03] tracking-tight text-slate-900">
                {t("title")}
              </h1>
              <p className="text-5xl sm:text-5xl lg:text-6xl xl:text-[3.75rem] font-black leading-[1.03] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700">
                {t("titleLine2")}
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl animate-fade-in-up-2">
              {t("subtitle")}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up-3">
              <Link href={`/${locale}/products`}>
                <Button
                  size="xl"
                  className="w-full sm:w-auto font-semibold text-base px-8 py-6 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                >
                  {t("cta")}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <Button
                  size="xl"
                  variant="outline"
                  className="w-full sm:w-auto font-semibold text-base px-8 py-6 border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50/70 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {t("ctaAlt")}
                </Button>
              </Link>
            </div>

            {/* Trust indicator pills */}
            <div className="flex flex-wrap items-center gap-3 animate-fade-in-up-4">
              <TrustBadge icon={Shield}  label="ISO9001"        color="#22c55e" />
              <TrustBadge icon={Globe}   label="150+ Countries" color="#3b82f6" />
              <TrustBadge icon={Clock}   label="26 Years"       color="#f59e0b" />
              <TrustBadge icon={Zap}     label="0.02% FS"      color="#8b5cf6" />
            </div>

            {/* Legacy trust row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-0.5 animate-fade-in-up-5">
              <TrustRow icon={Shield} label={t("trustIso9001")}    color="#22c55e" />
              <TrustRow icon={Globe}  label={t("trustCountries")}  color="#3b82f6" />
              <TrustRow icon={Award}  label={t("trustHighTech")}   color="#8b5cf6" />
              <TrustRow icon={Zap}    label={t("trustExperience")} color="#f59e0b" />
            </div>
          </div>

          {/* RIGHT: Premium dashboard card (desktop) */}
          <div className="relative hidden lg:block animate-fade-in-up-2">
            <HeroComparison locale={locale} />
          </div>

          {/* Mobile fallback visual */}
          <div className="relative lg:hidden animate-fade-in-up-2">
            <HeroComparison locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBadge({ icon: Icon, label, color }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/70 backdrop-blur-sm px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
      <Icon className="h-3.5 w-3.5" style={{ color }} />
      <span>{label}</span>
    </div>
  );
}

function TrustRow({ icon: Icon, label, color }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-slate-400">
      <Icon className="h-3.5 w-3.5" style={{ color, opacity: 0.7 }} />
      <span>{label}</span>
    </div>
  );
}
```

### HeroComparison Dashboard Card (Sourced from `src/components/home/HeroComparison.tsx`)

```tsx
// HeroComparison — embedded inside HeroSection's right column
// DO NOT modify DOM nesting; className modifications only

export function HeroComparison({ locale }) {
  const tComp = useTranslations("home.competitorCompare");
  const [showCompetitorCompare, setShowCompetitorCompare] = useState(false);

  return (
    <div className="relative w-full">

      {/* Ambient glow behind card */}
      <div className="absolute inset-0 -m-3 rounded-3xl bg-gradient-to-br from-blue-100/60 via-indigo-50/40 to-cyan-50/30 blur-3xl" />

      {/* Card body */}
      <div className="relative rounded-3xl border border-white/60 bg-white/70 backdrop-blur-2xl shadow-xl shadow-slate-200/60 p-8 overflow-hidden">

        {/* Top bar — macOS traffic lights + BTS-9000 label + toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            </div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
              BTS-9000 · Live Monitor
            </span>
          </div>
          <button
            onClick={() => setShowCompetitorCompare(!showCompetitorCompare)}
            className="text-[10px] px-3 py-1 rounded-full border border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-600 transition-all duration-200 font-medium"
          >
            {showCompetitorCompare ? "← Neware" : "vs Others →"}
          </button>
        </div>

        {/* Battery visual — SVG battery shell + channel bars */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-full max-w-[13rem] h-16">
            {/* SVG: outer shell, terminal cap, grid lines, gradient fill */}
            {/* Channel bars: 8CH animated height */}
            {/* Center metric overlay: "75%" or "?" */}
          </div>
        </div>

        {/* Spec rows — 6 comparison rows */}
        <div className="space-y-0 mb-6">
          {COMPARISON_KEYS.map((item) => (
            <div key={item.labelKey} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
              <span className="text-xs text-slate-400">{LABEL_DISPLAY[item.labelKey]}</span>
              <span className="text-xs font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                {tComp(item.newareKey)}
              </span>
            </div>
          ))}
        </div>

        {/* Spec pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <SpecPill label="8 CH" />
          <SpecPill label="3000A"  color="#3b82f6" />
          <SpecPill label="1000V"  color="#6366f1" />
          <SpecPill label="1000Hz" color="#06b6d4" />
        </div>
      </div>

      {/* Floating badges — top-left: Sampling 1000Hz; top-right: Accuracy 0.02% */}
      <div className="absolute -top-3 -left-3 bg-white/80 backdrop-blur-xl border border-white/70 shadow-lg shadow-blue-100/50 rounded-xl px-4 py-3">
        <div className="text-[9px] text-slate-400 uppercase tracking-widest mb-0.5">Sampling</div>
        <div className="text-2xl font-black leading-none">1000<span className="text-sm ml-0.5 opacity-60">Hz</span></div>
      </div>

      <div className="absolute -top-3 -right-3 bg-white/80 backdrop-blur-xl border border-white/70 shadow-lg shadow-indigo-100/50 rounded-xl px-4 py-3">
        <div className="text-[9px] text-slate-400 uppercase tracking-widest mb-0.5">Accuracy</div>
        <div className="text-2xl font-black leading-none">0.02<span className="text-sm ml-0.5 opacity-60">%</span></div>
      </div>

      {/* Migration CTA strip */}
      <div className="mt-5 bg-white/60 backdrop-blur-md border border-slate-200/60 rounded-2xl px-5 py-3.5 flex items-center justify-between gap-4 shadow-sm">
        <p className="text-xs text-slate-400">{tComp("switchingFromCompetitor")}</p>
        <a href={`/${locale}/contact`} className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap">
          {tComp("migrationCta")} →
        </a>
      </div>
    </div>
  );
}
```

---

# 3. CURRENT PRODUCTS HUB PAGE — STRUCTURAL SKELETON

**File:** `src/app/[locale]/products/ProductsClient.tsx`
**Server wrapper:** `src/app/[locale]/products/page.tsx` (metadata only — do not touch)
**Last verified:** 2026-05-19

```tsx
// CURRENT PRODUCTS PAGE STRUCTURAL SKELETON
// =========================================
// NOTE: All text uses t("products.*") i18n keys.
// You may ONLY modify className and inline style values.
// The server-side page.tsx passes {products, routes, locale} as props.

function ProductsClientInner({ products, routes, locale }) {
  const t = useTranslations("products");
  const [selectedRoute, setSelectedRoute] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchRoute = selectedRoute === "all" || p.routeId === selectedRoute;
      const q = search.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q) || ...;
      return matchRoute && matchSearch;
    });
  }, [selectedRoute, search, products]);

  const route = routes.find((r) => r.id === selectedRoute);
  const routeColor = route?.color || "#1e40af";

  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      {/* BREADCRUMB SECTION */}
      {/* ALREADY UPGRADED: py-5 + border-b border-gray-100 */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 border-b border-gray-100">
        <Breadcrumb
          items={[
            { label: isZh ? "首页" : isVi ? "Trang chủ" : "Home", href: `/${locale}` },
            { label: isZh ? "产品中心" : isVi ? "Sản phẩm" : "Products" }
          ]}
          locale={locale}
        />
      </div>

      {/* PAGE HEADER BANNER */}
      {/* ALREADY UPGRADED: from-slate-900 via-indigo-950 to-slate-900 gradient + grid texture + glow orbs */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-20 sm:py-24">
        {/* Industrial grid texture overlay */}
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'url("data:image/svg+xml,...")' }} />
        {/* Radial glow orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-indigo-200/80 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT SIDEBAR — FILTER BY SERIES */}
          {/* ALREADY UPGRADED: no rainbow dots; blue left-border active */}
          <aside className="lg:w-60 shrink-0">
            <div className="sticky top-24 space-y-6">

              {/* Search input */}
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

                {/* All — active state: blue left-border + bg-blue-50 */}
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

                {/* Route items — clean, NO colored dots */}
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

          {/* RIGHT: PRODUCT GRID */}
          <div className="flex-1">

            {/* Toolbar — count badge + active filter badge */}
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
                    {routes.find((r) => r.id === selectedRoute)?.nameEn}
                    <X className="h-3 w-3 ml-1.5" />
                  </Badge>
                )}
              </div>

              {/* Compare mode */}
              {selectedProducts.size > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm bg-white border-gray-200 text-gray-500">
                    {selectedProducts.size} selected
                  </Badge>
                  <button onClick={clearSelection} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* PRODUCT CARD — repeats for each filtered product */}
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
                      {/* Compare checkbox — z-20, backdrop-blur */}
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleProductSelection(product.id); }}
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
                                {routeInfo ? isZh ? routeInfo.name : routeInfo.nameEn : product.routeId}
                              </Badge>
                              <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-150" />
                            </div>

                            {/* Product image placeholder */}
                            <div className="aspect-video bg-slate-50 rounded-xl overflow-hidden">
                              <ProductImagePlaceholder
                                productId={product.id}
                                series={product.routeId}
                                size="md"
                                className="w-full h-full"
                              />
                            </div>

                            {/* Product title */}
                            <h3 className="text-base font-bold text-slate-800 group-hover:text-primary transition-colors leading-snug">
                              {product.nameEn}
                            </h3>

                            {/* Specs grid — 2x2 */}
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { labelKey: "specVoltage",  value: product.voltage },
                                { labelKey: "specCurrent",  value: product.current },
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

                            {/* Application description */}
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

            {/* Empty state */}
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

      {/* FLOATING COMPARE BUTTON */}
      {/* ALREADY UPGRADED: rounded-full + spring animation + z-50 */}
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
```

---

# 4. AI DESIGNER PROMPT — VISUAL AESTHETIC DIRECTION GUIDE

---

## MASTER PROMPT FOR BOLT.new

```
You are a world-class B2B industrial UX/UI designer specializing in precision instrumentation companies (Keysight PathWave, Tesla Energy, Agilent instrument dashboards, Rohde & Schwarz). You are rewriting Tailwind CSS className values of a production Next.js 14 application for NEWARE — a precision battery testing equipment manufacturer founded in 1998, serving 32,000+ clients in 150+ countries.

CRITICAL CONSTRAINTS:
- You may ONLY modify className attributes (and inline style values for color/background/opacity)
- You MUST preserve ALL {t("...")} translation key references exactly as-is
- You MUST preserve DOM nesting structure — do not add or remove wrappers
- You MUST preserve aria-*, role, href, and data-* attributes
- The existing framer-motion animations are already working — do not touch transition/animate props
- The current deep slate-indigo hero gradient and sidebar blue left-border style are already in place — build on top of them

---

### SECTION A — HOMEPAGE HERO (HeroSection.tsx)

Reference brands: Keysight PathWave, Tesla Energy dashboard, Agilent instrument portals.

**Pain points to eliminate:**
1. `bg-slate-50` hero background = dead white — needs cold luminous sci-fi atmosphere
2. `TrustBadge` pills look like retro badges from 2015 — should feel like live instrument status indicators
3. `TrustRow` text is nearly invisible — increase hierarchy contrast
4. CTA buttons use `px-8 py-6` — feels oversized and blunt
5. `HeroComparison` floating badges use `bg-white/80` — too thin, needs more glass depth
6. macOS traffic lights feel playful — reduce opacity for a more clinical instrument look

**Design directives:**
- Replace `bg-slate-50` with a cool-tinted near-white: `bg-slate-50/80` + an indigo-tinted radial gradient overlay via inline `style={{ background: "..." }}`
- Micro-grid layer: increase cell size to `64px`, reduce opacity to `0.20`, tint lines with `rgba(99,102,241,0.35)` instead of slate gray
- Add a subtle horizontal luminous line: a `1px` div with `bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent` positioned at the vertical midpoint of the hero
- Convert `TrustBadge` pills to "live instrument status indicator" style: replace rounded-full pills with `inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/[0.04] border border-slate-200/60 backdrop-blur-sm` with `font-mono` aesthetic; remove the animated pulse dot
- Increase `TrustRow` from `text-xs text-slate-400` to `text-sm text-slate-500`
- Refine CTA button padding: `px-7 py-5` (more proportional, more premium)
- Refine `HeroComparison` card: increase `bg-white/70` to `bg-white/85`; replace `shadow-xl shadow-slate-200/60` with `shadow-2xl shadow-slate-900/10`; increase floating badge to `backdrop-blur-xl`; replace traffic light dots with solid `bg-slate-300` (no opacity variants)
- Add `focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2` to all interactive buttons

---

### SECTION B — PRODUCTS HUB PAGE (ProductsClient.tsx)

Reference brands: Keysight product catalog configurator, Tektronix product selector, Rohde & Schwarz product finder, Siemens Xcelerator.

**Pain points to eliminate:**
1. Banner gradient feels flat — needs diagonal depth
2. Grid texture `opacity-[0.07]` too subtle — needs more presence at `0.10` with `mix-blend-mode: overlay`
3. Product card hover `hover:-translate-y-0.5` feels mechanical — needs spring-like lift
4. Product image area is a dead placeholder — needs an SVG equipment silhouette
5. Spec labels use generic text — should use monospace font for oscilloscope-label aesthetic
6. Floating compare button uses aggressive `shadow-2xl` — soften to `shadow-xl`
7. Sidebar stats card looks decorative — give it real data dashboard depth

**Design directives:**
- Banner: add a diagonal overlay `bg-gradient-to-br from-indigo-900/40 via-transparent to-cyan-900/20` on top of the existing gradient for depth
- Banner grid: `opacity-[0.10]` + `mix-blend-mode: overlay` to blend with dark background
- Banner h1: add `font-black tracking-tighter`; subtitle: `text-indigo-300/70` for a cooler ethereal feel
- Sidebar filter active state: add `bg-blue-50/70` to make it feel "pressed" like a real filter UI
- Sidebar stats card: replace flat list with `bg-gradient-to-b from-white to-slate-50 border border-gray-200/80`; make numbers use `font-mono text-lg font-black text-slate-800`
- Product card hover: `hover:-translate-y-1 hover:shadow-xl` (more spring-like lift)
- Product card image: add a centered SVG battery/cycler silhouette in `text-slate-200/60` as a background element, with `mix-blend-mode: multiply`
- Product card specs: replace `bg-slate-50/80` with `bg-slate-900/[0.03]` for cooler tone; make labels `font-mono text-[9px] text-gray-400` for oscilloscope-label feel
- Product card CTA: add `group-hover:translate-x-1` with `transition-all duration-200`; ensure `border-t border-slate-100` separator with `pt-3`
- Product card overall: replace `border-gray-100` with `border-gray-200/70`; add `shadow-slate-900/5` to `hover:shadow-xl`
- Floating compare button: `shadow-xl` only (no shadow-2xl); add `backdrop-blur-lg` to the badge inside

---

### SECTION C — CROSS-CUTTING GLOBAL IMPROVEMENTS

- **Typography**: Secondary text: upgrade `text-slate-500` to `text-slate-400/80`
- **Spacing rhythm**: Increase all `gap-4` to `gap-5` and `gap-6` to `gap-8` in product grids — B2B catalogs need breathing room
- **Color temperature**: Replace warm `bg-slate-50` with `bg-slate-50/80` or `bg-slate-50/90` to create depth layering
- **Focus states**: Every interactive button needs `focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`
- **Backdrop blur**: Increase from `backdrop-blur-sm` to `backdrop-blur-md` on all floating elements
- **Font weight hierarchy**: Secondary headings: upgrade `font-semibold` to `font-bold` for B2B authority
- **Border definition**: Replace `border-slate-200` with `border-slate-200/70` for more refined definition

---

### OUTPUT FORMAT

Return the complete modified files with ONLY the className values changed. Preserve every other character exactly. Do not add comments or explain the changes — just return the full file content.

Files to return:
1. `src/components/home/HeroSection.tsx`
2. `src/components/home/HeroComparison.tsx`
3. `src/app/[locale]/products/ProductsClient.tsx`
```
