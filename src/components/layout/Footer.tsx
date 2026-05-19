"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Battery, Mail, Phone, MapPin, Globe, ArrowRight, Shield, CreditCard, Lock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { company } from "@/data/neware";

// Custom SVG icons for social platforms
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export function Footer() {
  const t = useTranslations("footer");
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const isZh = locale === "zh";
  const isVi = locale === "vi";
  // #region agent debug
  fetch('http://127.0.0.1:7656/ingest/024ff6c4-86da-497c-9de0-3eb0d4149646',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f9984f'},body:JSON.stringify({sessionId:'f9984f',location:'Footer.tsx:35',message:'footer keys',data:{locale,about:t.raw('about'),productsTitle:t.raw('products.title'),supportTitle:t.raw('support.title'),socialLinkedIn:t.raw('social.linkedIn'),isoCertified:t.raw('isoCertified')},timestamp:Date.now(),hypothesisId:'FOOTER-ALL-MISSING'})}).catch(()=>{});
  // #endregion

  const year = new Date().getFullYear();

  // Social links with real URLs
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/neware-battery",
      icon: LinkedInIcon,
      label: t("social.linkedIn"),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@newarebattery",
      icon: YouTubeIcon,
      label: t("social.youtube"),
    },
    {
      name: "Twitter",
      href: "https://twitter.com/newarebattery",
      icon: TwitterIcon,
      label: t("social.twitter"),
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/newarebattery",
      icon: FacebookIcon,
      label: t("social.facebook"),
    },
  ];

  // Product links — footer.products.* nested keys (now consistent across zh/en/vi)
  const productLinks = [
    { label: t("products.ct4000"), href: "/products?route=ct4000" },
    { label: t("products.ct9000"), href: "/products?route=ct9000" },
    { label: t("products.ce6000"), href: "/products?route=ce6000" },
    { label: t("products.ct8000"), href: "/products?route=ct8000" },
    { label: t("products.ct3000"), href: "/products?route=ct3000" },
    { label: t("products.chamber"), href: "/products?route=chamber" },
    { label: t("products.formation"), href: "/products?route=formation" },
    { label: t("products.lims"), href: "/products?route=lims" },
  ];

  // Support links — use nested footer.support.* keys
  const supportLinks = [
    { label: t("support.downloads"), href: "/downloads" },
    { label: t("support.knowledge"), href: "/knowledge-base" },
    { label: t("support.faq"), href: "/faq" },
    { label: t("support.compare"), href: "/compare" },
    { label: t("support.blog"), href: "/blog" },
    { label: t("support.caseStudies"), href: "/case-studies" },
    { label: t("whitepapers"), href: "/whitepapers" },
    { label: t("calculator"), href: "/quote-calculator" },
  ];

  // Company links — use nested footer.company.* keys
  const companyLinks = [
    { label: t("company.about"), href: "/about" },
    { label: isZh ? "客户评价" : isVi ? "Đánh giá" : "Testimonials", href: "/testimonials" },
    { label: t("company.contact"), href: "/contact" },
    { label: t("company.privacy"), href: "/privacy" },
    { label: t("company.terms"), href: "/terms" },
  ];

  // Global offices for bottom bar
  const globalOffices = [
    { city: isZh ? "深圳" : "Shenzhen", country: "🇨🇳", address: isZh ? "广东深圳" : "Guangdong, China" },
    { city: isZh ? "弗里蒙特" : "Fremont", country: "🇺🇸", address: isZh ? "美国加州" : "California, USA" },
    { city: isZh ? "香港" : "Hong Kong", country: "🇭🇰", address: isZh ? "香港九龙" : "Kowloon, HK" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section: Tagline + Social */}
        <div className="mb-12 pb-10 border-b border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
                <Battery className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white tracking-tight">NEWARE</span>
                <p className="text-sm text-slate-400 mt-0.5">
                  {isZh ? "精密电池测试设备制造专家" : isVi ? "Thiết bị kiểm tra pin chính xác cao" : "Precision Battery Testing Equipment"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-primary hover:text-white transition-all duration-200"
                  aria-label={social.label}
                  title={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {t("about")}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t("description")}
            </p>
            <div className="pt-2">
              <p className="text-xs text-slate-500">
                {t("isoCertified")}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {t("yearsExperience")}
              </p>
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              {t("products.title")}
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-slate-400 hover:text-white hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              {t("support.title")}
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-slate-400 hover:text-white hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              {t("company.title")}
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-slate-400 hover:text-white hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-14 pt-10 border-t border-slate-800">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              {t("newsletter.title")}
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              {t("newsletter.subtitle")}
            </p>
            <NewsletterForm locale={locale} />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Global Offices */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {globalOffices.map((office, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-lg">{office.country}</span>
                <div>
                  <p className="text-sm font-medium text-white">{office.city}</p>
                  <p className="text-xs text-slate-500">{office.address}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="bg-slate-800 mb-6" />

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <p className="text-xs text-slate-500">
                {t("copyright", { year })}
              </p>
              <div className="flex items-center gap-4">
                <Link href={`/${locale}/privacy`} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                  {t("privacy")}
                </Link>
                <Link href={`/${locale}/terms`} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                  {t("terms")}
                </Link>
              </div>
            </div>

            {/* Security Badges */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Shield className="h-3.5 w-3.5" />
                <span className="text-xs">SSL</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <Lock className="h-3.5 w-3.5" />
                <span className="text-xs">{t("securePayment")}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <CreditCard className="h-3.5 w-3.5" />
                <span className="text-xs">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Newsletter form component
function NewsletterForm({ locale }: { locale: string }) {
  const t = useTranslations("footer.newsletter");
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-3">
        <p className="text-emerald-400 text-sm flex items-center justify-center gap-2">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {t("success")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("placeholder")}
        required
        className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap"
      >
        {t("button")}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

// Import React for useState
import React from "react";
