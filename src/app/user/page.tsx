"use client";

export default function UserPage() {
  const onClickUser = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("유저정보 가져오기 실패");
      return;
    }

    const data = await res.json();
    console.log(data);
  };

  const onClickAccessToken = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("토큰 재발급 실패");
      return;
    }

    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <div>
        <h2>유저정보</h2>
        <button onClick={onClickUser}>정보 가져오기</button>
        <button onClick={onClickAccessToken}>AccessToken 재발급</button>
      </div>
    </>
  );
}
