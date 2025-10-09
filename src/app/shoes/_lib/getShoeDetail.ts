import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import toast from "react-hot-toast";

export async function getShoeDetail(id: string, signal?: AbortSignal) {
  const url = `/api/shoes/${id}`;

  const res = await fetchWithRefresh(url, {
    method: "GET",
    next: { tags: ["shoe", id] },
    cache: "no-store",
    signal,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    if (res.status === 404 || (signal && signal.aborted)) {
      throw new Error("not-found-or-aborted");
    }
    const message = data?.message ?? "내 신발 불러오기를 실패하였습니다.";
    toast.error(message);
    throw new Error(message);
  }
  return data;
}
