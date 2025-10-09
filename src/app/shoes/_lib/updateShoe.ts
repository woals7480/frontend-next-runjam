import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import { ShoeModel } from "@/model/Shoe";
import toast from "react-hot-toast";

export async function updateShoe(
  id: string,
  body: Partial<Pick<ShoeModel, "brand" | "model" | "nickname">>
) {
  const url = `/api/shoes/${id}`;

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
