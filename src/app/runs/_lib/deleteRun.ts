import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import toast from "react-hot-toast";

export async function deleteRun(id: string) {
  const url = `/api/run/${id}`; // ✅ 프록시 경유

  const res = await fetchWithRefresh(url, {
    method: "DELETE",
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.message ?? "달리기기록 삭제를 실패하였습니다.";
    toast.error(message);
    throw new Error(message);
  }
  return data;
}
