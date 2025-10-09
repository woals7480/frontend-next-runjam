import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import toast from "react-hot-toast";

type Props = { mileageId: string };

export async function unlinkRunShoe({ mileageId }: Props) {
  const url = `/api/shoes/mileages/${mileageId}`;

  const res = await fetchWithRefresh(url, {
    method: "POST", // 백엔드 스펙 유지 (DELETE가 아니라 POST였음)
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.message ?? "신발 해제에 실패하였습니다.";
    toast.error(message);
    throw new Error(message);
  }
  return data;
}
