// app/api/shoes/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

const API = process.env.NEXT_PUBLIC_API_URL!;
const AT = process.env.COOKIE_NAME_AT!;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const at = req.cookies.get(AT)?.value;
  if (!at) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const url = `${API}/shoes/${id}`;
  const apiRes = await fetch(url, {
    method: "GET",
    headers: {
      Cookie: `${AT}=${encodeURIComponent(at)}`,
    },
    cache: "no-store",
  });

  const data = await apiRes.json().catch(() => null);
  return NextResponse.json(data, { status: apiRes.status });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const at = req.cookies.get(AT)?.value;
  if (!at) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const url = `${API}/shoes/${id}`;
  const body = await req.text();
  const apiRes = await fetch(url, {
    method: "PATCH",
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const at = req.cookies.get(AT)?.value;
  if (!at) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const url = `${API}/shoes/${id}`;
  const apiRes = await fetch(url, {
    method: "DELETE",
    headers: { Cookie: `${AT}=${encodeURIComponent(at)}` },
    cache: "no-store",
  });

  const data = await apiRes.json().catch(() => null);
  return NextResponse.json(data, { status: apiRes.status });
}
