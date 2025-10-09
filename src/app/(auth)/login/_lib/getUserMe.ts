import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import toast from "react-hot-toast";

export async function getUserMe() {
  const url = "/api/auth/me"; // ✅ 백엔드 직접 호출 X, 프록시 O

  const res = await fetchWithRefresh(url, {
    next: { tags: ["auth", "me"] },
    cache: "no-store", // 권장: 캐시 방지
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.message ?? "내 정보 가져오기를 실패하였습니다.";
    toast.error(message);
    throw new Error(message);
  }

  return data;
}
