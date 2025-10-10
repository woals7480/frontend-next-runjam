// src/app/shoes/page.tsx
"use client";

import { useRouter } from "next/navigation";
import * as s from "./shoes.css";
import { useQuery } from "@tanstack/react-query";
import { getShoes } from "./_lib/getShoes";
import { ShoeModel } from "@/model/Shoe";
import ShoeCard from "./_components/ShoeCard";
import LoadingSpinner from "../_components/LoadingSpinner";

export default function ShoesPage() {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useQuery<ShoeModel[]>({
    queryKey: ["shoes"],
    queryFn: getShoes,
    staleTime: Infinity,
  });

  return (
    <main className={s.page}>
      <header className={s.header}>
        <button onClick={() => router.back()} aria-label="뒤로가기">
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
            <path
              d="M15 18l-6-6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <h2 className={s.title}>내 러닝화</h2>
        <button
          className={s.addBtn}
          onClick={() => router.push("/shoes/new")}
          aria-label="신발 추가"
          title="신발 추가"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </header>

      {isLoading && (
        <div className={s.centerBox} aria-busy="true">
          <LoadingSpinner size={60} stroke={4} />
          <p className={s.helperText}>내 러닝화 불러오는 중…</p>
        </div>
      )}

      {isError && (
        <div role="alert" style={{ padding: 12 }}>
          목록을 불러오지 못했습니다.{" "}
          <button onClick={() => refetch()}>다시 시도</button>
        </div>
      )}

      {data && data.length === 0 && (
        <div className={s.centerBox}>
          <p>아직 신발이 없어요. 첫 신발을 등록해보세요!</p>
        </div>
      )}

      {data && data.length > 0 && (
        <section className={s.list}>
          {data.map((sh) => (
            <ShoeCard key={sh.id} shoe={sh} />
          ))}
        </section>
      )}
    </main>
  );
}
