import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import toast from "react-hot-toast";

export async function getShoeDetail(id: string, signal?: AbortSignal) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/shoes/${id}`;

  const res = await fetchWithRefresh(url, {
    next: { tags: ["shoe", id] },
    method: "GET",
    signal,
  });

  const data = await res.json();

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
