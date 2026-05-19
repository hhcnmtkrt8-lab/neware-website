import { Client } from "@notionhq/client";

if (!process.env.NOTION_TOKEN) {
  console.warn("[Notion] NOTION_TOKEN not set — falling back to static data.");
}

export const notion = new Client({
  auth: process.env.NOTION_TOKEN ?? "",
});

export const NOTION_PRODUCTS_DB = process.env.NOTION_PRODUCTS_DB ?? "";
export const NOTION_SOLUTIONS_DB = process.env.NOTION_SOLUTIONS_DB ?? "";
export const NOTION_FAQ_DB = process.env.NOTION_FAQ_DB ?? "";
export const NOTION_RESOURCES_DB = process.env.NOTION_RESOURCES_DB ?? "";

export function isFullPage(page: unknown): boolean {
  return (page as Record<string, unknown>)?.object === "page";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getText(prop: any): string {
  if (!prop) return "";
  switch (prop.type) {
    case "title":
      return (prop.title as Array<{ plain_text: string }>)
        .map((t) => t.plain_text)
        .join("");
    case "rich_text":
      return (prop.rich_text as Array<{ plain_text: string }>)
        .map((t) => t.plain_text)
        .join("");
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
