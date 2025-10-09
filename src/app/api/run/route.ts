// app/api/run/route.ts
import { NextRequest } from "next/server";
import { makeBackendUrl, forwardHeaders, passthroughJson } from "./_lib";

export async function GET(req: NextRequest) {
  const url = makeBackendUrl("/run", req);
  const apiRes = await fetch(url, {
    method: "GET",
    headers: forwardHeaders(req),
    cache: "no-store",
  });
  return passthroughJson(apiRes);
}

export async function POST(req: NextRequest) {
  const url = makeBackendUrl("/run", req);
  const body = await req.text(); // 원문 그대로 전달
  const apiRes = await fetch(url, {
    method: "POST",
    headers: {
      ...forwardHeaders(req, { "content-type": "application/json" }),
    },
    body,
    cache: "no-store",
  });
  return passthroughJson(apiRes);
}
