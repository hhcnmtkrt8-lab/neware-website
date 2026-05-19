import { notion, NOTION_PRODUCTS_DB, isFullPage, getText } from "./notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface NotionProduct {
  id: string;
  name: string;
  nameEn: string;
  keywords: string;
  keywordsEn: string;
  voltage: string;
  current: string;
  accuracy: string;
  samplingRate: string;
  channels: string;
  application: string;
  applicationEn: string;
  description: string;
  descriptionEn: string;
  routeId: string;
  minPulseWidth?: string;
  ranges?: string;
  resolution?: string;
  software?: string;
  energySaving?: string;
}

function getPropText(
  props: PageObjectResponse["properties"],
  key: string
): string {
  const prop = props[key];
  if (!prop) return "";
  switch (prop.type) {
    case "title":
      return prop.title.map((t) => t.plain_text).join("");
    case "rich_text":
      return prop.rich_text.map((t) => t.plain_text).join("");
    case "select":
      return prop.select?.name ?? "";
    case "number":
      return prop.number?.toString() ?? "";
    case "url":
      return prop.url ?? "";
    case "email":
      return prop.email ?? "";
    case "phone_number":
      return prop.phone_number ?? "";
    case "checkbox":
      return prop.checkbox ? "true" : "false";
    default:
      return "";
  }
}

export async function getNotionProducts(): Promise<NotionProduct[] | null> {
  if (!NOTION_PRODUCTS_DB || !process.env.NOTION_TOKEN) {
    return null;
  }

  try {
    // Notion SDK v5 removed databases.query() — use search() instead
    const response = await notion.search({
      query: "",
      filter: { value: "page", property: "object" },
      sort: { direction: "ascending", timestamp: "last_edited_time" },
      page_size: 100,
    });

    const pages = response.results.filter(
      (r): r is PageObjectResponse => isFullPage(r)
    );

    return pages
      .map((page): NotionProduct => {
        const props = page.properties;
        return {
          id: page.id,
          name: getPropText(props, "Name"),
          nameEn: getPropText(props, "NameEn"),
          keywords: getPropText(props, "Keywords"),
          keywordsEn: getPropText(props, "KeywordsEn"),
          voltage: getPropText(props, "Voltage"),
          current: getPropText(props, "Current"),
          accuracy: getPropText(props, "Accuracy"),
          samplingRate: getPropText(props, "SamplingRate"),
          channels: getPropText(props, "Channels"),
          application: getPropText(props, "Application"),
          applicationEn: getPropText(props, "ApplicationEn"),
          description: getPropText(props, "Description"),
          descriptionEn: getPropText(props, "DescriptionEn"),
          routeId: getPropText(props, "RouteId"),
          minPulseWidth: getPropText(props, "MinPulseWidth") || undefined,
          ranges: getPropText(props, "Ranges") || undefined,
          resolution: getPropText(props, "Resolution") || undefined,
          software: getPropText(props, "Software") || undefined,
          energySaving: getPropText(props, "EnergySaving") || undefined,
        };
      });
  } catch (err) {
    console.error("[Notion] Failed to fetch products:", err);
    return null;
  }
}

export async function getNotionProduct(id: string): Promise<NotionProduct | null> {
  if (!process.env.NOTION_TOKEN) {
    return null;
  }

  try {
    const page = (await notion.pages.retrieve({ page_id: id })) as PageObjectResponse;
    const props = page.properties;
    return {
      id: page.id,
      name: getPropText(props, "Name"),
      nameEn: getPropText(props, "NameEn"),
      keywords: getPropText(props, "Keywords"),
      keywordsEn: getPropText(props, "KeywordsEn"),
      voltage: getPropText(props, "Voltage"),
      current: getPropText(props, "Current"),
      accuracy: getPropText(props, "Accuracy"),
      samplingRate: getPropText(props, "SamplingRate"),
      channels: getPropText(props, "Channels"),
      application: getPropText(props, "Application"),
      applicationEn: getPropText(props, "ApplicationEn"),
      description: getPropText(props, "Description"),
      descriptionEn: getPropText(props, "DescriptionEn"),
      routeId: getPropText(props, "RouteId"),
    };
  } catch (err) {
    console.error(`[Notion] Failed to fetch product ${id}:`, err);
    return null;
  }
}

export function notionProductToProduct(np: NotionProduct) {
  return {
    id: np.id,
    routeId: np.routeId,
    name: np.name,
    nameEn: np.nameEn,
    keywords: np.keywords,
    keywordsEn: np.keywordsEn,
    voltage: np.voltage,
    current: np.current,
    accuracy: np.accuracy,
    samplingRate: np.samplingRate,
    channels: np.channels,
    application: np.application,
    applicationEn: np.applicationEn,
    description: np.description,
    descriptionEn: np.descriptionEn,
    minPulseWidth: np.minPulseWidth,
    ranges: np.ranges,
    resolution: np.resolution,
    software: np.software,
    energySaving: np.energySaving,
  };
}
