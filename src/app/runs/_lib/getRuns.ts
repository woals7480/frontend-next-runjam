import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import toast from "react-hot-toast";

type Props = {
  cursor?: string | null;
};

export async function getRuns({ cursor }: Props) {
  const api = process.env.NEXT_PUBLIC_API_URL!;
  const url = new URL("/run", api);
  if (cursor) url.searchParams.set("cursor", cursor);

  const res = await fetchWithRefresh(url, {
    next: { tags: ["runs"] },
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    const message = "달리기기록 불러오기를 실패하였습니다.";
    toast.error(message);
    throw new Error(message);
  }

  return data;
}
