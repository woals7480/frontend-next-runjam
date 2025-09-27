import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import toast from "react-hot-toast";

export async function deleteShoe(id: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/shoes/${id}`;
  const res = await fetchWithRefresh(url, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    const message = data?.message ?? "신발 삭제를 실패하였습니다.";
    toast.error(message);
    throw new Error(message);
  }

  return data;
}
