import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import toast from "react-hot-toast";

type Props = {
  id: string;
  body: { runId: string };
};

export async function linkRunToShoe({ id, body }: Props) {
  const url = `/api/shoes/${id}/mileages`;

  const res = await fetchWithRefresh(url, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.message ?? "신발 연결에 실패하였습니다.";
    toast.error(message);
    throw new Error(message);
  }
  return data;
}
