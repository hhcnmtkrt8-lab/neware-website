import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Prevent static generation
export const dynamic = "force-dynamic";

// Auth is enforced by middleware for GET
export async function GET() {
  try {
    const allContacts = await db.select("contacts");

    const stats = {
      total: allContacts.length,
      pending: allContacts.filter((c: { status: string }) => c.status === "pending").length,
      read: allContacts.filter((c: { status: string }) => c.status === "read").length,
      replied: allContacts.filter((c: { status: string }) => c.status === "replied").length,
    };

    return NextResponse.json({ contacts: allContacts, stats });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
