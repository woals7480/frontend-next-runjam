// src/app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookieOptions } from "@/app/api/_lib/cookie";

export async function POST(_req: NextRequest) {
  const isProd = process.env.NODE_ENV === "production";
  const AT = process.env.COOKIE_NAME_AT!;
  const RT = process.env.COOKIE_NAME_RT!;
  const res = NextResponse.json({ ok: true });

  // 프론트 도메인의 쿠키를 제거
  res.cookies.set(AT, "", { ...cookieOptions(isProd), maxAge: 0 });
  res.cookies.set(RT, "", { ...cookieOptions(isProd), maxAge: 0 });
  return res;
}
