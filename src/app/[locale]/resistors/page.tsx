import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { vietnamProductRoutes, vietnamProducts } from "@/data/neware-vietnam";
import { ResistorsClient } from "./ResistorsClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === "vi";

  return {
    title: {
      default: isVi
        ? "Điện trở công nghiệp — Điện trở xả, khởi động, dạng tủ | NEWARE Vietnam"
        : "Industrial Resistors — Braking, Starting, Cabinet Resistors | NEWARE Vietnam",
      template: "%s | NEWARE Vietnam",
    },
    description: isVi
      ? "Cung cấp đầy đủ các dòng điện trở công nghiệp: điện trở xả RXG20, điện trở khởi động BK6/BK12, điện trở dạng tủ ZX1/ZX12/ZX15. Phục vụ cầu trục, băng tải, thang máy, ngành thép, xi măng."
      : "Complete range of industrial resistors: RXG20 braking resistors, BK6/BK12 motor starting resistors, ZX1/ZX12/ZX15 cabinet resistors. Serving cranes, conveyors, elevators, steel, cement industries.",
    keywords: ["điện trở công nghiệp", "điện trở xả", "điện trở khởi động", "RXG20", "BK6", "ZX1", "NEWARE Vietnam"],
  };
}

export default async function ResistorsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ResistorsClient
      routes={vietnamProductRoutes}
      products={vietnamProducts}
      locale={locale}
    />
  );
}
