import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import toast from "react-hot-toast";
import { RunPayload } from "../_types/runForm";

export async function updateRun(id: string, body: RunPayload) {
  const url = `/api/run/${id}`; // ✅ 프록시 경유

  const res = await fetchWithRefresh(url, {
    method: "PATCH",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.message ?? "달리기기록 수정을 실패하였습니다.";
    toast.error(message);
    throw new Error(message);
  }
  return data;
}
