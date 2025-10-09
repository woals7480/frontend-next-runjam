// app/api/shoes/mileages/[mileageId]/route.ts
import {
  makeBackendUrl,
  forwardHeaders,
  passthroughJson,
} from "@/app/api/run/_lib";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { mileageId: string } }
) {
  const url = makeBackendUrl(`/shoes/mileages/${params.mileageId}`, req);
  const apiRes = await fetch(url, {
    method: "POST",
    headers: forwardHeaders(req),
    cache: "no-store",
  });
  return passthroughJson(apiRes);
}
