// Next 14/15 기준 ResponseCookie 타입
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

// name/value/expires는 set에서 채우므로 제외
type CookieBase = Omit<ResponseCookie, "name" | "value" | "expires">;

export function cookieOptions(isProd: boolean): CookieBase {
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: (isProd ? "none" : "lax") as "none" | "lax",
    path: "/",
  };
}
