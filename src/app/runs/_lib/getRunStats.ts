import { fetchWithRefresh } from "@/app/_lib/fetchWithRefresh";
import { getWeekRange } from "@/utils/datetime";
import toast from "react-hot-toast";

type WeeklyProps = {
  date?: string;
};

type MonthlyProps = {
  year?: number;
  month?: number;
};

type YearlyProps = {
  year?: number;
};

export async function getRunStatsWeekly({ date }: WeeklyProps) {
  const { start, end } = getWeekRange(date);
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/run/stats/weekly`);
  if (date) url.searchParams.set("date", date);
  const res = await fetchWithRefresh(url, {
    next: { tags: ["runs", "stats", "weekly", `${start}_${end}`] },
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    const message = data?.message ?? "주간 통계를 불러오지 못했습니다.";
    toast.error(message);
    throw new Error(message);
  }

  return data;
}

export async function getRunStatsMonthly({ year, month }: MonthlyProps) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/run/stats/monthly`);
  if (year) url.searchParams.set("year", String(year));
  if (month) url.searchParams.set("month", String(month));
  const res = await fetchWithRefresh(url, {
    next: { tags: ["runs", "stats", "monthly", `${year}_${month}`] },
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    const message = data?.message ?? "월간 통계를 불러오지 못했습니다.";
    toast.error(message);
    throw new Error(message);
  }

  return data;
}

export async function getRunStatsYearly({ year }: YearlyProps) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/run/stats/yearly`);
  if (year) url.searchParams.set("year", String(year));
  const res = await fetchWithRefresh(url, {
    next: { tags: ["runs", "stats", "yearly", `${year}`] },
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    const message = data?.message ?? "연간 통계를 불러오지 못했습니다.";
    toast.error(message);
    throw new Error(message);
  }

  return data;
}

export async function getRunStatsOverall() {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/run/stats/overall`);
  const res = await fetchWithRefresh(url, {
    next: { tags: ["runs", "stats", "overall"] },
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    const message = data?.message ?? "전체 통계를 불러오지 못했습니다.";
    toast.error(message);
    throw new Error(message);
  }

  return data;
}
