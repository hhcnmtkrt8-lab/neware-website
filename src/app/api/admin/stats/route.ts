import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contacts } from "@/lib/schema";
import { desc, sql } from "drizzle-orm";

// Auth is enforced by middleware for GET
export async function GET() {
  try {
    const allContacts = await db.select().from(contacts).orderBy(desc(contacts.createdAt));

    const statsResult = await db.select({
      total: sql<number>`count(*)`,
      pending: sql<number>`sum(case when ${contacts.status} = 'pending' then 1 else 0 end)`,
      read: sql<number>`sum(case when ${contacts.status} = 'read' then 1 else 0 end)`,
      replied: sql<number>`sum(case when ${contacts.status} = 'replied' then 1 else 0 end)`,
    }).from(contacts);

    const stats = statsResult[0] || { total: 0, pending: 0, read: 0, replied: 0 };

    return NextResponse.json({ contacts: allContacts, stats });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
