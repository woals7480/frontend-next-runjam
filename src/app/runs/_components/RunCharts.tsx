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
import RunChartControls from "./RunChartControls";
import dayjs from "dayjs";
import { getWeekRange } from "@/utils/datetime";

type Tab = "week" | "month" | "year" | "all";

export default function RunCharts() {
  const [tab, setTab] = useState<Tab>("month");
  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month() + 1);
  const [weekDate, setWeekDate] = useState(dayjs().format("YYYY-MM-DD"));
  const { start, end } = getWeekRange(weekDate);

  const weeklyQuery = useQuery<WeeklyStats>({
    queryKey: ["runs", "stats", "weekly", `${start}_${end}`],
    queryFn: () => getRunStatsWeekly({ date: weekDate }),
    enabled: tab === "week",
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const monthlyQuery = useQuery<MonthlyStats>({
    queryKey: ["runs", "stats", "monthly", `${year}-${month}`],
    queryFn: () => getRunStatsMonthly({ year, month }),
    enabled: tab === "month",
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const yearlyQuery = useQuery<YearlyStats>({
    queryKey: ["runs", "stats", "yearly", `${year}`],
    queryFn: () => getRunStatsYearly({ year }),
    enabled: tab === "year",
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const overallQuery = useQuery<OverallStats>({
    queryKey: ["runs", "stats", "overall"],
    queryFn: () => getRunStatsOverall(),
    enabled: tab === "all",
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const query =
    tab === "week"
      ? weeklyQuery
      : tab === "month"
      ? monthlyQuery
      : tab === "year"
      ? yearlyQuery
      : overallQuery;
  const loading = query.isLoading;
  const error = query.isError ? (query.error as Error).message : null;
  const summary = query.data?.summary;

  // 차트 데이터/평균선
  const chartData = useMemo(() => {
    if (!query.data) return [];
    if (tab === "all") {
      // overall: { year, km }
      return (query.data as OverallStats).bars.map((b) => ({
        label: String(b.year),
        km: b.km,
      }));
    }
    // week/month/year: { label, km }
    return (query.data as WeeklyStats | MonthlyStats | YearlyStats).bars;
  }, [query.data, tab]);

  const avgLine = useMemo(() => {
    if (!chartData.length) return null;
    const sum = chartData.reduce((acc, d) => acc + Number(d.km ?? 0), 0);
    return sum > 0 ? sum / chartData.length : null;
  }, [chartData]);

  const handleControlsChange = (
    patch: Partial<{ year: number; month: number; weekDate: string }>
  ) => {
    if (patch.year !== undefined) setYear(patch.year);
    if (patch.month !== undefined) setMonth(patch.month);
    if (patch.weekDate !== undefined) setWeekDate(patch.weekDate); // 이미 'YYYY-MM-DD'
  };

  return (
    <main className={s.page}>
      <header className={s.header}>
        <h1 className={s.title}>달리기 통계</h1>
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

      <section style={{ marginBottom: 12 }}>
        <RunChartControls
          tab={tab}
          year={year}
          month={month}
          weekDate={weekDate}
          onChange={handleControlsChange}
        />
      </section>

      {/* 요약 카드 */}
      <section className={s.summaryGrid}>
        <div className={s.card}>
          <div className={s.metricLabel}>킬로미터</div>
          <div className={s.metricValue}>
            {loading
              ? "..."
              : summary
              ? Number(summary.totalKm).toFixed(2)
              : "0.0"}
          </div>
        </div>
        <div className={s.card}>
          <div className={s.metricLabel}>평균 페이스</div>
          <div className={s.metricValue}>
            {loading
              ? "..."
              : summary
              ? pacePerKmSeconds(summary.durationSec, summary.totalKm)
              : `-'--"`}
          </div>
        </div>
        <div className={s.card}>
          <div className={s.metricLabel}>시간</div>
          <div className={s.metricValue}>
            {loading
              ? "..."
              : summary
              ? secondsToKorean(summary.durationSec)
              : "00:00:00"}
          </div>
        </div>
        <div className={s.card}>
          <div className={s.metricLabel}>러닝 횟수</div>
          <div className={s.metricValue}>
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
              <XAxis
                dataKey="label"
                tickLine={false}
                tick={{ fontSize: 14, fill: "#6b7280" }}
              />
              <YAxis
                tick={{ fontSize: 14, fill: "#6b7280" }}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                formatter={(v) => [`${Number(v).toFixed(2)} km`, "거리"]}
                cursor={{ fill: "rgba(0,0,0,0.04)" }} // 호버 배경
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                }}
                labelStyle={{ color: "#6b7280" }}
                itemStyle={{ color: "#000" }}
              />
              {avgLine != null && (
                <ReferenceLine y={avgLine} strokeDasharray="4 4" />
              )}
              <Bar
                dataKey="km"
                fill="#2563eb"
                radius={[3, 3, 0, 0]}
                maxBarSize={22}
              />
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
