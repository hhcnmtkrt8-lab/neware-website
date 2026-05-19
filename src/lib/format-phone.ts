/**
 * Validates and formats international phone numbers.
 * Supports formats: +1 xxx xxx xxxx, +86 xxx xxxx xxxx, +84 xxx xxx xxxx, +84 xx xxxx xxxx
 */
export function formatPhone(value: string, locale?: string): string {
  // Remove all non-numeric characters except +
  const digits = value.replace(/[^\d+]/g, "");

  // If locale is not provided, try to auto-detect from the number
  if (!locale) {
    if (digits.startsWith("+1") || digits.startsWith("1")) return formatPhoneUS(value);
    if (digits.startsWith("+86") || digits.startsWith("86")) return formatPhoneCN(value);
    if (digits.startsWith("+84") || digits.startsWith("84")) return formatPhoneVN(value);
    return digits;
  }

  switch (locale) {
    case "zh":
      return formatPhoneCN(value);
    case "vi":
      return formatPhoneVN(value);
    case "en":
    default:
      return formatPhoneUS(value);
  }
}

function formatPhoneCN(value: string): string {
  const digits = value.replace(/[^\d]/g, "");
  if (digits.startsWith("86")) {
    const rest = digits.slice(2);
    if (rest.length <= 3) return `+86 ${rest}`;
    if (rest.length <= 7) return `+86 ${rest.slice(0, 3)} ${rest.slice(3)}`;
    return `+86 ${rest.slice(0, 3)} ${rest.slice(3, 7)} ${rest.slice(7, 11)}`;
  }
  if (digits.length <= 3) return `+86 ${digits}`;
  if (digits.length <= 7) return `+86 ${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `+86 ${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7, 11)}`;
}

function formatPhoneVN(value: string): string {
  const digits = value.replace(/[^\d]/g, "");
  if (digits.startsWith("84")) {
    const rest = digits.slice(2);
    if (rest.length <= 3) return `+84 ${rest}`;
    if (rest.length <= 6) return `+84 ${rest.slice(0, 3)} ${rest.slice(3)}`;
    return `+84 ${rest.slice(0, 3)} ${rest.slice(3, 6)} ${rest.slice(6, 10)}`;
  }
  if (digits.length <= 3) return `+84 ${digits}`;
  if (digits.length <= 6) return `+84 ${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `+84 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
}

function formatPhoneUS(value: string): string {
  const digits = value.replace(/[^\d]/g, "");
  if (digits.startsWith("1")) {
    const rest = digits.slice(1);
    if (rest.length <= 3) return `+1 ${rest}`;
    if (rest.length <= 6) return `+1 ${rest.slice(0, 3)} ${rest.slice(3)}`;
    return `+1 ${rest.slice(0, 3)} ${rest.slice(3, 6)} ${rest.slice(6, 10)}`;
  }
  if (digits.length <= 3) return `+1 ${digits}`;
  if (digits.length <= 6) return `+1 ${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `+1 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
}

export function isValidPhone(phone: string): boolean {
  if (!phone) return true; // Optional field
  const digits = phone.replace(/[^\d]/g, "");
  // Minimum 7 digits, maximum 15 digits (international standard)
  return digits.length >= 7 && digits.length <= 15;
}
