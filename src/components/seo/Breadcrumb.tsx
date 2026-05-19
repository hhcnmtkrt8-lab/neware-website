"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

/**
 * Breadcrumb item interface
 */
interface BreadcrumbItem {
  /** Display label for the breadcrumb */
  label: string;
  /** Optional href - if not provided, it's the current page (no link) */
  href?: string;
}

/**
 * Breadcrumb navigation component
 * 
 * @example
 * ```tsx
 * <Breadcrumb 
 *   items={[
 *     { label: "Home", href: `/${locale}` },
 *     { label: "Products", href: `/${locale}/products` },
 *     { label: "CT-4000 Series" }
 *   ]} 
 *   locale={locale}
 * />
 * ```
 */
interface BreadcrumbProps {
  /** Array of breadcrumb items - last item without href is current page */
  items: BreadcrumbItem[];
  /** Current locale for home link */
  locale: string;
}

export function Breadcrumb({ items, locale }: BreadcrumbProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://www.neware.com.cn/${locale}`,
      },
      ...items.slice(0, -1).map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: `https://www.neware.com.cn${item.href}`,
      })),
      ...(items.length > 1
        ? [
            {
              "@type": "ListItem",
              position: items.length,
              name: items[items.length - 1].label,
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center flex-wrap gap-1.5 text-sm">
          <li className="flex items-center">
            <Link
              href={`/${locale}`}
              className="flex items-center text-slate-500 hover:text-primary transition-colors"
              aria-label="Home"
            >
              <Home className="h-4 w-4" />
            </Link>
          </li>
          
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isSecondToLast = index === items.length - 2;

            return (
              <li key={index} className="flex items-center gap-1.5">
                <ChevronRight className="h-4 w-4 text-slate-300" aria-hidden="true" />
                {isLast || !item.href ? (
                  <span
                    className="text-slate-700 font-medium truncate max-w-[200px]"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-slate-500 hover:text-primary transition-colors truncate max-w-[200px]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
