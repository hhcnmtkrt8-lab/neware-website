import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/request";

export default function RootPage() {
  // #region agent log
  fetch('http://127.0.0.1:7656/ingest/024ff6c4-86da-497c-9de0-3eb0d4149646', {method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8abdd1'},body:JSON.stringify({sessionId:'8abdd1',id:'log_root_page',timestamp:Date.now(),location:'src/app/page.tsx:RootPage',message:'Root redirect',data:{defaultLocale,redirectTo:`/${defaultLocale}`},hypothesisId:'H1',runId:'pre-fix'})}).catch(()=>{});
  // #endregion
  redirect(`/${defaultLocale}`);
}
