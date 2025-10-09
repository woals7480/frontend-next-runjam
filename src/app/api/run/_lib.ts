// app/api/run/_lib.ts
import { NextRequest, NextResponse } from "next/server";

export const API = process.env.NEXT_PUBLIC_API_URL!;
export const AT = process.env.COOKIE_NAME_AT!;

export function makeBackendUrl(path: string, req: NextRequest) {
  const u = new URL(path, API);
  // 쿼리 파스스루
  const q = req.nextUrl.searchParams;
  q.forEach((v, k) => u.searchParams.set(k, v));
  return u.toString();
}

export function forwardHeaders(req: NextRequest, extra?: HeadersInit) {
  const headers = new Headers(extra);
  // 필요 시 Content-Type 등 클라이언트 헤더를 일부 전달
  // const ct = req.headers.get("content-type");
  // if (ct) headers["content-type"] = ct;

  // 프론트 쿠키에서 AT 읽어서 백엔드로 전달
  const at = req.cookies.get(AT)?.value;
  if (at) {
    headers.set("cookie", `${AT}=${encodeURIComponent(at)}`); // ✅
  }
  return headers;
}

export async function passthroughJson(apiRes: Response) {
  let data = null;
  try {
    data = await apiRes.json();
  } catch {
    // JSON이 아닐 수도 있음
  }
  return NextResponse.json(data, { status: apiRes.status });
}
