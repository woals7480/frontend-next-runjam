import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import { ShoeModel } from "@/model/Shoe";
import toast from "react-hot-toast";

export async function createShoe(
  body: Pick<ShoeModel, "brand" | "model" | "nickname">
) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/shoes`;
  const res = await fetchWithRefresh(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    const message = data?.message ?? "신발 등록에 실패하였습니다.";
    toast.error(message);
    throw new Error(message);
  }

  return data;
}
