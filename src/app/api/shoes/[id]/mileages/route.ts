// app/api/shoes/[id]/mileages/route.ts
import { NextRequest, NextResponse } from "next/server";

const API = process.env.NEXT_PUBLIC_API_URL!;
const AT = process.env.COOKIE_NAME_AT!;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const at = req.cookies.get(AT)?.value;
  if (!at) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const url = `${API}/shoes/${id}/mileages`;
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
