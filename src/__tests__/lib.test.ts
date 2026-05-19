import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { generateCsrfToken, verifyCsrfToken } from "@/lib/csrf";
import { rateLimit } from "@/lib/rate-limit";

describe("auth lib", () => {
  it("hashes and verifies password correctly", async () => {
    const password = "test-password-123";
    const hash = await hashPassword(password);
    expect(hash).not.toBe(password);
    expect(await verifyPassword(password, hash)).toBe(true);
    expect(await verifyPassword("wrong", hash)).toBe(false);
  });
});

describe("csrf lib", () => {
  it("generates and verifies a valid token", () => {
    const token = generateCsrfToken("admin");
    expect(verifyCsrfToken(token, "admin")).toBe(true);
    expect(verifyCsrfToken(token, "other")).toBe(false);
    expect(verifyCsrfToken("", "admin")).toBe(false);
    expect(verifyCsrfToken("invalid", "admin")).toBe(false);
  });
});

describe("rate-limit lib", () => {
  it("allows requests within limit", () => {
    const key = `test:${Date.now()}`;
    const result = rateLimit(key, 3, 60000);
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it("blocks requests over limit", () => {
    const key = `test-block:${Date.now()}`;
    for (let i = 0; i < 3; i++) rateLimit(key, 2, 60000);
    const result = rateLimit(key, 2, 60000);
    expect(result.success).toBe(false);
  });
});
