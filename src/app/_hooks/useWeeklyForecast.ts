"use client";

import { WeeklyForecast } from "@/model/Weather";
import { useQuery } from "@tanstack/react-query";

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
      const res = await fetch(`/api/forecast?${params.toString()}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("주간 예보를 불러오지 못했습니다.");
      return res.json();
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 120 * 60 * 1000,
    retry: 1,
  });
}
