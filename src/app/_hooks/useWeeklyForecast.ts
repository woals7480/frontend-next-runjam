// src/app/_hooks/useWeeklyForecastOpenMeteo.ts
"use client";

import { useQuery } from "@tanstack/react-query";

export type ForecastDay = {
  dt: number;
  temp: { min: number; max: number };
  weather: { main: string; description: string; icon: string };
  wind_speed: number;
  pop?: number;
  humidity?: number;
};

export type WeeklyForecast = {
  timezone_offset: number;
  daily: ForecastDay[];
  source: "open-meteo";
  city?: string;
};

export function useWeeklyForecast(args: {
  lat?: number;
  lon?: number;
  city?: string;
  country?: string;
}) {
  const { lat, lon, city, country } = args;
  const params = new URLSearchParams();
  if (lat != null && lon != null) {
    params.set("lat", String(lat));
    params.set("lon", String(lon));
  } else {
    if (city) params.set("city", city);
    if (country) params.set("country", country);
  }

  return useQuery<WeeklyForecast>({
    queryKey: ["forecast", lat ?? city, lon ?? country],
    queryFn: async () => {
      const res = await fetch(`/api/forecast?${params.toString()}`);
      if (!res.ok)
        throw new Error("주간 예보(Open-Meteo)를 불러오지 못했습니다.");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 1,
  });
}
