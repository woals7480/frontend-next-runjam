import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import toast from "react-hot-toast";

type Props = {
  mileageId: string;
};

export async function unlinkRunShoe({ mileageId }: Props) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/shoes/mileages/${mileageId}`;
  const res = await fetchWithRefresh(url, {
    method: "POST",
  });

  const data = await res.json();

  if (!res.ok) {
    const message = data?.message ?? "신발 해제에 실패하였습니다.";
    toast.error(message);
    throw new Error(message);
  }

  return data;
}
