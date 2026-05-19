"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Target, Globe2, Layers, Zap, Cpu, Battery, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const advantages = [
  { key: "item1", icon: Target },
  { key: "item2", icon: Globe2 },
  { key: "item3", icon: Layers },
  { key: "item4", icon: Zap },
  { key: "item5", icon: Cpu },
  { key: "item6", icon: Battery },
  { key: "item7", icon: ArrowLeftRight },
];

export function WhyNewareSection() {
  const t = useTranslations("home.whyNeware");
  const params = useParams();
  const locale = (params.locale as string) || "zh";
  const isZh = locale === "zh";

  return (
    <section className="py-20 sm:py-28 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, i) => {
            const isMigrationCard = adv.key === "item7";
            return (
              <div
                key={adv.key}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 backdrop-blur-sm animate-slide-up ${
                  isMigrationCard
                    ? "border-green-500/30 bg-green-900/20 hover:bg-green-900/30 hover:border-green-500/50"
                    : "border-slate-700/50 bg-slate-800/50 hover:bg-slate-800 hover:border-primary/30"
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                    isMigrationCard
                      ? "bg-green-500/10 text-green-400 group-hover:bg-green-500 group-hover:text-white"
                      : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                  }`}>
                    <adv.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className={`text-lg font-bold ${isMigrationCard ? "text-green-400" : "text-white"}`}>
                      {t(`${adv.key}Title`)}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {t(`${adv.key}Desc`)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16 animate-fade-in">
          <Link href={`/${locale}/contact`}>
            <Button size="lg" className="shadow-xl shadow-primary/30 font-semibold">
              {isZh ? "联系销售工程师" : "Talk to a Sales Engineer"}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
