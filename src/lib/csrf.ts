import { createHmac } from "crypto";

const CSRF_SECRET = process.env.SESSION_SECRET ?? "csrf-fallback-secret";
const ALGORITHM = "sha256";

export function generateCsrfToken(sessionId: string): string {
  const timestamp = Math.floor(Date.now() / 1000);
  const payload = `${sessionId}:${timestamp}`;
  const signature = createHmac(ALGORITHM, CSRF_SECRET).update(payload).digest("hex");
  return `${timestamp}.${signature}`;
}

export function verifyCsrfToken(token: string, sessionId: string): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Tokens older than 1 hour are invalid
  const maxAge = 3600;
  if (Date.now() / 1000 - timestamp > maxAge) return false;

  const expectedPayload = `${sessionId}:${timestampStr}`;
  const expectedSignature = createHmac(ALGORITHM, CSRF_SECRET)
    .update(expectedPayload)
    .digest("hex");

  return signature === expectedSignature;
}

export function getCsrfTokenFromHeaders(headers: Headers): string | null {
  // Check X-CSRF-Token header (custom header)
  const custom = headers.get("x-csrf-token");
  if (custom) return custom;
  // Check X-CSRF-Token in Content-Type is form-encoded
  const contentType = headers.get("content-type") ?? "";
  return null;
}
