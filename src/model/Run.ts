import { MileageModel, ShoeModel } from "./Shoe";

export interface Run {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  runAt: Date;
  distance: number;
  durationSec: number;
  note?: string;
  mileage?: RunMileage;
}

export interface RunModel {
  items: Run[];
  pageInfo: {
    hasNextPage: boolean;
    nextCursor: string | null;
    take: number;
  };
  totalDistance: number;
}

export type RunMileage = MileageModel & { shoe: ShoeModel };

export interface StatsSummary {
  summary: {
    totalKm: number;
    runCount: number;
    durationSec: number;
    avgPaceSecPerKm: number | null;
  };
}

export interface WeeklyStats extends StatsSummary {
  range: { start: string; end: string };
  bars: { label: string; km: number }[];
}

export interface MonthlyStats extends StatsSummary {
  year: number;
  month: number;
  bars: { label: string; km: number }[];
}

export interface YearlyStats extends StatsSummary {
  year: number;
  bars: { label: string; km: number }[];
}

export interface OverallStats extends StatsSummary {
  bars: { year: number; km: number }[];
}
