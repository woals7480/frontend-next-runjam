import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import { getWeekRange } from "@/utils/datetime";
import toast from "react-hot-toast";

type WeeklyProps = { date?: string };
type MonthlyProps = { year?: number; month?: number };
type YearlyProps = { year?: number };

export async function getRunStatsWeekly({ date }: WeeklyProps) {
  const { start, end } = getWeekRange(date);
  const params = new URLSearchParams();
  if (date) params.set("date", date);

  const url = params.toString()
    ? `/api/run/stats/weekly?${params}`
    : `/api/run/stats/weekly`; // ✅ 프록시 경유

  const res = await fetchWithRefresh(url, {
    method: "GET",
    next: { tags: ["runs", "stats", "weekly", `${start}_${end}`] },
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.message ?? "주간 통계를 불러오지 못했습니다.";
    toast.error(message);
    throw new Error(message);
  }
  return data;
}

export async function getRunStatsMonthly({ year, month }: MonthlyProps) {
  const params = new URLSearchParams();
  if (typeof year === "number") params.set("year", String(year));
  if (typeof month === "number") params.set("month", String(month));

  const url = params.toString()
    ? `/api/run/stats/monthly?${params}`
    : `/api/run/stats/monthly`;

  const res = await fetchWithRefresh(url, {
    method: "GET",
    next: { tags: ["runs", "stats", "monthly", `${year}_${month}`] },
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.message ?? "월간 통계를 불러오지 못했습니다.";
    toast.error(message);
    throw new Error(message);
  }
  return data;
}

export async function getRunStatsYearly({ year }: YearlyProps) {
  const params = new URLSearchParams();
  if (typeof year === "number") params.set("year", String(year));

  const url = params.toString()
    ? `/api/run/stats/yearly?${params}`
    : `/api/run/stats/yearly`;

  const res = await fetchWithRefresh(url, {
    method: "GET",
    next: { tags: ["runs", "stats", "yearly", `${year}`] },
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.message ?? "연간 통계를 불러오지 못했습니다.";
    toast.error(message);
    throw new Error(message);
  }
  return data;
}

export async function getRunStatsOverall() {
  const url = `/api/run/stats/overall`;

  const res = await fetchWithRefresh(url, {
    method: "GET",
    next: { tags: ["runs", "stats", "overall"] },
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.message ?? "전체 통계를 불러오지 못했습니다.";
    toast.error(message);
    throw new Error(message);
  }
  return data;
}
