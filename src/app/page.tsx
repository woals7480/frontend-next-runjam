"use client";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as ui from "@/app/_styles/ui.css";
import { getUserMe } from "./(auth)/login/_lib/getUserMe";
import { useAuthStore } from "@/store/auth";

export default function Home() {
  const router = useRouter();
  const qc = useQueryClient();
  const authStore = useAuthStore();
  const { data } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getUserMe,
    retry: false,
  });

  const onLogout = async () => {
    // await post("/auth/logout", { method: "POST" });
    // await qc.invalidateQueries({ queryKey: ["auth", "me"] });
    // router.refresh();
  };

  return (
    <main className={ui.page}>
      <div className={ui.card}>
        <h1 className={ui.h1}>RunJam</h1>
        {data ? (
          <>
            <p>
              <strong>환영합니다</strong> {data.nickname}
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <button className={ui.btn} onClick={() => router.push("/runs")}>
                내 달리기
              </button>
              <button className={ui.btn} onClick={() => router.push("/shoes")}>
                내 러닝화
              </button>
              <button className={ui.btn} onClick={onLogout}>
                로그아웃
              </button>
            </div>
          </>
        ) : (
          <>
            <p>로그인하여 러닝 기록을 시작하세요.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <button className={ui.btn} onClick={() => router.push("/login")}>
                로그인
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
