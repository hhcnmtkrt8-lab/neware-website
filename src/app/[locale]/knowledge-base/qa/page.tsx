import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import QAClient from "@/components/knowledge-base/QAClient";

export default async function QALocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <QAClient />
    </NextIntlClientProvider>
  );
}
