// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.method === "OPTIONS") return NextResponse.next();

  const url = req.nextUrl;

  const AT = process.env.COOKIE_NAME_AT;
  const RT = process.env.COOKIE_NAME_RT;
  if (!(AT && RT)) {
    // env 누락 시 로그인으로
    return redirectToLogin(url);
  }

  const access = req.cookies.get(AT)?.value ?? null;
  const refresh = req.cookies.get(RT)?.value ?? null;

  // RT 없으면 로그인
  if (!refresh) return redirectToLogin(url);

  // AT 있으면 통과
  if (access) return NextResponse.next();

  // AT 없고 RT는 있으면 -> 내부 refresh 라우트 호출 (절대경로 + RT를 Cookie 헤더로 전달)
  try {
    const refreshUrl = new URL("/api/auth/refresh", req.nextUrl.origin);
    const res = await fetch(refreshUrl, {
      method: "POST",
      headers: {
        // ✅ 미들웨어 fetch는 사용자의 쿠키가 자동 전파되지 않음 → 직접 실어보냄
        cookie: `${RT}=${encodeURIComponent(refresh)}`,
      },
      cache: "no-store",
    });

    // /api/auth/refresh 는 AT를 Set-Cookie로 내려줌 (body { ok: true })
    if (!res.ok) return redirectToLogin(url);

    // 여기서 굳이 accessToken 바디를 읽어 쿠키를 다시 세팅할 필요 없음
    // (이미 라우트가 Set-Cookie 해줬음)
    return NextResponse.next();
  } catch {
    return redirectToLogin(url);
  }
}

function redirectToLogin(url: URL) {
  const login = new URL("/login", url);
  login.searchParams.set("redirect", url.pathname + url.search);
  return NextResponse.redirect(login);
}

export const config = {
  // 보호할 페이지만 매칭 (API와 /login은 제외되어 무한루프 없음)
  matcher: ["/runs/:path*", "/shoes/:path*"],
};
