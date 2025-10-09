// app/api/run/[id]/route.ts
import { NextRequest } from "next/server";
import { makeBackendUrl, forwardHeaders, passthroughJson } from "../_lib";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const url = makeBackendUrl(`/run/${params.id}`, req);
  const body = await req.text();
  const apiRes = await fetch(url, {
    method: "PATCH",
    headers: {
      ...forwardHeaders(req, { "content-type": "application/json" }),
    },
    body,
    cache: "no-store",
  });
  return passthroughJson(apiRes);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const url = makeBackendUrl(`/run/${params.id}`, req);
  const apiRes = await fetch(url, {
    method: "DELETE",
    headers: forwardHeaders(req),
    cache: "no-store",
  });
  return passthroughJson(apiRes);
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
