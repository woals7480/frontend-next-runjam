// src/app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookieOptions } from "@/app/api/_lib/cookie";

export async function POST(req: NextRequest) {
  const isProd = process.env.NODE_ENV === "production";
  const API = process.env.NEXT_PUBLIC_API_URL!;
  const AT = process.env.COOKIE_NAME_AT!;
  const RT = process.env.COOKIE_NAME_RT!;

  // 프론트 도메인 쿠키에서 RT 읽기
  const rt = req.cookies.get(RT)?.value;
  if (!rt) {
    return NextResponse.json({ message: "No refresh token" }, { status: 401 });
  }

  // 백엔드에 RT를 쿠키로 전송
  const apiRes = await fetch(`${API}/auth/refresh`, {
    method: "POST",
    headers: { Cookie: `${RT}=${encodeURIComponent(rt)}` },
    cache: "no-store",
  });

  const data = await apiRes.json().catch(() => null);

  if (!apiRes.ok || !data?.accessToken) {
    return NextResponse.json(
      { message: data?.message ?? "Refresh failed" },
      { status: apiRes.status || 401 }
    );
  }

  // 프론트 도메인에 AT만 갱신
  const res = NextResponse.json({ ok: true });
  res.cookies.set(AT, data.accessToken, {
    ...cookieOptions(isProd),
    maxAge: 15 * 60,
  });

  return res;
}
