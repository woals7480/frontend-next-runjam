"use client";

import { useQuery } from "@tanstack/react-query";
import type { WeatherData } from "@/types/weather";

export function useWeather(args: {
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

  return useQuery<WeatherData>({
    queryKey: ["weather", lat ?? city, lon ?? country],
    queryFn: async () => {
      const res = await fetch(`/api/weather?${params.toString()}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("날씨 정보를 불러오지 못했습니다.");
      return res.json();
    },
    // 날씨는 초단위로 크게 변하지 않으니 적당히 캐시
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });
}
