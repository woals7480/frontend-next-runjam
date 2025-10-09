// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookieOptions } from "@/app/api/_lib/cookie";

export async function POST(req: NextRequest) {
  const isProd = process.env.NODE_ENV === "production";
  const API = process.env.NEXT_PUBLIC_API_URL!;
  const AT = process.env.COOKIE_NAME_AT!;
  const RT = process.env.COOKIE_NAME_RT!;

  const body = await req.json();

  const apiRes = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    // 서버-서버 통신이므로 credentials 불필요
    cache: "no-store",
  });

  const data = await apiRes.json().catch(() => null);

  if (!apiRes.ok || !data) {
    return NextResponse.json(
      { message: data?.message ?? "Login failed" },
      { status: apiRes.status || 400 }
    );
  }

  // ★ 여기서 프론트 도메인에 쿠키를 '다시' 심는다.
  const res = NextResponse.json({ user: data.user ?? null });

  if (data.accessToken) {
    res.cookies.set(AT, data.accessToken, {
      ...cookieOptions(isProd),
      maxAge: 15 * 60,
    });
  }
  if (data.refreshToken) {
    res.cookies.set(RT, data.refreshToken, {
      ...cookieOptions(isProd),
      maxAge: 7 * 24 * 60 * 60,
    });
  }

  return res;
}
