// app/api/run/stats/overall/route.ts
import { NextRequest } from "next/server";
import { makeBackendUrl, forwardHeaders, passthroughJson } from "../../_lib";

export async function GET(req: NextRequest) {
  const url = makeBackendUrl("/run/stats/overall", req);
  const apiRes = await fetch(url, {
    method: "GET",
    headers: forwardHeaders(req),
    cache: "no-store",
  });
  return passthroughJson(apiRes);
}
