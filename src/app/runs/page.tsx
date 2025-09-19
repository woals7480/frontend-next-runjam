"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRuns } from "./_lib/getRuns";
import RunCrad from "./_components/RunCard";
import * as s from "./runs.css";
import { Run, RunProps } from "@/model/Run";
import RunFormModal, { RunPayload } from "./_components/RunFormModal";
import { useState } from "react";
import { createRun } from "./_lib/createRun";

export default function RunsPage() {
  const queryClient = useQueryClient();
  const { data } = useQuery<RunProps>({
    queryKey: ["runs"],
    queryFn: getRuns,
    staleTime: 300 * 1000,
    gcTime: 600 * 1000,
  });
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: createRun,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["runs"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (payload: RunPayload) => {
    mutation.mutate(payload);
  };

  return (
    <main className={s.mainWrapper}>
      <div className={s.sectionHeader}>
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
      {data ? (
        <div className={s.list}>
          {data.items.map((run: Run) => (
            <RunCrad run={run} key={run.id} />
          ))}
        </div>
      ) : (
        <div>달리기 활동을 불러오는데 실패했습니다.</div>
      )}
      <RunFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreate={handleSubmit}
        submitting={mutation.isPending}
        mode="create"
      />
    </main>
  );
}
