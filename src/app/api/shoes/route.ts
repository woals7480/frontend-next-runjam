// app/api/shoes/route.ts
import { NextRequest } from "next/server";
import { makeBackendUrl, forwardHeaders, passthroughJson } from "./_lib";

export async function GET(req: NextRequest) {
  const url = makeBackendUrl("/shoes", req);
  const apiRes = await fetch(url, {
    method: "GET",
    headers: forwardHeaders(req),
    cache: "no-store",
  });
  return passthroughJson(apiRes);
}

export async function POST(req: NextRequest) {
  const url = makeBackendUrl("/shoes", req);
  const body = await req.text();
  const apiRes = await fetch(url, {
    method: "POST",
    headers: { ...forwardHeaders(req, { "content-type": "application/json" }) },
    body,
    cache: "no-store",
  });
  return passthroughJson(apiRes);
}
