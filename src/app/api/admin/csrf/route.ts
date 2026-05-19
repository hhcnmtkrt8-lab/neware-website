import { NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { generateCsrfToken } from "@/lib/csrf";

export async function GET(request: Request) {
  try {
    const sessionCookie = request.headers.get("cookie") ?? "";
    const sessionToken = sessionCookie
      .split(";")
      .find((c) => c.trim().startsWith(`${COOKIE_NAME}=`))
      ?.split("=")[1];

    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await verifyToken(sessionToken);
    if (!session) {
      return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });
    }

    const token = generateCsrfToken(session.username);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("CSRF token error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
