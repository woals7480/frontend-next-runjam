// app/api/run/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

const API = process.env.NEXT_PUBLIC_API_URL!;
const AT = process.env.COOKIE_NAME_AT!;

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const at = req.cookies.get(AT)?.value;
  if (!at) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const url = `${API}/run/${id}`;
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
  const url = `${API}/run/${id}`;
  const apiRes = await fetch(url, {
    method: "DELETE",
    headers: { Cookie: `${AT}=${encodeURIComponent(at)}` },
    cache: "no-store",
  });

  const data = await apiRes.json().catch(() => null);
  return NextResponse.json(data, { status: apiRes.status });
}

// (선택) 상세 조회가 필요하면 주석 해제
// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//   const url = makeBackendUrl(`/run/${params.id}`, req);
//   const apiRes = await fetch(url, {
//     method: "GET",
//     headers: forwardHeaders(req),
//     cache: "no-store",
//   });
//   return passthroughJson(apiRes);
// }
