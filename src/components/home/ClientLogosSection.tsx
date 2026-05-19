"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

// ─── Client data — keys match i18n "home.clientLogos.*" ──────────────────────
// Overseas sensitive entities replaced with compliant generic labels.
// Each id is unique; no two ids share the same translation.
const clientRow1 = [
  { id: "CATL" },
  { id: "BYD" },
  { id: "EVE" },
  { id: "SUNWODA" },
  { id: "LG_ENERGY" },
  { id: "SAMSUNG_SDI" },
  { id: "SK_ON" },
  { id: "SAIC" },
  { id: "NIO" },
  { id: "XPENG" },
];

const clientRow2 = [
  { id: "ATL" },
  { id: "PANASONIC" },
  { id: "GAC" },
  { id: "GEELY" },
  { id: "TSINGHUA" },
  { id: "PEKING" },
  { id: "FUDAN" },
  { id: "TONGJI" },
  { id: "HARBIN" },
  { id: "XIAMEN" },
];

// ─── Marquee row ───────────────────────────────────────────────────────────
function MarqueeRow({
  clients,
  rowId,
  speed,
  t,
}: {
  clients: { id: string }[];
  rowId: string;
  speed: string;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="relative mb-5 overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />

      <div className="flex overflow-hidden">
        {/* Clone: first pass — rendered to user */}
        <div className="flex animate-marquee-left" style={{ animationDuration: speed }}>
          {clients.map((client, i) => (
            <div
              key={`${rowId}-a-${i}`}
              className="flex-shrink-0 flex flex-col items-center justify-center gap-1.5 mx-3"
            >
              <div className="h-11 w-[110px] bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center px-2 hover:shadow-md hover:border-primary/30 transition-all duration-200 group cursor-default">
                <span className="text-xs font-extrabold text-slate-300 group-hover:text-primary transition-colors tracking-tight text-center leading-tight font-heading min-w-[64px]">
                  {t(client.id)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Clone: second pass — seamless loop seam (aria-hidden) */}
        <div className="flex animate-marquee-left" style={{ animationDuration: speed }} aria-hidden="true">
          {clients.map((client, i) => (
            <div
              key={`${rowId}-b-${i}`}
              className="flex-shrink-0 flex flex-col items-center justify-center gap-1.5 mx-3"
            >
              <div className="h-11 w-[110px] bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center px-2">
                <span className="text-xs font-extrabold text-slate-300 tracking-tight text-center leading-tight font-heading min-w-[64px]">
                  {t(client.id)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section export ───────────────────────────────────────────────────────────
export function ClientLogosSection() {
  const t = useTranslations("home.clientLogos");
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const isVi = locale === "vi";

  return (
    <section className="py-12 bg-white border-y border-slate-100 overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-7">
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.18em]">
          {t("header")}
        </p>
      </div>

      <MarqueeRow clients={clientRow1} rowId="row1" speed="40s" t={t} />
      <MarqueeRow clients={clientRow2} rowId="row2" speed="48s" t={t} />

      {/* Category legend */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-1.5">
            <div className="h-px w-5 bg-slate-200" />
            <span className="text-[10px] text-slate-400 font-medium">{t("catBattery")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-px w-5 bg-slate-200" />
            <span className="text-[10px] text-slate-400 font-medium">{t("catEVOEM")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-px w-5 bg-slate-200" />
            <span className="text-[10px] text-slate-400 font-medium">{t("catUni")}</span>
          </div>
          {isVi && (
            <div className="flex items-center gap-1.5">
              <div className="h-px w-5 bg-slate-200" />
              <span className="text-[10px] text-slate-400 font-medium">{t("catVietnam")}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
