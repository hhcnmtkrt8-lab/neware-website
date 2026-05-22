"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

const COMPARISON_KEYS = [
  { labelKey: "samplingRate",   newareKey: "samplingNeware",   competitorKey: "samplingCompetitor" },
  { labelKey: "accuracy",       newareKey: "accuracyNeware",   competitorKey: "accuracyCompetitor" },
  { labelKey: "energyRecovery", newareKey: "energyRecoveryNeware", competitorKey: "energyRecoveryCompetitor" },
  { labelKey: "unitsDeployed",  newareKey: "unitsDeployedNeware", competitorKey: "unitsDeployedCompetitor" },
  { labelKey: "countries",      newareKey: "countriesNeware",  competitorKey: "countriesCompetitor" },
  { labelKey: "productSeries", newareKey: "productSeriesNeware", competitorKey: "productSeriesCompetitor" },
];

const BAR_HEIGHTS = [48, 68, 40, 82, 58, 32, 72, 52];

export function HeroComparison({ locale }: { locale: string }) {
  const tComp = useTranslations("home.competitorCompare");
  const tHero = useTranslations("home.hero");
  const [showCompetitorCompare, setShowCompetitorCompare] = useState(false);

  return (
    <div className="w-full max-w-[22rem] mx-auto lg:mx-0 lg:ml-auto">

      {/* Outer glow layer */}
      <div
        className="relative rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(99,102,241,0.06) 50%, rgba(6,182,212,0.04) 100%)",
          padding: "1px",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.6), 0 24px 64px -12px rgba(148,163,184,0.28), 0 8px 24px -4px rgba(148,163,184,0.12)",
        }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
        >

          {/* ── HEADER ── */}
          <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                {tHero("monitorTitle")}
              </span>
            </div>
            <button
              onClick={() => setShowCompetitorCompare(v => !v)}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all duration-200 ${
                showCompetitorCompare
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {showCompetitorCompare
                ? `← ${tComp("newareSide")}`
                : `${tComp("competitorSide")} →`}
            </button>
          </div>

          {/* ── METRICS ROW ── */}
          <div className="grid grid-cols-2 gap-px bg-slate-100 border-b border-slate-100">
            <div className="bg-white px-4 py-3">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                {tComp("samplingRate")}
              </p>
              <div className="flex items-baseline gap-0.5">
                <span
                  className="text-2xl font-black leading-none transition-colors duration-300"
                  style={{ color: showCompetitorCompare ? "#94a3b8" : "#1e40af" }}
                >
                  {showCompetitorCompare ? "10" : "1000"}
                </span>
                <span className="text-xs font-semibold text-slate-400">Hz</span>
              </div>
            </div>
            <div className="bg-white px-4 py-3">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                {tComp("accuracy")}
              </p>
              <div className="flex items-baseline gap-0.5">
                <span
                  className="text-2xl font-black leading-none transition-colors duration-300"
                  style={{ color: showCompetitorCompare ? "#94a3b8" : "#1e40af" }}
                >
                  {showCompetitorCompare ? "0.05" : "0.02"}
                </span>
                <span className="text-xs font-semibold text-slate-400">%</span>
              </div>
            </div>
          </div>

          {/* ── BATTERY VISUAL ── */}
          <div className="px-4 py-4 border-b border-slate-100">
            <div className="relative" style={{ height: "56px" }}>

              {/* Layer 1 — SVG battery shell + gradient fill */}
              <svg viewBox="0 0 240 56" fill="none" className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} aria-hidden="true">
                <rect x="1" y="1" width="230" height="54" rx="12" stroke="#e2e8f0" strokeWidth="1.5" fill="rgba(248,250,252,0.9)" />
                <rect x="232" y="14" width="7" height="28" rx="2.5" fill="#e2e8f0" />
                {[30, 60, 90, 120, 150, 180, 210].map(x => (
                  <line key={x} x1={x} y1="2" x2={x} y2="54" stroke="#f1f5f9" strokeWidth="1" />
                ))}
                <clipPath id="battClip">
                  <rect x="1" y="1" width="230" height="54" rx="12" />
                </clipPath>
                <rect
                  x="1" y="1" width="172" height="54"
                  fill={showCompetitorCompare ? "none" : "url(#battGrad)"}
                  opacity="0.13"
                  clipPath="url(#battClip)"
                />
                <defs>
                  <linearGradient id="battGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="60%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Layer 2 — channel bars */}
              <div
                className="absolute inset-0 flex items-end gap-[3px] px-3 pb-2 pt-3 pointer-events-none"
                style={{ zIndex: 2 }}
              >
                {BAR_HEIGHTS.map((h, i) => {
                  const isMid = i >= 2 && i <= 5;
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-sm transition-all duration-700"
                      style={{
                        height: `${isMid ? h * 0.45 : h}%`,
                        background: showCompetitorCompare
                          ? "linear-gradient(to top, #cbd5e1, #e2e8f0)"
                          : i < 5
                            ? "linear-gradient(to top, rgba(59,130,246,0.55), rgba(6,182,212,0.55))"
                            : "linear-gradient(to top, rgba(148,163,184,0.45), rgba(203,213,225,0.45))",
                      }}
                    />
                  );
                })}
              </div>

              {/* Layer 3 — center metric */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                style={{ zIndex: 3 }}
              >
                <span
                  className="text-[1.75rem] font-black leading-none"
                  style={{
                    background: showCompetitorCompare
                      ? "linear-gradient(135deg,#94a3b8,#64748b)"
                      : "linear-gradient(135deg,#3b82f6,#6366f1)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {showCompetitorCompare ? "?" : "75%"}
                </span>
                <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
                  {showCompetitorCompare ? tComp("na") : tComp("inTest")}
                </span>
              </div>

            </div>
          </div>

          {/* ── SPEC ROWS ── */}
          <div className="px-4 pt-2 pb-3">
            {COMPARISON_KEYS.map((item, i) => (
              <div
                key={item.labelKey}
                className={`flex items-center justify-between py-1.5 ${i < COMPARISON_KEYS.length - 1 ? "border-b border-slate-50" : ""}`}
              >
                <span className="text-[11px] font-medium text-slate-400">
                  {tComp(item.labelKey)}
                </span>
                <span
                  className={`text-[11px] font-bold tabular-nums transition-all duration-300 ${
                    showCompetitorCompare ? "text-red-500" : ""
                  }`}
                  style={
                    showCompetitorCompare
                      ? {}
                      : {
                          background: "linear-gradient(90deg,#2563eb,#4f46e5)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }
                  }
                >
                  {showCompetitorCompare
                    ? tComp(item.competitorKey as any)
                    : tComp(item.newareKey as any)}
                </span>
              </div>
            ))}
          </div>

          {/* ── SPEC PILLS ── */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap px-4 pb-4">
            {[
              { label: "8 CH",    color: "#475569" },
              { label: "3000 A",  color: "#2563eb" },
              { label: "1000 V",  color: "#4f46e5" },
              { label: "1000 Hz", color: "#0891b2" },
            ].map(p => (
              <span
                key={p.label}
                className="inline-flex items-center rounded-lg border border-slate-200/80 bg-slate-50 px-2.5 py-1 text-[10px] font-bold tracking-wide"
                style={{ color: p.color }}
              >
                {p.label}
              </span>
            ))}
          </div>

          {/* ── MIGRATION STRIP ── */}
          <div className="flex items-center justify-between gap-3 px-4 py-3 bg-slate-50/80 border-t border-slate-100">
            <p className="text-[11px] text-slate-400 leading-snug">
              {tComp("switchingFromCompetitor")}
            </p>
            <a
              href={`/${locale}/contact`}
              className="shrink-0 text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap"
            >
              {tComp("migrationCta")} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
