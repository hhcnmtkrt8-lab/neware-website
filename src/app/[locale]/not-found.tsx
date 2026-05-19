"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  const params = useParams();
  const locale = (params.locale as string) || "zh";

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black text-slate-100 mb-4 select-none" aria-hidden="true">
          {t("subtitle")}
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">{t("title")}</h1>
        <p className="text-slate-500 mb-8">
          {t("message")}
        </p>
        <div className="flex gap-3 justify-center">
          <Link href={`/${locale}`}>
            <Button>{t("button")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
