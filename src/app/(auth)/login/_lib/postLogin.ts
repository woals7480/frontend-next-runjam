import toast from "react-hot-toast";

type Props = {
  email: string;
  password: string;
};

// 프록시 라우트로 호출하여 프론트 도메인에 쿠키를 재세팅
export async function postLogin({ email, password }: Props) {
  const url = "/api/auth/login";

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });
  } catch (e) {
    toast.error("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    throw e;
  }

  // 응답을 JSON으로 변환 (성공/실패 공통)
  let data = null;
  try {
    data = await res.json();
  } catch {
    // 바디가 없을 수도 있으니 조용히 무시
  }

  if (!res.ok) {
    const message =
      data?.message ?? "로그인 실패. 이메일/비밀번호를 확인해주세요.";
    toast.error(message);
    throw new Error(message);
  }

  // 프록시가 { user } 형태로 돌려준다고 가정
  return data?.user ?? null;
}
