import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhone(phone: string, locale: string = "zh"): string {
  if (!phone) return phone;
  const digits = phone.replace(/[^\d]/g, "");
  if (digits.length === 11 && locale === "zh") {
    return `+86 ${digits.slice(1, 4)} ${digits.slice(4, 8)} ${digits.slice(8)}`;
  }
  if (digits.length === 10 && locale === "vi") {
    return `+84 ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  return phone;
}
