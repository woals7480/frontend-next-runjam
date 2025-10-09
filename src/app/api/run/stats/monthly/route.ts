// app/api/run/stats/monthly/route.ts
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // ✅ 쿠키/헤더를 고려해 항상 동적 처리
export const revalidate = 0; // ✅ 캐시 방지 (보강)

export async function GET(req: NextRequest) {
  const API = process.env.NEXT_PUBLIC_API_URL!;
  const AT = process.env.COOKIE_NAME_AT!;
  const url = `${API}/run/stats/monthly`;
  const at = req.cookies.get(AT)?.value;
  if (!at) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const apiRes = await fetch(url, {
    method: "GET",
    headers: { Cookie: `${AT}=${encodeURIComponent(at)}` },
    cache: "no-store",
  });

  const data = await apiRes.json().catch(() => null);
  return NextResponse.json(data, { status: apiRes.status });
}
