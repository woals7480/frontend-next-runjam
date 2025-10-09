// app/api/shoes/[id]/mileages/route.ts
import { NextRequest } from "next/server";
import { makeBackendUrl, forwardHeaders, passthroughJson } from "../../_lib";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const url = makeBackendUrl(`/shoes/${params.id}/mileages`, req);
  const body = await req.text();
  const apiRes = await fetch(url, {
    method: "POST",
    headers: { ...forwardHeaders(req, { "content-type": "application/json" }) },
    body,
    cache: "no-store",
  });
  return passthroughJson(apiRes);
}
