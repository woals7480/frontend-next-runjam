// app/api/shoes/mileages/[mileageId]/route.ts
import { NextRequest, NextResponse } from "next/server";

const API = process.env.NEXT_PUBLIC_API_URL!;
const AT = process.env.COOKIE_NAME_AT!;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ mileageId: string }> }
) {
  const at = req.cookies.get(AT)?.value;
  if (!at) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { mileageId } = await params;
  const url = `${API}/shoes/mileages/${mileageId}`;

  const apiRes = await fetch(url, {
    method: "POST",
    headers: { Cookie: `${AT}=${encodeURIComponent(at)}` },
    cache: "no-store",
  });

  const data = await apiRes.json().catch(() => null);
  return NextResponse.json(data, { status: apiRes.status });
}
