import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import toast from "react-hot-toast";

type Props = { cursor?: string | null };

export async function getRuns({ cursor }: Props) {
  const params = new URLSearchParams();
  if (cursor) params.set("cursor", cursor);

  const url = params.toString() ? `/api/run?${params}` : "/api/run"; // ✅ 프록시 경유

  const res = await fetchWithRefresh(url, {
    method: "GET",
    next: { tags: ["runs"] },
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.message ?? "달리기기록 불러오기를 실패하였습니다.";
    toast.error(message);
    throw new Error(message);
  }
  return data;
}
