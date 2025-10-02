"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getRuns } from "./_lib/getRuns";
import RunCrad from "./_components/RunCard";
import * as s from "./runs.css";
import { Run, RunModel } from "@/model/Run";
import RunFormModal from "./_components/RunFormModal";
import { useEffect, useState } from "react";
import { createRun } from "./_lib/createRun";
import dayjs from "dayjs";
import { updateRun } from "./_lib/updateRun";
import LoadingSpinner from "../_components/LoadingSpinner";
import { useInView } from "react-intersection-observer";
import { secondsToHHMMSS } from "@/utils/time";
import { RunPayload } from "./_types/runForm";
import { useRouter } from "next/navigation";
import RunShoeLinkModal from "./_components/RunShoeLinkModal";
import RunCharts from "./_components/RunCharts";

export default function RunsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    data: runs = [],
    status,
    fetchStatus,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<RunModel, Error, Run[], ["runs"], string | null>({
    queryKey: ["runs"],
    queryFn: ({ pageParam }) => getRuns({ cursor: pageParam ?? null }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
    staleTime: Infinity,
    gcTime: 60 * 60 * 1000,
    select: (data) => data.pages.flatMap((page) => page.items),
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedRun, setSelectRun] = useState<Run | null>(null);
  const [selectedRunLink, setSelectedRunLink] = useState<Run | null>(null);
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });
  const [isShoeOpen, setIsShoeOpen] = useState(false);

  const createMutation = useMutation({
    mutationFn: createRun,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["runs"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: RunPayload }) =>
      updateRun(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["runs"],
      });
      console.log("성공");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleCreateSubmit = (payload: RunPayload) => {
    createMutation.mutate(payload);
  };

  const handleUpdateSubmit = (id: string, payload: RunPayload) => {
    updateMutation.mutate({ id, payload });
  };

  const onEditOpen = (run: Run) => {
    setIsOpen(true);
    setMode("edit");
    setSelectRun(run);
  };

  const onEditClose = () => {
    setIsOpen(false);
    setMode("create");
    setSelectRun(null);
  };

  const onShoeOpen = (run: Run) => {
    setIsShoeOpen(true);
    setSelectedRunLink(run);
  };

  const onShoeClose = () => {
    setIsShoeOpen(false);
    setSelectedRunLink(null);
  };

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <main className={s.mainWrapper}>
      <div className={s.sectionHeader}>
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
        <h2 className={s.sectionTitle}>달리기 활동</h2>
        <button className={s.plusBtn} onClick={() => setIsOpen(true)}>
          <svg
            aria-hidden="true"
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14m-7 7V5"
            />
          </svg>
        </button>
      </div>

      <div style={{ marginBottom: " 16px" }}>
        <RunCharts />
      </div>

      {/* ✅ 최초 로딩 */}
      {status === "pending" && (
        <div className={s.centerBox} aria-busy="true">
          <LoadingSpinner size={60} stroke={4} />
          <p className={s.helperText}>달리기 활동을 불러오는 중…</p>
        </div>
      )}

      {/* ✅ 에러 */}
      {status === "error" && (
        <div className={s.centerBox} role="alert">
          <p>달리기 활동을 불러오지 못했습니다.</p>
          <button
            className={s.retryBtn}
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ["runs"] })
            }
          >
            다시 시도
          </button>
          {/* 개발 중엔 에러 로그를 보고 싶으면 아래 주석 해제 */}
          {/* <pre style={{ marginTop: 8 }}>{String((error as Error)?.message ?? error)}</pre> */}
        </div>
      )}

      {/* ✅ 성공 + 빈 상태 */}
      {status === "success" && runs.length === 0 && (
        <div className={s.centerBox}>
          <p>아직 기록이 없어요. 첫 달리기를 추가해보세요!</p>
          <button
            className={s.plusBtn}
            onClick={() => {
              setMode("create");
              setIsOpen(true);
            }}
          >
            추가
          </button>
        </div>
      )}

      {/* ✅ 성공 + 목록 */}
      {status === "success" && runs.length > 0 && (
        <>
          {/* 백그라운드 refetch 중일 때 상단에 작은 인라인 스피너 */}
          {fetchStatus === "fetching" && (
            <div className={s.inlineFetching} role="status" aria-live="polite">
              <LoadingSpinner size={16} stroke={2} />
              <span className={s.inlineFetchingText}>최신화 중…</span>
            </div>
          )}

          <div className={s.list}>
            {runs.map((run) => (
              <RunCrad
                run={run}
                key={run.id}
                onOpen={onEditOpen}
                onShoeOpen={onShoeOpen}
              />
            ))}
          </div>
        </>
      )}
      <div ref={ref} style={{ height: 50 }} />
      {mode === "edit" && selectedRun ? (
        <RunFormModal
          isOpen={isOpen}
          onClose={onEditClose}
          mode={mode}
          initial={{
            id: selectedRun.id,
            runAt: dayjs(selectedRun.runAt).format("YYYY-MM-DD HH:mm"),
            distance: String(selectedRun.distance),
            duration: secondsToHHMMSS(selectedRun.durationSec),
            note: selectedRun.note ?? "",
          }}
          onUpdate={handleUpdateSubmit}
          submitting={updateMutation.isPending}
        />
      ) : (
        <RunFormModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onCreate={handleCreateSubmit}
          submitting={createMutation.isPending}
          mode={mode}
        />
      )}
      <RunShoeLinkModal
        isOpen={isShoeOpen}
        onClose={onShoeClose}
        runId={selectedRunLink?.id ?? null}
        initialMileage={selectedRunLink?.mileage ?? null}
      />
    </main>
  );
}
