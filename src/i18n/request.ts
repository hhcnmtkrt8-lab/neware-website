import { getRequestConfig } from "next-intl/server";

export const locales = ["vi", "en", "zh", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? defaultLocale;

  // #region agent log
  fetch('http://127.0.0.1:7656/ingest/024ff6c4-86da-497c-9de0-3eb0d4149646', {method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8abdd1'},body:JSON.stringify({sessionId:'8abdd1',id:'log_i18n_req',timestamp:Date.now(),location:'src/i18n/request.ts:getRequestConfig',message:'Loading messages',data:{locale,defaultLocale},hypothesisId:'H1-H3',runId:'pre-fix'})}).catch(()=>{});
  // #endregion

  return {
    locale,
    messages: (await import(`../i18n/messages/${locale}.json`)).default,
  };
});
