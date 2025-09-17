"use client";

import { useQuery } from "@tanstack/react-query";
import { getRuns } from "./_lib/getRuns";
import RunCrad from "./_components/RunCard";
import * as s from "./runs.css";
import { Run, RunProps } from "@/model/Run";

export default function RunsPage() {
  const { data } = useQuery<RunProps>({
    queryKey: ["runs"],
    queryFn: getRuns,
    staleTime: 300 * 1000,
    gcTime: 600 * 1000,
  });

  return (
    <main className={s.mainWrapper}>
      <h2 className={s.sectionTitle}>달리기 활동</h2>
      {data ? (
        <div className={s.list}>
          {data.items.map((run: Run) => (
            <RunCrad run={run} key={run.id} />
          ))}
        </div>
      ) : (
        <div>달리기 활동을 불러오는데 실패했습니다.</div>
      )}
    </main>
  );
}
