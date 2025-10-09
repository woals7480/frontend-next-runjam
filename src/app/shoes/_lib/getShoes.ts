import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import toast from "react-hot-toast";

export async function getShoes() {
  const url = `/api/shoes`;

  const res = await fetchWithRefresh(url, {
    method: "GET",
    next: { tags: ["shoes"] },
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.message ?? "내 신발 불러오기를 실패하였습니다.";
    toast.error(message);
    throw new Error(message);
  }
  return data;
}
