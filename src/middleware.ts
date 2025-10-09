// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const cookie = req.cookies;
  const url = req.nextUrl;
  if (req.method === "OPTIONS") return NextResponse.next();

  const isProd = process.env.NODE_ENV === "production";
  const accessCookieName =
    process.env.COOKIE_NAME_AT ?? process.env.COOKIE_NAME_AT;
  const refreshCookieName =
    process.env.COOKIE_NAME_RT ?? process.env.COOKIE_NAME_RT;
  // env 미설정 → 로그인
  if (!(accessCookieName && refreshCookieName)) {
    const login = new URL("/login", url);
    login.searchParams.set("redirect", url.pathname + url.search);
    return NextResponse.redirect(login);
  }

  const access = cookie.get(accessCookieName)?.value ?? null;
  const refresh = cookie.get(refreshCookieName)?.value ?? null;

  // RT 없으면 로그인
  if (!refresh) {
    const login = new URL("/login", url);
    login.searchParams.set("redirect", url.pathname + url.search);
    return NextResponse.redirect(login);
  }

  // RT는 있는데 AT만 없으면 재발급 시도
  if (!access && refresh) {
    try {
      const { accessToken } = await getAccessTokenViaProxy(url.origin);
      const res = NextResponse.next();

      res.cookies.set(accessCookieName, accessToken, {
        path: "/",
        httpOnly: true,
        sameSite: isProd ? "none" : "lax",
        secure: isProd,
        maxAge: 15 * 60,
      });
      return res;
    } catch (e) {
      const login = new URL("/login", url);
      login.searchParams.set("redirect", url.pathname + url.search);
      return NextResponse.redirect(login);
    }
  }

  // 기본 통과
  return NextResponse.next();
}

export const config = {
  matcher: ["/runs/:path*", "/shoes/:path*"],
};

async function getAccessTokenViaProxy(
  origin: string
): Promise<{ accessToken: string }> {
  const res = await fetch(`${origin}/api/auth/refresh`, {
    method: "POST",
    cache: "no-store", // ⬅️ 캐시 방지
  });

  let data = null;
  try {
    data = await res.json();
  } catch {}

  if (!res.ok || !(data && data.ok !== false)) {
    throw new Error(data?.message ?? "accessToken 재발급 실패");
  }

  // /api/auth/refresh 라우트에서 AT를 쿠키로 이미 세팅하며,
  // 바디에는 { ok: true }만 내려줘도 되지만, 필요하면 accessToken도 내려줄 수 있음.
  // accessToken을 바디로 내려주도록 구현했다면 아래처럼 사용:
  if (!data?.accessToken) {
    // 바디에 accessToken을 안 내려주는 구현이라면, 쿠키만 믿고 빈 값 반환해도 OK.
    // 여기서는 재사용성을 위해 accessToken 키도 지원
    return { accessToken: data.accessToken ?? "" };
  }
  return { accessToken: data.accessToken as string };
}
