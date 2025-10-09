// app/api/shoes/route.ts
import { NextRequest, NextResponse } from "next/server";

const API = process.env.NEXT_PUBLIC_API_URL!;
const AT = process.env.COOKIE_NAME_AT!;
const url = `${API}/shoes`;

export async function GET(req: NextRequest) {
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

export async function POST(req: NextRequest) {
  const at = req.cookies.get(AT)?.value;
  if (!at) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.text();
  const apiRes = await fetch(url, {
    method: "POST",
    headers: {
      Cookie: `${AT}=${encodeURIComponent(at)}`,
      "content-type": "application/json",
    },
    body,
    cache: "no-store",
  });

  const data = await apiRes.json().catch(() => null);
  return NextResponse.json(data, { status: apiRes.status });
}
