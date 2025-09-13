"use client";

import { useQuery } from "@tanstack/react-query";
import { getRuns } from "./_lib/getRuns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as s from "./runs.css";
import { useEffect, useState } from "react";

const HMS_RE = /^(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
const YMDHM_RE =
  /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\s([01]\d|2[0-3]):([0-5]\d)$/;

const RunCreateSchema = z.object({
  runAt: z.string().regex(YMDHM_RE, "형식: YYYY-MM-DD HH:mm"),
  distanceKm: z.coerce.number().min(0.01).max(999.99),
  duration: z.string().regex(HMS_RE, "형식: HH:mm:ss"),
  note: z.string().max(500).optional().or(z.literal("")),
});

type RunCreateInput = z.infer<typeof RunCreateSchema>;

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (p) => (
  <input {...p} className={`${s.input} ${p.className || ""}`} />
);
const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "solid" | "outline" | "danger";
  }
> = ({ variant = "solid", className, ...rest }) => (
  <button
    {...rest}
    className={`${s.button} ${
      variant === "solid"
        ? s.buttonSolid
        : variant === "danger"
        ? s.buttonDanger
        : s.buttonOutline
    } ${className || ""}`}
  />
);

export default function RunsPage() {
  const { data } = useQuery({
    queryKey: ["runs"],
    queryFn: getRuns,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  console.log(data, "!!");
  const [runs, setRuns] = useState<Run[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const pages = Math.max(1, Math.ceil(total / limit));

  const reload = async () => {
    try {
      const d = await fetchRuns({ page, limit, userId: userFilter });
      setRuns(d.items);
      setTotal(d.total);
    } catch (e: any) {
      alert(e.message);
    }
  };
  useEffect(() => {
    reload(); /* eslint-disable-next-line */
  }, [page, limit]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RunCreateInput>({
    resolver: zodResolver(RunCreateSchema),
    defaultValues: {
      runAt: "",
      distanceKm: 5,
      duration: "00:30:00",
      note: "",
    },
  });

  const onSubmit = async (data: RunCreateInput) => {
    try {
      await createRun({ ...data, note: data.note || undefined });
      reset({
        runAt: "",
        distanceKm: 5,
        duration: "00:30:00",
        note: "",
      });
      await reload();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const remove = async (id: number) => {
    if (!confirm("이 달리기 기록을 삭제할까요?")) return;
    try {
      await deleteRun(id);
      await reload();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <main className={s.container}>
      <div className={s.maxw}>
        <header className={s.header}>
          <h1 className={s.h1}>Runs</h1>
        </header>

        <section className={s.col}>
          {/* <div className={s.card}>
            <div className={s.cardHeader}>
              <h2 className={s.cardTitle}>러닝 생성</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={s.grid5}>
              <div>
                <Input placeholder="YYYY-MM-DD HH:mm" {...register("runAt")} />
                {errors.runAt && (
                  <p className={s.muted}>{errors.runAt.message}</p>
                )}
              </div>
              <div>
                <Input
                  type="number"
                  step="any"
                  placeholder="distanceKm"
                  {...register("distanceKm", { valueAsNumber: true })}
                />
                {errors.distanceKm && (
                  <p className={s.muted}>{errors.distanceKm.message}</p>
                )}
              </div>
              <div>
                <Input placeholder="HH:mm:ss" {...register("duration")} />
                {errors.duration && (
                  <p className={s.muted}>{errors.duration.message}</p>
                )}
              </div>
              <div className={s.row}>
                <Input
                  placeholder="note (선택)"
                  {...register("note")}
                  className={s.flex1}
                />
                <Button type="submit" disabled={isSubmitting}>
                  추가
                </Button>
              </div>
            </form>
          </div> */}

          <div className={s.card}>
            <div className={s.cardHeader}>
              <h2 className={s.cardTitle}>
                러닝 목록 ({total.toLocaleString()}개)
              </h2>
            </div>
            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>일시</th>
                    <th>거리(km)</th>
                    <th>시간</th>
                    <th>페이스</th>
                    <th>비고</th>
                    <th>액션</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.items.map((r) => (
                    <tr key={r.id}>
                      <td>{r.runAtText ?? r.runAt}</td>
                      <td>{r.distance.toFixed(2)}</td>
                      <td>{r.durationSec}</td>
                      <td>{r.pacePerKm ?? "-"}</td>
                      <td>{r.note ?? ""}</td>
                      <td>
                        <Button variant="danger" onClick={() => remove(r.id)}>
                          삭제
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={s.paginationBar}>
              <div className={s.row}>
                <span className={s.muted}>페이지</span>
                <Input
                  value={String(page)}
                  onChange={(e) => setPage(Number(e.currentTarget.value || 1))}
                  style={{ width: 80 }}
                />
                <span className={s.muted}>표시</span>
                <Input
                  value={String(limit)}
                  onChange={(e) =>
                    setLimit(Number(e.currentTarget.value || 10))
                  }
                  style={{ width: 90 }}
                />
                <span className={s.muted}>/ 총 {pages}</span>
              </div>
              <div className={s.row}>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  이전
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(pages, p + 1))}
                >
                  다음
                </Button>
              </div>
            </div>
          </div>
        </section>

        <footer className={s.footer}>
          {/* API: <code>{API_BASE}</code> */}
        </footer>
      </div>
    </main>
  );
}
