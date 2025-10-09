// app/api/shoes/_lib.ts
import { NextRequest, NextResponse } from "next/server";

export const API = process.env.NEXT_PUBLIC_API_URL!;
export const AT = process.env.COOKIE_NAME_AT!;

export function makeBackendUrl(path: string, req: NextRequest) {
  const u = new URL(path, API);
  req.nextUrl.searchParams.forEach((v, k) => u.searchParams.set(k, v));
  return u.toString();
}

export function forwardHeaders(req: NextRequest, extra?: HeadersInit) {
  const headers = new Headers(extra);
  const at = req.cookies.get(AT)?.value;
  if (at) headers.set("cookie", `${AT}=${encodeURIComponent(at)}`);
  return headers;
}

export async function passthroughJson(apiRes: Response) {
  let data = null;
  try {
    data = await apiRes.json();
  } catch {}
  return NextResponse.json(data, { status: apiRes.status });
}
