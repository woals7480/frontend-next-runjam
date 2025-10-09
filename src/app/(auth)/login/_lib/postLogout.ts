import toast from "react-hot-toast";

export async function postLogout() {
  const url = "/api/auth/logout"; // ✅ 백엔드 직접 호출 X, 프론트 프록시 O

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      cache: "no-store", // 캐시 방지
      // credentials: "include" 불필요 (서버가 Set-Cookie로 프론트 도메인에 바로 삭제 적용)
    });
  } catch (e) {
    toast.error("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    throw e;
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // 바디가 없을 수도 있으니 무시
  }

  if (!res.ok) {
    const message = data?.message ?? "로그아웃에 실패하였습니다.";
    toast.error(message);
    throw new Error(message);
  }

  // 프록시가 { ok: true } 형태로 응답한다고 가정
  return data ?? { ok: true };
}
