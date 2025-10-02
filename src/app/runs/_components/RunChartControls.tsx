"use client";

import * as s from "./RunChartControls.css";
import { useMemo } from "react";

type Tab = "week" | "month" | "year" | "all";

type Props = {
  tab: Tab;
  year: number;
  month: number; // 1~12
  weekDate: string; // 'YYYY-MM-DD'
  onChange: (
    patch: Partial<{ year: number; month: number; weekDate: string }>
  ) => void;
};

const MONTH_LABELS = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

export default function RunChartControls({
  tab,
  year,
  month,
  weekDate,
  onChange,
}: Props) {
  const years = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    // 최근 6년(올해 포함) 드롭다운
    return Array.from({ length: 6 }, (_, i) => y - i);
  }, []);

  return (
    <div className={s.controls}>
      {tab === "week" && (
        <>
          <label>주 선택</label>
          <input
            type="date"
            className={s.input}
            value={weekDate}
            onChange={(e) => onChange({ weekDate: e.target.value })}
          />
        </>
      )}

      {tab === "month" && (
        <>
          <label>연/월</label>
          <select
            className={s.select}
            value={year}
            onChange={(e) => onChange({ year: Number(e.target.value) })}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}년
              </option>
            ))}
          </select>
          <select
            className={s.select}
            value={month}
            onChange={(e) => onChange({ month: Number(e.target.value) })}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {MONTH_LABELS[m - 1]}
              </option>
            ))}
          </select>
        </>
      )}

      {tab === "year" && (
        <>
          <label>연</label>
          <select
            className={s.select}
            value={year}
            onChange={(e) => onChange({ year: Number(e.target.value) })}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}년
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}
