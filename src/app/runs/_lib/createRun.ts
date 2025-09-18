import { CreateRunPayload } from "../_components/RunFormModal";

export async function createRun(body: CreateRunPayload) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/run`, {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? "달리기기록 등록에 실패하였습니다.");
  }

  return data;
}
