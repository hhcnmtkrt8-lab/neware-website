"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Globe,
  Battery,
  ChevronDown,
  ArrowRight,
  Zap,
  Globe2,
  FileText,
  Users,
  Download,
  BookOpen,
  TrendingUp,
  Cpu,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandMenu, SearchButton } from "@/components/ui/CommandMenu";

// ─── Desktop top-level navigation ───────────────────────────────────────────
const desktopNavItems = [
  { key: "home", href: "" },
  { key: "products", href: "/products", hasDropdown: true },
  { key: "solutions", href: "/solutions", hasDropdown: true },
  { key: "contentHub", href: "/knowledge-base", hasDropdown: true },
  { key: "aboutUs", href: "/about", hasDropdown: true },
  { key: "contact", href: "/contact" },
];

// ─── Sub-navigation items ────────────────────────────────────────────────────
const productsSubItems = [
  { href: "/products", icon: Cpu, labelKey: "productsCenter", descKey: "productsCenterSubtitle" },
  { href: "/quote-calculator", icon: TrendingUp, labelKey: "productSelector", descKey: "productSelectorSubtitle" },
  { href: "/downloads", icon: Download, labelKey: "downloadCenter", descKey: "downloadCenterSubtitle" },
];

const solutionsSubItems = [
  { href: "/solutions", icon: Zap, labelKey: "solutionOverview", descKey: "solutionOverviewSubtitle" },
  { href: "/case-studies", icon: BookOpen, labelKey: "caseStudies", descKey: "caseStudiesSubtitle" },
  { href: "/compare", icon: Globe2, labelKey: "brandCompare", descKey: "brandCompareSubtitle" },
];

const contentHubSubItems = [
  { href: "/knowledge-base", icon: BookOpen, labelKey: "knowledgeBase", descKey: "knowledgeBaseSubtitle" },
  { href: "/blog", icon: FileText, labelKey: "techBlog", descKey: "techBlogSubtitle" },
  { href: "/whitepapers", icon: FileText, labelKey: "whitepapers", descKey: "whitepapersSubtitle" },
  { href: "/faq", icon: Globe, labelKey: "faq", descKey: "faqSubtitle" },
];

const aboutUsSubItems = [
  { href: "/about", icon: Users, labelKey: "aboutOverview", descKey: "aboutOverviewSubtitle" },
  { href: "/testimonials", icon: Globe2, labelKey: "customerReviews", descKey: "customerReviewsSubtitle" },
  { href: "/contact", icon: Globe, labelKey: "contactUs", descKey: "contactUsSubtitle" },
];

const subNavMap: Record<string, { href: string; icon: React.ComponentType<{ className?: string }>; labelKey: string; descKey: string }[]> = {
  products: productsSubItems,
  solutions: solutionsSubItems,
  contentHub: contentHubSubItems,
  aboutUs: aboutUsSubItems,
};

const viNavLinks = [{ key: "resistors" as const, href: "/resistors" }];

const LOCALES = ["en", "zh", "vi", "ru"] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const tHome = useTranslations("home");
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const isZh = locale === "zh";
  const isVi = locale === "vi";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const dropdownTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const localeOptions = [
    { code: "en", flag: "EN", nativeKey: "localeNativeEnglish" as const },
    { code: "zh", flag: "中", nativeKey: "localeNativeChinese" as const },
    { code: "vi", flag: "VI", nativeKey: "localeNativeVietnamese" as const },
    { code: "ru", flag: "RU", nativeKey: "localeNativeRussian" as const },
  ];

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 12); setShowSticky(window.scrollY > 600); };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (activeDropdown) setActiveDropdown(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  const handleDropdownEnter = (key: string) => {
    // #region agent debug
    fetch('http://127.0.0.1:7656/ingest/024ff6c4-86da-497c-9de0-3eb0d4149646',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8abdd1'},body:JSON.stringify({sessionId:'8abdd1',id:'log_dropdown_enter',timestamp:Date.now(),location:'Navbar.tsx:114',message:'Dropdown enter',data:{key,currentDropdown:typeof activeDropdown},hypothesisId:'H1'})}).catch(()=>{});
    // #endregion
    if (dropdownTimers.current[key]) clearTimeout(dropdownTimers.current[key]);
    setActiveDropdown(key);
  };

  const handleDropdownLeave = (key: string) => {
    // #region agent debug
    fetch('http://127.0.0.1:7656/ingest/024ff6c4-86da-497c-9de0-3eb0d4149646',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8abdd1'},body:JSON.stringify({sessionId:'8abdd1',id:'log_dropdown_leave',timestamp:Date.now(),location:'Navbar.tsx:121',message:'Dropdown leave',data:{key,hypothesisId:'H1'})}).catch(()=>{});
    // #endregion
    dropdownTimers.current[key] = setTimeout(() => {
      setActiveDropdown((prev) => (prev === key ? null : prev));
    }, 120);
  };

  const subNavItems = (key: string) => subNavMap[key] || [];

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.78)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(226,232,240,0.8)" : "1px solid rgba(226,232,240,0.4)",
          boxShadow: scrolled ? "0 4px 24px -4px rgba(148,163,184,0.18)" : "none",
        }}
      >
        <nav className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex items-center h-[60px] gap-6">

            {/* ── Logo ──────────────────────────────────────────────────────── */}
            <Link href={`/${locale}`} className="flex items-center gap-2.5 shrink-0 group mr-2" aria-label="NEWARE — Home">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 60%, #60a5fa 100%)",
                  boxShadow: "0 4px 12px rgba(37,99,235,0.35)",
                }}
              >
                <Battery className="text-white" style={{ height: "1.1rem", width: "1.1rem" }} />
              </div>
              <div className="hidden sm:block leading-none">
                <span className="block text-[15px] font-black tracking-tight text-slate-900 font-heading">NEWARE</span>
                <span className="block text-[9px] font-semibold text-slate-400 tracking-[0.14em] uppercase mt-[1px]">
                  {t("tagline")}
                </span>
              </div>
            </Link>

            {/* ── Desktop Navigation ──────────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-0.5 flex-1" role="menubar">
              {/* Home — simple link */}
              <Link
                href={`/${locale}`}
                className="px-3.5 py-2 rounded-lg text-[13.5px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-150 whitespace-nowrap"
                role="menuitem"
              >
                {t("home")}
              </Link>

              {/* Dropdown nav items */}
              {desktopNavItems.filter(i => i.hasDropdown).map((item) => {
                const hasDropdown = item.hasDropdown;
                const isActive = activeDropdown === item.key;
                return (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => hasDropdown && handleDropdownEnter(item.key)}
                    onMouseLeave={() => hasDropdown && handleDropdownLeave(item.key)}
                  >
                    {/* #region agent debug */}
                    <div data-dropdown-trigger={item.key} data-active={String(isActive)} style={{display:'none'}}></div>
                    {/* #endregion */}
                    <Link
                      href={`/${locale}${item.href}`}
                      className={cn(
                        "flex items-center gap-1 px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-150 whitespace-nowrap",
                        isActive ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      )}
                      role="menuitem"
                      aria-haspopup={hasDropdown ? "true" : undefined}
                      aria-expanded={hasDropdown ? isActive : undefined}
                    >
                      {t(item.key)}
                      {hasDropdown && (
                        <ChevronDown
                          className="h-3.5 w-3.5 transition-transform duration-200"
                          style={{ transform: isActive ? "rotate(180deg)" : "rotate(0deg)" }}
                        />
                      )}
                    </Link>

                    {/* Dropdown Panel */}
                    {hasDropdown && isActive && (
                      <div
                        className="absolute top-full left-0 mt-2 w-72 rounded-2xl py-2 z-50"
                        style={{
                          background: "rgba(255,255,255,0.97)",
                          border: "1px solid rgba(226,232,240,0.8)",
                          boxShadow: "0 16px 48px -8px rgba(148,163,184,0.28), 0 4px 12px -2px rgba(148,163,184,0.12)",
                          backdropFilter: "blur(20px)",
                        }}
                        onMouseEnter={() => handleDropdownEnter(item.key)}
                        onMouseLeave={() => handleDropdownLeave(item.key)}
                      >
                        {/* #region agent debug */}
                        <div id="debug-dropdown-active" data-dropdown={item.key} style={{display:'none'}} data-visible="true"></div>
                        {/* #endregion */}
                        <div className="px-4 py-2 mb-1 border-b border-slate-100">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t(item.key)}</span>
                        </div>
                        {subNavItems(item.key).map((subItem) => {
                          const Icon = subItem.icon;
                          return (
                            <Link
                              key={subItem.href}
                              href={`/${locale}${subItem.href}`}
                              onClick={() => setActiveDropdown(null)}
                              className="group/item flex items-start gap-3 mx-2 px-3 py-2.5 rounded-xl hover:bg-blue-50/70 transition-colors"
                            >
                              <ChevronRight className="h-3.5 w-3.5 text-slate-300 mt-[3px] group-hover/item:text-blue-500 group-hover/item:translate-x-0.5 transition-all shrink-0" />
                              <div>
                                <p className="text-[13px] font-semibold text-slate-700 group-hover/item:text-blue-600 leading-snug">
                                  {t(subItem.labelKey)}
                                </p>
                                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug line-clamp-1">
                                  {t(subItem.descKey)}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Contact — simple link */}
              <Link
                href={`/${locale}/contact`}
                className="px-3.5 py-2 rounded-lg text-[13.5px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-150 whitespace-nowrap"
                role="menuitem"
              >
                {t("contact")}
              </Link>

              {/* VI only: Resistors */}
              {isVi && viNavLinks.map((link) => (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href}`}
                  className="px-3.5 py-2 rounded-lg text-[13.5px] font-medium text-slate-600 hover:text-red-500 hover:bg-red-50/80 transition-all duration-150 whitespace-nowrap"
                  role="menuitem"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>

            {/* ── Right Actions Matrix ───────────────────────────────────────── */}
            <div className="flex items-center gap-x-4 ml-auto">

              {/* Search — icon only, square */}
              <SearchButton
                onClick={() => setSearchOpen(true)}
              />

              {/* Language Dropdown */}
              <div className="relative hidden lg:block" ref={langRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-150"
                  aria-expanded={langOpen}
                  aria-haspopup="listbox"
                  aria-label={t("selectLanguage")}
                >
                  <Globe className="h-[1.05rem] w-[1.05rem] shrink-0" />
                  <span className="text-[12px] font-bold text-slate-600 tracking-wide">{locale.toUpperCase()}</span>
                  <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", langOpen && "rotate-180")} />
                </button>

                {langOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-44 rounded-2xl py-2 z-50"
                    style={{
                      background: "rgba(255,255,255,0.97)",
                      border: "1px solid rgba(226,232,240,0.8)",
                      boxShadow: "0 16px 48px -8px rgba(148,163,184,0.28)",
                      backdropFilter: "blur(20px)",
                    }}
                    role="listbox"
                    aria-label="Language options"
                  >
                    <p className="px-4 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("localeSwitcher")}</p>
                    {localeOptions.map((option) => {
                      const isActive = locale === option.code;
                      return (
                        <Link
                          key={option.code}
                          href={`/${option.code}`}
                          onClick={() => setLangOpen(false)}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-2 text-[13px] transition-colors rounded-lg mx-0",
                            isActive ? "text-blue-600 bg-blue-50 font-semibold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          )}
                          role="option"
                          aria-selected={isActive}
                        >
                          <span className="font-medium">{t(option.nativeKey)}</span>
                          <span className="text-[10px] font-bold tracking-wider text-slate-400">{option.flag}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px h-5 bg-slate-200 mx-1" />

              {/* CTA Button */}
              <Link
                href={`/${locale}/contact`}
                className="hidden lg:inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[13.5px] font-semibold text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                  boxShadow: "0 4px 14px rgba(37,99,235,0.32)",
                }}
              >
                {tHome("cta.button")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* ── Mobile Drawer ──────────────────────────────────────────────────── */}
        {mobileOpen && (
          <div
            className="lg:hidden border-t"
            style={{
              background: "rgba(255,255,255,0.97)",
              borderColor: "rgba(226,232,240,0.6)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="max-w-7xl mx-auto px-5 py-4 space-y-0.5">
              <Link
                href={`/${locale}`}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-[14px] font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                {t("home")}
              </Link>
              {desktopNavItems.filter(i => i.hasDropdown).map((item) => {
                const isExpanded = mobileExpanded === item.key;
                const subItems = subNavItems(item.key);
                return (
                  <div key={item.key}>
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : item.key)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <span>{t(item.key)}</span>
                      <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform duration-200", isExpanded && "rotate-180")} />
                    </button>
                    {isExpanded && (
                      <div className="ml-4 mt-0.5 mb-1 border-l-2 border-blue-100 pl-3 space-y-0.5">
                        {subItems.map((sub) => (
                          <Link
                            key={sub.href}
                            href={`/${locale}${sub.href}`}
                            onClick={() => setMobileOpen(false)}
                            className="block px-2 py-2 text-[13px] text-slate-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50/40"
                          >
                            {t(sub.labelKey)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <Link
                href={`/${locale}/contact`}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-[14px] font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                {t("contact")}
              </Link>

              {/* Language */}
              <div className="pt-3 mt-2 border-t border-slate-100">
                <p className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("localeSwitcher")}</p>
                <div className="flex gap-1.5 px-1">
                  {localeOptions.map((option) => (
                    <Link
                      key={option.code}
                      href={`/${option.code}`}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex-1 rounded-xl py-2 text-[11px] font-bold tracking-wider uppercase border transition-all",
                        locale === option.code
                          ? "border-blue-200 bg-blue-50 text-blue-600"
                          : "border-slate-200 text-slate-500 hover:border-slate-300 bg-white"
                      )}
                    >
                      {option.flag}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-3 pb-1">
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-semibold text-white transition-colors"
                  style={{ background: "linear-gradient(135deg,#2563eb,#3b82f6)", boxShadow: "0 4px 12px rgba(37,99,235,0.28)" }}
                >
                  {tHome("cta.button")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <CommandMenu />

      {/* ── Sticky Bottom Bar ───────────────────────────────────────────────── */}
      {showSticky && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 transition-all duration-500"
          style={{
            transform: "translateY(0)",
            opacity: 1,
            background: "rgba(255,255,255,0.94)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(226,232,240,0.7)",
            boxShadow: "0 -4px 24px rgba(148,163,184,0.12)",
          }}
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 h-14 flex items-center justify-between gap-4">
            <p className="text-[13px] font-medium text-slate-500 hidden sm:block">{t("stickyReady")}</p>
            <div className="flex items-center gap-2.5 ml-auto">
              <Link
                href={`/${locale}/quote-calculator`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm"
              >
                {t("stickyConfigurator")}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[13px] font-semibold text-white transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg,#2563eb,#3b82f6)", boxShadow: "0 4px 12px rgba(37,99,235,0.28)" }}
              >
                {t("stickyQuote")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
