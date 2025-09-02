"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    console.log(email, password);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include", // ← 반드시 포함
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      setErr("로그인 실패. 이메일/비밀번호를 확인해주세요.");
      return;
    }
    // 성공: 쿠키 저장됨 → 원하는 페이지로 이동
    window.location.href = "/user";
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto space-y-3">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <button type="submit">로그인</button>
      {err && <p style={{ color: "red" }}>{err}</p>}
    </form>
  );
}
