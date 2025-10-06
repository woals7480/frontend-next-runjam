import toast from "react-hot-toast";

type Props = {
  email: string;
  password: string;
  nickname: string;
};

export async function postSignup({ email, password, nickname }: Props) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password, nickname }),
  });

  // 응답을 JSON으로 변환 (성공/실패 공통)
  const data = await res.json();

  if (!res.ok) {
    // 서버에서 내려준 에러 메시지(data.message)를 우선적으로 사용
    const message =
      data?.message ?? "회원가입 실패. 이메일/비밀번호를 확인해주세요.";
    toast.error(message);
    throw new Error(message);
  }

  return data;
}
