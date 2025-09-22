// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const isProd = process.env.NODE_ENV === "production";
  const accessCookieName = process.env.NEXT_PUBLIC_COOKIE_NAME_AT;
  const refreshCookieName = process.env.NEXT_PUBLIC_COOKIE_NAME_RT;
  if (!(accessCookieName && refreshCookieName)) {
    const login = new URL("/login", url);
    login.searchParams.set("redirect", url.pathname + url.search);
    return NextResponse.redirect(login);
  }
  const access = req.cookies.get(accessCookieName)?.value ?? null;
  const refresh = req.cookies.get(refreshCookieName)?.value ?? null;
  if (!refresh) {
    const login = new URL("/login", url);
    login.searchParams.set("redirect", url.pathname + url.search);
    return NextResponse.redirect(login);
  }
  // RT는 있는데 AT만 없으면 재발급 시도
  if (!access && refresh) {
    try {
      const { accessToken } = await getAccessToken(refresh);
      // 새 AT를 쿠키로 심고 통과
      const res = NextResponse.next();
      // 필요 시 옵션 조정: secure, httpOnly, sameSite, path, maxAge 등
      res.cookies.set(accessCookieName, accessToken, {
        path: "/",
        httpOnly: true,
        sameSite: isProd ? "none" : "lax",
        maxAge: 15 * 60,
        secure: isProd,
      });
      return res;
    } catch (e) {
      // 재발급 실패 → 로그인
      const login = new URL("/login", url);
      login.searchParams.set("redirect", url.pathname + url.search);
      return NextResponse.redirect(login);
    }
  }
  // 기본 통과
  return NextResponse.next();
}

export const config = {
  matcher: ["/runs/:path*"],
};

// ---- 내부 유틸 ----
// 서버 fetch는 브라우저 쿠키를 자동으로 안 보냄 → Cookie 헤더 수동 첨부가 핵심
async function getAccessToken(
  refreshToken: string
): Promise<{ accessToken: string }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      Cookie: `runjam_rt=${encodeURIComponent(refreshToken)}`,
    },
  });

  const data = await res.json();

  if (!res.ok || !data?.accessToken) {
    throw new Error(data?.message ?? "accessToken 재발급 실패");
  }
  return { accessToken: data.accessToken as string };
}
