"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { MessageCircle, Phone, X, ChevronUp, MessageSquarePlus } from "lucide-react";

// ============================================================
//  EDIT YOUR CONTACT DETAILS HERE
// ============================================================
const WHATSAPP_NUMBER = "447851559319";    // WhatsApp Business number
const ZALO_ID         = "batteryxlab";    // Zalo username/ID
const TELEGRAM_HANDLE = "batteryxlab";    // Telegram username (no @)
// ============================================================

const BASE_PATH = "/images";

// QR-code popover card for a single messenger
function MessengerCard({
  id,
  label,
  qrSrc,
  deepHref,
  color,
  bgHover,
  textColor,
  borderColor,
  locale,
  labels,
}: {
  id: string;
  label: string;
  qrSrc: string;
  deepHref: string;
  color: string;
  bgHover: string;
  textColor: string;
  borderColor: string;
  locale: string;
  labels: Record<string, { scan: string; tapMobile: string; instantReply: string }>;
}) {
  const l = labels[locale] || labels.en;

  return (
    <div className="relative">
      {/* Popover — appears on hover (group-hover) */}
      <div className="absolute bottom-full right-0 mb-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50 pointer-events-none group-hover:pointer-events-auto">
        {/* Card */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-2xl p-4 w-52 text-center select-none">
          {/* QR image */}
          <div className="relative w-44 h-44 mx-auto mb-3 rounded-xl overflow-hidden border border-slate-100 bg-white">
            <Image
              src={qrSrc}
              alt={`${label} QR Code`}
              fill
              className="object-contain"
              sizes="176px"
              quality={85}
              unoptimized
            />
          </div>
          {/* Label */}
          <p className="text-sm font-semibold text-slate-700 mb-0.5">{label}</p>
          {/* Localised hint */}
          <p className="text-xs text-slate-400 leading-tight">{l.scan}</p>
        </div>
        {/* Arrow */}
        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-slate-100 rotate-45 transform" />
      </div>

      {/* Row — hoverable trigger */}
      <a
        href={deepHref}
        target={deepHref.startsWith("http") ? "_blank" : "_self"}
        rel={deepHref.startsWith("http") ? "noopener noreferrer" : undefined}
        className={`flex items-center gap-3 bg-white border ${borderColor} rounded-xl px-4 py-3 shadow-lg hover:shadow-xl transition-all group min-w-[220px] cursor-pointer`}
        aria-label={`${label}: ${l.tapMobile}`}
      >
        <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center shrink-0`}>
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">{label}</div>
          <div className="text-xs text-slate-400">{l.tapMobile}</div>
        </div>
      </a>
    </div>
  );
}

const MESSENGER_METHODS = (
  locale: string,
  labels: Record<string, { scan: string; tapMobile: string; instantReply: string }>,
  zaloDeep: string,
  whatsappDeep: string,
  telegramDeep: string,
) => [
  {
    id: "zalo",
    label: "Zalo",
    qrSrc: `${BASE_PATH}/zalo-qr.webp`,
    deepHref: zaloDeep,
    color: "bg-blue-500 hover:bg-blue-600",
    bgHover: "hover:bg-blue-50",
    textColor: "text-blue-600 hover:text-blue-700",
    borderColor: "border-blue-100",
    locale,
    labels,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    qrSrc: `${BASE_PATH}/whatsapp-qr.webp`,
    deepHref: whatsappDeep,
    color: "bg-green-500 hover:bg-green-600",
    bgHover: "hover:bg-green-50",
    textColor: "text-green-600 hover:text-green-700",
    borderColor: "border-green-100",
    locale,
    labels,
  },
  {
    id: "telegram",
    label: "Telegram",
    qrSrc: `${BASE_PATH}/telegram-qr.webp`,
    deepHref: telegramDeep,
    color: "bg-sky-500 hover:bg-sky-600",
    bgHover: "hover:bg-sky-50",
    textColor: "text-sky-600 hover:text-sky-700",
    borderColor: "border-sky-100",
    locale,
    labels,
  },
];

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const locale = (params.locale as string) || "en";

  const panelLabels: Record<string, { title: string; subtitle: string }> = {
    en: { title: "Chat With Us", subtitle: "Instant reply, 24/7" },
    zh: { title: "联系我们", subtitle: "即时响应，7×24小时在线" },
    vi: { title: "Nhắn tin ngay", subtitle: "Phản hồi tức thì, 24/7" },
    ru: { title: "Напишите нам", subtitle: "Мгновенный ответ, 24/7" },
  };

  const qrLabels: Record<string, { scan: string; tapMobile: string; instantReply: string }> = {
    en: {
      scan: "Scan to chat with us",
      tapMobile: "Tap to open app",
      instantReply: "Instant reply, 24/7",
    },
    zh: {
      scan: "扫码联系我们",
      tapMobile: "点击打开应用",
      instantReply: "即时响应，7×24小时",
    },
    vi: {
      scan: "Quét mã để nhắn tin",
      tapMobile: "Nhấn để mở ứng dụng",
      instantReply: "Phản hồi tức thì, 24/7",
    },
    ru: {
      scan: "Сканируйте, чтобы написать",
      tapMobile: "Нажмите, чтобы открыть приложение",
      instantReply: "Мгновенный ответ, 24/7",
    },
  };

  const l = panelLabels[locale] || panelLabels.en;

  const zaloDeep = `https://zalo.me/${ZALO_ID}`;
  const whatsappDeep = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi NEWARE, I'm interested in your battery testing equipment. Could you provide a quote?"
  )}`;
  const telegramDeep = `https://t.me/${TELEGRAM_HANDLE}`;

  const messengers = MESSENGER_METHODS(locale, qrLabels, zaloDeep, whatsappDeep, telegramDeep);

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3">
      {/* Expandable contact panel */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 h-0 overflow-hidden"
        }`}
      >
        {/* Messenger QR-code cards */}
        <div className="flex flex-col gap-3">
          {messengers.map((m) => (
            <MessengerCard key={m.id} {...m} />
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 px-1">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Email row */}
        <a
          href="mailto:info@batteryxlab.shop?subject=Product Inquiry from Website"
          className="flex items-center gap-3 bg-white border border-blue-100 rounded-xl px-4 py-3 shadow-lg hover:shadow-xl transition-all group min-w-[220px]"
        >
          <div className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shrink-0 transition-colors">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">Email Us</div>
            <div className="text-xs text-slate-400">info@batteryxlab.shop</div>
          </div>
        </a>

        {/* Quote form row */}
        <a
          href={`/${locale}/contact`}
          className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-lg hover:shadow-xl transition-all group min-w-[220px]"
        >
          <div className="w-10 h-10 bg-slate-700 hover:bg-slate-800 rounded-full flex items-center justify-center shrink-0 transition-colors">
            <MessageSquarePlus className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">Request Quote</div>
            <div className="text-xs text-slate-400">Fill inquiry form</div>
          </div>
        </a>
      </div>

      {/* Main toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close contact panel" : "Open contact panel"}
        className={`relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? "bg-slate-700 hover:bg-slate-800 rotate-180" : "bg-primary hover:bg-primary/90"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </div>
        )}
      </button>

      {/* Scroll-to-top (only when panel is closed) */}
      {!isOpen && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-500"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
