// middleware.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const url = req.nextUrl;
  if (req.method === "OPTIONS") return NextResponse.next();

  const isProd = process.env.NODE_ENV === "production";
  const accessCookieName =
    process.env.COOKIE_NAME_AT ?? process.env.NEXT_PUBLIC_COOKIE_NAME_AT;
  const refreshCookieName =
    process.env.COOKIE_NAME_RT ?? process.env.NEXT_PUBLIC_COOKIE_NAME_RT;
  // env 미설정 → 로그인
  if (!(accessCookieName && refreshCookieName)) {
    const login = new URL("/login", url);
    login.searchParams.set("redirect", url.pathname + url.search);
    return NextResponse.redirect(login);
  }

  const access = cookieStore.get(accessCookieName)?.value ?? null;
  const refresh = cookieStore.get(refreshCookieName)?.value ?? null;
  console.log(access);
  console.log(refresh);

  // RT 없으면 로그인
  if (!refresh) {
    const login = new URL("/login", url);
    login.searchParams.set("redirect", url.pathname + url.search);
    return NextResponse.redirect(login);
  }

  // RT는 있는데 AT만 없으면 재발급 시도
  if (!access && refresh) {
    try {
      const { accessToken } = await getAccessToken(refresh, refreshCookieName);
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

// ---- 내부 유틸 ----
async function getAccessToken(
  refreshToken: string,
  refreshCookieName: string
): Promise<{ accessToken: string }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      Cookie: `${refreshCookieName}=${encodeURIComponent(refreshToken)}`,
    },
  });
  let data = null;
  try {
    data = await res.json();
  } catch {}
  if (!res.ok || !(data && data.accessToken)) {
    throw new Error((data && data.message) ?? "accessToken 재발급 실패");
  }
  return { accessToken: data.accessToken as string };
}
