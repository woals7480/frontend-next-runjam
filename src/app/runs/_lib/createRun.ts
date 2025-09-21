import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import { RunPayload } from "../_components/RunFormModal";
import toast from "react-hot-toast";

export async function createRun(body: RunPayload) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/run`;
  const res = await fetchWithRefresh(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    toast.error(data?.message ?? "달리기기록 등록에 실패하였습니다.");
    throw new Error(data?.message ?? "달리기기록 등록에 실패하였습니다.");
  }

  return data;
}
