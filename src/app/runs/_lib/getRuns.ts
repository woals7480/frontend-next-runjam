import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import toast from "react-hot-toast";

export async function getRuns() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/run`;
  const res = await fetchWithRefresh(url, {
    next: { tags: ["runs"] },
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    toast.error(data?.message ?? "달리기기록 불러오기를 실패하였습니다.");
    throw new Error(data?.message ?? "달리기기록 불러오기를 실패하였습니다.");
  }

  return data;
}
