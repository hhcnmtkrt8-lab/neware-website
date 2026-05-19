import { NextResponse } from "next/server";
import { sqlite } from "@/lib/db";
import { signToken, createAuthCookie, verifyPassword } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: Request) {
  try {
    // Rate limiting: max 5 attempts per minute per IP
    const ip = getClientIp(request);
    const rl = rateLimit(`login:${ip}`, 5, 60000);
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { username, password } = result.data;

    // Check against env vars first, then DB
    const envUsername = process.env.ADMIN_USERNAME;
    const envPassword = process.env.ADMIN_PASSWORD;

    let authenticated = false;

    if (envUsername && envPassword && username === envUsername && password === envPassword) {
      authenticated = true;
    } else {
      // Fallback to DB lookup
      const stmt = sqlite.prepare(`SELECT * FROM admins WHERE username = ?`);
      const admin = stmt.get(username) as { id: number; username: string; password: string } | undefined;

      if (admin) {
        const passwordMatch = await verifyPassword(password, admin.password);
        if (passwordMatch) {
          authenticated = true;
        }
      }
    }

    if (!authenticated) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT and set httpOnly cookie
    const token = await signToken({ username });
    const cookie = createAuthCookie(token);

    const response = NextResponse.json({ success: true, username });
    response.cookies.set(cookie);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
