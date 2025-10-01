"use client";

import * as s from "./RunCharts.css";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import {
  getRunStatsMonthly,
  getRunStatsOverall,
  getRunStatsWeekly,
  getRunStatsYearly,
} from "../_lib/getRunStats";
import {
  MonthlyStats,
  OverallStats,
  WeeklyStats,
  YearlyStats,
} from "@/model/Run";
import { pacePerKmSeconds, secondsToKorean } from "@/utils/time";

type Tab = "week" | "month" | "year" | "all";

export default function RunCharts() {
  const [tab, setTab] = useState<Tab>("month");

  const weeklyQuery = useQuery<WeeklyStats>({
    queryKey: ["runs", "stats", "weekly"],
    queryFn: () => getRunStatsWeekly({}),
    enabled: tab === "week",
    staleTime: 5 * 60 * 1000,
  });

  const monthlyQuery = useQuery<MonthlyStats>({
    queryKey: ["runs", "stats", "monthly"],
    queryFn: () => getRunStatsMonthly({}),
    enabled: tab === "month",
    staleTime: 5 * 60 * 1000,
  });

  const yearlyQuery = useQuery<YearlyStats>({
    queryKey: ["runs", "stats", "yearly"],
    queryFn: () => getRunStatsYearly({}),
    enabled: tab === "year",
    staleTime: 5 * 60 * 1000,
  });

  const overallQuery = useQuery<OverallStats>({
    queryKey: ["runs", "stats", "overall"],
    queryFn: () => getRunStatsOverall(),
    enabled: tab === "all",
    staleTime: 5 * 60 * 1000,
  });

  const q =
    tab === "week"
      ? weeklyQuery
      : tab === "month"
      ? monthlyQuery
      : tab === "year"
      ? yearlyQuery
      : overallQuery;
  const loading = q.isLoading;
  const error = q.isError ? (q.error as Error).message : null;
  const summary = (q.data as any)?.summary;

  // 차트 데이터/평균선
  const chartData = useMemo(() => {
    if (!q.data) return [];
    if (tab === "all") {
      // overall: { year, km }
      return (q.data as OverallStats).bars.map((b) => ({
        label: String(b.year),
        km: b.km,
      }));
    }
    // week/month/year: { label, km }
    return (q.data as WeeklyStats | MonthlyStats | YearlyStats).bars;
  }, [q.data, tab]);

  const avgLine = useMemo(() => {
    if (!chartData.length) return null;
    const sum = chartData.reduce((acc, d: any) => acc + Number(d.km ?? 0), 0);
    return sum > 0 ? sum / chartData.length : null;
  }, [chartData]);

  return (
    <main className={s.page}>
      <header className={s.header}>
        <h1 className={s.title}>활동</h1>
        <div className={s.tabs}>
          {(["week", "month", "year", "all"] as const).map((t) => (
            <button
              key={t}
              className={s.tabBtn}
              data-active={tab === t}
              onClick={() => setTab(t)}
            >
              {t === "week"
                ? "주"
                : t === "month"
                ? "월"
                : t === "year"
                ? "년"
                : "전체"}
            </button>
          ))}
        </div>
      </header>

      {/* 요약 카드 */}
      <section className={s.summaryGrid}>
        <div className={s.card}>
          <div className={s.metricLabel}>킬로미터</div>
          <div className={s.metricValueBig}>
            {loading
              ? "..."
              : summary
              ? Number(summary.totalKm).toFixed(1)
              : "0.0"}
          </div>
        </div>
        <div className={s.card}>
          <div className={s.metricLabel}>평균 페이스</div>
          <div className={s.metricValueMid}>
            {loading
              ? "..."
              : summary
              ? pacePerKmSeconds(summary.durationSec, summary.totalKm)
              : `-'--"`}
          </div>
        </div>
        <div className={s.card}>
          <div className={s.metricLabel}>시간</div>
          <div className={s.metricValueSm}>
            {loading
              ? "..."
              : summary
              ? secondsToKorean(summary.durationSec)
              : "00:00:00"}
          </div>
        </div>
        <div className={s.card}>
          <div className={s.metricLabel}>러닝 횟수</div>
          <div className={s.metricValueSm}>
            {loading ? "..." : summary ? summary.runCount : 0}
          </div>
        </div>
      </section>

      {/* 차트 */}
      <section className={`${s.card} ${s.section}`}>
        <div className={s.chartWrap}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip
                formatter={(v) => [`${Number(v).toFixed(1)} km`, "거리"]}
              />
              {avgLine != null && (
                <ReferenceLine y={avgLine} strokeDasharray="4 4" />
              )}
              <Bar dataKey="km" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {error && (
        <section className={s.section}>
          <div className={s.card} style={{ color: "crimson" }}>
            {error}
          </div>
        </section>
      )}
    </main>
  );
}
