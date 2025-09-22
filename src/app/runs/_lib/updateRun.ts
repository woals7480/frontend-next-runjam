import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import { RunPayload } from "../_components/RunFormModal";
import toast from "react-hot-toast";

export async function updateRun(id: string, body: RunPayload) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/run/${id}`;
  const res = await fetchWithRefresh(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    toast.error(data?.message ?? "달리기기록 수정을 실패하였습니다.");
    throw new Error(data?.message ?? "달리기기록 수정을 실패하였습니다.");
  }

  return data;
}
