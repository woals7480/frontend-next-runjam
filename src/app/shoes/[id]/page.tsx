// src/app/shoes/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import * as s from "./ShoeDetil.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getShoeDetail } from "../_lib/getShoeDetail";
import { ShoeDetailModel } from "@/model/Shoe";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import { pacePerKmSeconds, secondsToKorean } from "@/utils/time";
import clsx from "clsx";
import {
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import ConfirmModal from "@/app/_components/ConfirmModal";
import { deleteShoe } from "../_lib/deleteShoe";
import { colorFg } from "@/app/_styles/tokens.css";

export default function ShoeDetailPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError } = useQuery<ShoeDetailModel>({
    queryKey: ["shoe", id],
    queryFn: ({ signal }) => getShoeDetail(id as string, signal),
    staleTime: Infinity,
    retry: false,
    enabled: !!id,
  });

  const onClickdots = (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMenuOpen((v) => !v);
  };

  const deleteRuns = useMutation({
    mutationFn: deleteShoe,
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ["shoe", id], exact: true });
      queryClient.removeQueries({ queryKey: ["shoe", id], exact: true });
      await router.back();
      queryClient.invalidateQueries({ queryKey: ["shoes"], exact: true });
      queryClient.invalidateQueries({ queryKey: ["runs"], exact: true });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onClickDeleteRun = () => {
    deleteRuns.mutate(id);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const name =
    data?.nickname ?? (data ? `${data.brand} ${data.model}` : "신발");

  return (
    <main className={s.page}>
      <header className={s.header}>
        <button onClick={() => router.back()} aria-label="뒤로가기">
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </button>
        <div className={s.title}>{name}</div>
        <div className={s.menuWrapper} ref={menuRef}>
          <button aria-label="메뉴" onClick={onClickdots}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              aria-hidden
              fill={colorFg}
            >
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>
          <div
            className={clsx(s.menu, menuOpen && s.menuOpen)}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={s.item}
              onClick={() => router.push(`/shoes/${id}/edit`)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                width="20"
                height="20"
              >
                <path d="M12 20h9" strokeWidth="2" strokeLinecap="round" />
                <path
                  d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                  strokeWidth="2"
                />
              </svg>
              수정
            </button>
            <button className={s.item} onClick={() => openModal()}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                width="20"
                height="20"
              >
                <path d="M3 6h18" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 6V4h8v2" strokeWidth="2" />
                <path
                  d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"
                  strokeWidth="2"
                />
                <path d="M10 11v6M14 11v6" strokeWidth="2" />
              </svg>
              삭제
            </button>
          </div>
        </div>
      </header>
      {isLoading && (
        <div className={s.centerBox} aria-busy="true">
          <LoadingSpinner size={60} stroke={4} />
          <p className={s.helperText}>내 러닝화 불러오는 중…</p>
        </div>
      )}
      {isError && (
        <div style={{ padding: 16 }}>내 러닝화를 불러오지 못했습니다.</div>
      )}
      {data && (
        <div>
          <section className={s.hero}>
            <div className={s.kmNum}>{data.totalMileage}</div>
            <span className={s.kmUnit}>KM</span>
            <svg
              className={s.shoeGhost}
              viewBox="0 -960 960 960"
              width="32px"
              fill={colorFg}
            >
              <path d="M216-580q39 0 74 14t64 41l382 365h24q17 0 28.5-11.5T800-200q0-8-1.5-17T788-235L605-418l-71-214-74 18q-38 10-69-14t-31-63v-84l-28-14-154 206q-1 1-1 1.5t-1 1.5h40Zm0 80h-46q3 7 7.5 13t10.5 11l324 295q11 11 25 16t29 5h54L299-467q-17-17-38.5-25t-44.5-8ZM566-80q-30 0-57-11t-50-31L134-417q-46-42-51.5-103T114-631l154-206q17-23 45.5-30.5T368-861l28 14q21 11 32.5 30t11.5 42v84l74-19q30-8 58 7.5t38 44.5l65 196 170 170q20 20 27.5 43t7.5 49q0 50-35 85t-85 35H566Z" />
            </svg>
          </section>
          <section className={s.section}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>
              {name}
            </div>
            <div className={s.card}>
              <div>
                <div className={s.statNum}>{data.stats.runCount}</div>
                <div className={s.statLabel}>러닝</div>
              </div>
              <div>
                <div className={s.statNum}>
                  {pacePerKmSeconds(
                    data.stats.totalDurationSec,
                    data.stats.totalDistanceKm
                  )}
                </div>
                <div className={s.statLabel}>평균 페이스</div>
              </div>
              <div>
                <div className={s.statNum}>
                  {secondsToKorean(data.stats.totalDurationSec)}
                </div>
                <div className={s.statLabel}>시간</div>
              </div>
            </div>
            <div className={s.divider} />
          </section>
        </div>
      )}
      <ConfirmModal
        isOpen={isOpen}
        onCancel={closeModal}
        onConfirm={onClickDeleteRun}
        title="신발 삭제"
        description="이 작업은 되돌릴 수 없어요. 삭제하시겠습니까?"
        confirmLabel="삭제"
        cancelLabel="취소"
        contentClassName={s.modalContent}
        overlayClassName={s.modalOverlay}
      />
    </main>
  );
}
