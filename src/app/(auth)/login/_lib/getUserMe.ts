import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import toast from "react-hot-toast";

export async function getUserMe() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/me`;
  const res = await fetchWithRefresh(url, {
    next: {
      tags: ["auth", "me"],
    },
  });

  // 응답을 JSON으로 변환 (성공/실패 공통)
  const data = await res.json();

  if (!res.ok) {
    // 서버에서 내려준 에러 메시지(data.message)를 우선적으로 사용
    toast.error(
      data?.message ?? "로그인 실패. 이메일/비밀번호를 확인해주세요."
    );
    throw new Error(
      data?.message ?? "로그인 실패. 이메일/비밀번호를 확인해주세요."
    );
  }

  return data;
}
