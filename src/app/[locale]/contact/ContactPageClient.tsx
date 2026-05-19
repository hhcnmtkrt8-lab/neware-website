"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Mail, Send, CheckCircle, AlertCircle, ArrowLeftRight, FileText, Database, HeadphonesIcon, Clock, MessageCircle, HelpCircle, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { company } from "@/data/neware";
import { formatPhone, isValidPhone } from "@/lib/format-phone";
import dynamic from "next/dynamic";
const OfficeMap = dynamic(
  () => import("@/components/OfficeMap").then((m) => m.OfficeMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[220px] w-full rounded-3xl bg-slate-100 animate-pulse" />
    ),
  }
);

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  product?: string;
  message: string;
  usingCompetitor?: boolean;
}

interface Props {
  locale: string;
  products: Array<{
    id: string;
    name: string;
    nameEn: string;
    routeId: string;
  }>;
}

const migrationBenefits = [
  {
    icon: ArrowLeftRight,
    titleKey: "benefit1Title" as const,
    descKey: "benefit1Desc" as const,
  },
  {
    icon: FileText,
    titleKey: "benefit2Title" as const,
    descKey: "benefit2Desc" as const,
  },
  {
    icon: Database,
    titleKey: "benefit3Title" as const,
    descKey: "benefit3Desc" as const,
  },
  {
    icon: HeadphonesIcon,
    titleKey: "benefit4Title" as const,
    descKey: "benefit4Desc" as const,
  },
];

const WHAT_HAPPENS_NEXT = [
  { step: 1, titleKey: "nextStep1Title", descKey: "nextStep1Desc" },
  { step: 2, titleKey: "nextStep2Title", descKey: "nextStep2Desc" },
  { step: 3, titleKey: "nextStep3Title", descKey: "nextStep3Desc" },
];

export default function ContactPageClient({ locale, products }: Props) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usingCompetitor, setUsingCompetitor] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const isZh = locale === "zh";
  const isVi = locale === "vi";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setPhoneError("");

    const form = e.currentTarget;
    const phoneValue = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const phoneFormatted = formatPhone(phoneValue, locale);

    if (!isValidPhone(phoneFormatted)) {
      setPhoneError(
        isZh
          ? "请输入有效的电话号码（7-15位数字）"
          : isVi
          ? "Vui lòng nhập số điện thoại hợp lệ (7-15 chữ số)"
          : "Please enter a valid phone number (7-15 digits)"
      );
      setIsSubmitting(false);
      return;
    }

    const data: ContactFormData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value || undefined,
      phone: phoneFormatted || undefined,
      product: (form.elements.namedItem("product") as HTMLSelectElement).value || undefined,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      usingCompetitor,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        setUsingCompetitor(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const shenzhenOffice = company.offices[0];

  const whatsappNumber = "+447851559319";
  const whatsappMessage = encodeURIComponent(isZh 
    ? "您好，我想要了解新威尔电池测试设备。" 
    : isVi 
    ? "Xin chào, tôi muốn tìm hiểu về thiết bị kiểm tra pin NEWARE."
    : "Hello, I would like to learn about NEWARE battery testing equipment.");
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb
          items={[
            { label: isZh ? "首页" : isVi ? "Trang chủ" : "Home", href: `/${locale}` },
            { label: isZh ? "联系我们" : isVi ? "Liên hệ" : "Contact" }
          ]}
          locale={locale}
        />
      </div>

      {/* Hero */}
      <div className="relative bg-gradient-to-r from-primary via-primary-dark to-blue-700 text-white py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <MessageCircle className="h-3.5 w-3.5" />
            {isZh ? "获取免费技术咨询" : isVi ? "Nhận tư vấn kỹ thuật miễn phí" : "Get a Free Technical Consultation"}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            {isZh 
              ? "我们的应用工程师将在4小时内与您联系，提供专业的技术选型支持"
              : isVi
              ? "Kỹ sư ứng dụng của chúng tôi sẽ liên hệ trong 4 giờ để hỗ trợ tư vấn kỹ thuật chuyên nghiệp"
              : "Our application engineers will contact you within 4 hours with professional technical selection support"}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white shadow-xl font-bold">
                <MessageCircle className="h-5 w-5 mr-2" />
                {isZh ? "WhatsApp 在线咨询" : isVi ? "Tư vấn WhatsApp" : "WhatsApp Now"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Response Time Banner */}
        <div className="mb-10 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-center gap-3">
            <div className="h-10 w-10 bg-green-500/10 rounded-xl flex items-center justify-center">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-center">
              <p className="font-bold text-green-700">
                {isZh 
                  ? "4小时响应承诺 — 工作时间内所有咨询均可在4小时内获得回复"
                  : isVi
                  ? "Cam kết phản hồi trong 4 giờ — Tất cả yêu cầu được phản hồi trong 4 giờ làm việc"
                  : "4-Hour Response Promise — All inquiries responded to within 4 hours during business hours"}
              </p>
            </div>
          </div>
        </div>

        {/* Competitor Migration Banner */}
        <div className="mb-10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
                <ArrowLeftRight className="h-3 w-3" />
                {isZh ? "设备迁移专属" : isVi ? "Di chuyển thiết bị" : "Equipment Migration"}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                {t("competitorMigration.title")}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t("competitorMigration.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {migrationBenefits.map((benefit) => (
                <div key={benefit.titleKey} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <benefit.icon className="h-5 w-5 text-green-400 mb-2" />
                  <h3 className="text-sm font-bold text-white mb-1">
                    {t(`competitorMigration.${benefit.titleKey}`)}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {t(`competitorMigration.${benefit.descKey}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {t("sendInquiry")}
                </h2>
                <p className="text-sm text-slate-500 mb-6">
                  {isZh ? "填写下方表单，我们将在4小时内与您联系" : isVi ? "Điền biểu mẫu bên dưới, chúng tôi sẽ liên hệ trong 4 giờ" : "Fill out the form below and we'll contact you within 4 hours"}
                </p>

                {status === "success" && (
                  <div
                    className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3"
                    role="alert"
                    aria-live="polite"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0" aria-hidden="true" />
                    <p className="text-sm text-green-700">
                      {t("formSuccess")}
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div
                    className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3"
                    role="alert"
                    aria-live="polite"
                  >
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0" aria-hidden="true" />
                    <p className="text-sm text-red-700">
                      {t("form.error")}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        {t("form.name")} <span aria-hidden="true">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder={t("placeholderName")}
                        required
                        autoComplete="name"
                        aria-required="true"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {t("form.email")} <span aria-hidden="true">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t("placeholderEmail")}
                        required
                        autoComplete="email"
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="company">{t("form.company")}</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder={t("placeholderCompany")}
                        autoComplete="organization"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("form.phone")}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder={
                          isZh
                            ? "+86 138 0000 0000"
                            : isVi
                            ? "+84 90 000 0000"
                            : "+1 555 000 0000"
                        }
                        autoComplete="tel"
                        aria-describedby={phoneError ? "phone-error" : undefined}
                        aria-invalid={!!phoneError}
                        onChange={(e) => {
                          const formatted = formatPhone(e.target.value, locale);
                          e.target.value = formatted;
                          if (phoneError) setPhoneError("");
                        }}
                      />
                      {phoneError && (
                        <p id="phone-error" className="text-xs text-red-500 flex items-center gap-1" role="alert">
                          <AlertCircle className="h-3 w-3" aria-hidden="true" />
                          {phoneError}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Competitor User Toggle */}
                  <div className="bg-slate-900 rounded-xl p-4 border border-slate-700/50">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={usingCompetitor}
                        onChange={(e) => setUsingCompetitor(e.target.checked)}
                        className="h-5 w-5 rounded border-slate-600 text-green-500 focus:ring-green-500 bg-slate-800"
                      />
                      <div>
                        <span className="text-sm font-semibold text-white">
                          {t("form.usingCompetitor")}
                        </span>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {isZh
                            ? "勾选后我们的高级工程师将优先处理您的咨询"
                            : isVi
                            ? "Kỹ sư cao cấp của chúng tôi sẽ ưu tiên xử lý yêu cầu của bạn"
                            : "Our senior engineers will prioritize your inquiry"}
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product">{t("form.product")}</Label>
                    <Select name="product">
                      <SelectTrigger id="product" aria-label={t("form.product")}>
                        <SelectValue placeholder={t("selectProductOptional")} />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {locale === "zh" ? p.name : p.nameEn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {t("form.message")} <span aria-hidden="true">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={
                        usingCompetitor
                          ? isZh
                            ? "请描述您目前使用的设备型号，以及您希望迁移的原因（如：价格、参数需求、服务需求等）..."
                            : isVi
                            ? "Vui lòng mô tả model thiết bị hiện tại và lý do bạn muốn chuyển đổi..."
                            : "Please describe your current equipment model and why you want to migrate (price, specs, support needs, etc.)..."
                          : t("placeholderMessage")
                      }
                      rows={5}
                      required
                      aria-required="true"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className={`w-full shadow-lg font-semibold ${usingCompetitor ? "bg-green-600 hover:bg-green-700" : ""}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>{t("submitting")}</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        {usingCompetitor
                          ? isZh
                            ? "提交设备迁移咨询"
                            : isVi
                            ? "Gửi yêu cầu di chuyển thiết bị"
                            : "Submit Equipment Migration Inquiry"
                          : t("submitInquiry")}
                      </>
                    )}
                  </Button>

                  {/* WhatsApp Option */}
                  <div className="text-center">
                    <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="lg" className="w-full border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        {t("whatsappPrompt")}
                      </Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* What Happens Next */}
            <Card className="mt-8">
              <CardContent className="p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <ChevronRight className="h-5 w-5 text-primary" />
                  {isZh ? "提交后会发生什么？" : isVi ? "Điều gì xảy ra sau khi gửi?" : "What Happens Next?"}
                </h3>
                <div className="space-y-4">
                  {WHAT_HAPPENS_NEXT.map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-primary">{item.step}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">{t(item.titleKey)}</h4>
                        <p className="text-xs text-slate-500">{t(item.descKey)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* FAQ Mini Section */}
            <Card className="mt-8 bg-slate-50 border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <HelpCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">
                        {isZh ? "在联系我们之前" : isVi ? "Trước khi liên hệ" : "Before You Contact Us"}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {isZh ? "您可以在FAQ中找到常见问题的答案" : isVi ? "Bạn có thể tìm câu trả lời cho các câu hỏi thường gặp trong FAQ" : "Find answers to common questions in our FAQ"}
                      </p>
                    </div>
                  </div>
                  <Link href={`/${locale}/knowledge-base`}>
                    <Button variant="ghost" size="sm" className="text-primary">
                      {isZh ? "查看FAQ" : isVi ? "Xem FAQ" : "View FAQ"}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shenzhen HQ */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-slate-900 text-lg">
                    {t("headOffice")}
                  </h3>
                </div>
                <Separator />

                {/* Interactive Map */}
                <OfficeMap
                  address="深圳市福田区中康路128号"
                  addressEn="128 Zhongkang Rd, Futian District, Shenzhen, China"
                  isZh={isZh}
                />

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Mail className="h-4 w-4 text-primary/60 shrink-0" aria-hidden="true" />
                    <a href={`mailto:${shenzhenOffice.email}`} className="hover:text-primary transition-colors">
                      {shenzhenOffice.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
