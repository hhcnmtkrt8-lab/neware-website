"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Monitor, BookOpen, FileText, Award, Download, ExternalLink, Calendar, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { downloadCategories } from "@/data/downloads";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  BookOpen,
  FileText,
  Award,
};

function FileTypeIcon({ type }: { type: string }) {
  const colors: Record<string, string> = {
    ZIP: "text-blue-600 bg-blue-50 border-blue-200",
    PDF: "text-red-600 bg-red-50 border-red-200",
    EXE: "text-green-600 bg-green-50 border-green-200",
  };
  const color = colors[type] || "text-slate-600 bg-slate-50 border-slate-200";
  return (
    <span
      className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border font-mono text-xs font-bold ${color}`}
    >
      {type}
    </span>
  );
}

function DownloadCard({ item, locale }: { item: (typeof downloadCategories)[0]["items"][0]; locale: string }) {
  const t = useTranslations("downloads");
  const isZh = locale === "zh";

  return (
    <Card className="group hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <FileTypeIcon type={item.fileType} />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors truncate">
              {isZh ? item.name : item.nameEn}
            </h3>
            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
              {isZh ? item.description : item.descriptionEn}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-400">
              {item.version && (
                <span className="flex items-center gap-1">
                  <Badge variant="secondary" className="text-xs font-normal">
                    v{item.version}
                  </Badge>
                </span>
              )}
              <span className="flex items-center gap-1">
                <HardDrive className="h-3 w-3" />
                {item.size}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {item.lastUpdated}
              </span>
            </div>
          </div>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
            title={t("download")}
          >
            <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
              <Download className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DownloadsClient() {
  const t = useTranslations("downloads");
  const params = useParams();
  const locale = (params.locale as string) || "zh";
  const isZh = locale === "zh";

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 sm:py-20 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Download className="h-4 w-4" />
              {t("badge")}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-slate-600">
              {t("subtitle")}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {[
              { value: "3+", label: isZh ? "款软件" : "Software" },
              { value: "5+", label: isZh ? "份手册" : "Manuals" },
              { value: "3+", label: isZh ? "本目录" : "Catalogs" },
              { value: "3+", label: isZh ? "份证书" : "Certificates" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm"
              >
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads Content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full sm:w-auto">
                <TabsTrigger value="all">{t("tabAll")}</TabsTrigger>
                {downloadCategories.map((cat) => (
                  <TabsTrigger key={cat.id} value={cat.id}>
                    {isZh ? cat.name : cat.nameEn}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* All Tab */}
            <TabsContent value="all" className="space-y-10">
              {downloadCategories.map((category) => (
                <div key={category.id}>
                  <div className="flex items-center gap-3 mb-4">
                    {(() => {
                      const Icon = iconMap[category.icon] || FileText;
                      return <Icon className="h-5 w-5 text-primary" />;
                    })()}
                    <h2 className="text-xl font-bold text-slate-900">
                      {isZh ? category.name : category.nameEn}
                    </h2>
                    <span className="text-sm text-slate-400">
                      ({category.items.length} {isZh ? "项" : "items"})
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-4">
                    {isZh ? category.description : category.descriptionEn}
                  </p>
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <DownloadCard key={item.id} item={item} locale={locale} />
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* Category Tabs */}
            {downloadCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  {(() => {
                    const Icon = iconMap[category.icon] || FileText;
                    return <Icon className="h-6 w-6 text-primary" />;
                    })()}
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {isZh ? category.name : category.nameEn}
                    </h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {isZh ? category.description : category.descriptionEn}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <DownloadCard key={item.id} item={item} locale={locale} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-slate-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">{t("ctaTitle")}</h2>
          <p className="text-slate-400 mb-6">{t("ctaSubtitle")}</p>
          <Link href={`/${locale}/contact`}>
            <Button size="lg" className="shadow-lg shadow-primary/30">
              <ExternalLink className="h-4 w-4" />
              {t("ctaButton")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
