import createNextIntlMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./src/i18n/request";
import { NextRequest, NextResponse } from "next/server";
import { getAuthFromRequest } from "./src/lib/auth";

const intlMiddleware = createNextIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

// Routes that require admin authentication
const PROTECTED_API_PATTERNS = [
  { path: "/api/admin/stats", methods: ["GET"] },
  { path: "/api/admin/logout", methods: ["POST"] },
  { path: "/api/contact", methods: ["GET", "PATCH", "DELETE"] },
];

function isProtectedRoute(pathname: string, method: string): boolean {
  return PROTECTED_API_PATTERNS.some(
    (p) => pathname.startsWith(p.path) && p.methods.includes(method)
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle API auth protection
  if (pathname.startsWith("/api/")) {
    const method = request.method;

    if (isProtectedRoute(pathname, method)) {
      const auth = await getAuthFromRequest(request);
      if (!auth) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }
    }

    // Let API routes handle their own logic
    return NextResponse.next();
  }

  // Handle i18n routing for non-API routes
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)", "/api/:path*"],
};
