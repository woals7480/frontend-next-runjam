import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import toast from "react-hot-toast";

export async function postLogout() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`;
  const res = await fetchWithRefresh(url, {
    method: "POST",
  });

  // 응답을 JSON으로 변환 (성공/실패 공통)
  const data = await res.json();

  if (!res.ok) {
    const message = data?.message ?? "로그아웃에 실패하였습니다.";
    toast.error(message);
    throw new Error(message);
  }

  return data;
}
