export async function deleteRun(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/run/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  // 응답을 JSON으로 변환 (성공/실패 공통)
  const data = await res.json();

  if (!res.ok) {
    // 서버에서 내려준 에러 메시지(data.message)를 우선적으로 사용
    throw new Error(
      data?.message ?? "로그인 실패. 이메일/비밀번호를 확인해주세요."
    );
  }

  return data;
}
