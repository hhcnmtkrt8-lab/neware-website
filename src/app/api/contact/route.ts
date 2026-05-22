import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { z } from "zod";

// Prevent static generation
export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  product: z.string().optional().nullable(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// PUBLIC: Anyone can submit a contact form (with rate limiting)
export async function POST(request: Request) {
  try {
    // Rate limiting: max 10 submissions per minute per IP
    const ip = getClientIp(request);
    const rl = rateLimit(`contact:${ip}`, 10, 60000);
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, company, phone, product, message } = result.data;

    await db.insert("contacts", {
      name,
      email,
      company: company || null,
      phone: phone || null,
      product: product || null,
      message,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PROTECTED by middleware: Only authenticated admins
export async function GET() {
  try {
    const results = await db.select("contacts");
    return NextResponse.json(results);
  } catch (error) {
    console.error("Contacts fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PROTECTED by middleware: Only authenticated admins
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await db.update("contacts", { status }, { id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PROTECTED by middleware: Only authenticated admins
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await db.delete("contacts", { id: Number(id) });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
