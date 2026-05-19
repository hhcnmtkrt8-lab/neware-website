import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contacts } from "@/lib/schema";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { z } from "zod";

const resourceSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  resourceId: z.enum(["selection-guide", "energy-roi", "precision-rd"]),
  locale: z.string().optional(),
});

const ALLOWED_RESOURCES = ["selection-guide", "energy-roi", "precision-rd"];

const resourceNames: Record<string, { zh: string; en: string }> = {
  "selection-guide": { zh: "电池测试设备选型指南", en: "Battery Testing Equipment Selection Guide" },
  "energy-roi": { zh: "能量回收技术ROI白皮书", en: "Energy Recovery Technology ROI Whitepaper" },
  "precision-rd": { zh: "高精度测试对R&D的影响", en: "Impact of High-Precision Testing on R&D" },
};

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`resource:${ip}`, 10, 60000);
  if (!rl.success) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const result = resourceSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { name, email, company, resourceId, locale } = result.data;
    const resourceName = resourceNames[resourceId] ?? { zh: resourceId, en: resourceId };
    const displayName = (locale === "zh" ? resourceName.zh : resourceName.en);

    await db.insert(contacts).values({
      name: name || email,
      email,
      company: company || null,
      product: displayName,
      message: `[Resource Download] ${displayName} (${locale === "zh" ? "中文" : "English"})`,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[API /resources] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
