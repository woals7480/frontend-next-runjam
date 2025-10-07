// src/app/api/forecast-openmeteo/route.ts
import { NextRequest, NextResponse } from "next/server";

const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";
const GEO_REV = "https://geocoding-api.open-meteo.com/v1/reverse";
const METEO = "https://api.open-meteo.com/v1/forecast";

type Daily = {
  dt: number;
  temp: { min: number; max: number };
  weather: { main: string; description: string; icon: string }; // icon: 이모지/라벨
  humidity?: number;
  wind_speed: number; // m/s
  pop?: number; // 0~1
};

type Weekly = {
  timezone_offset: number; // seconds
  daily: Daily[];
  source: "open-meteo";
  city?: string;
};

// weathercode → 라벨/이모지
function codeToWeather(code: number): {
  main: string;
  description: string;
  icon: string;
} {
  if ([0].includes(code))
    return { main: "Clear", description: "맑음", icon: "☀️" };
  if ([1, 2].includes(code))
    return { main: "Partly Cloudy", description: "구름 조금", icon: "🌤️" };
  if ([3].includes(code))
    return { main: "Cloudy", description: "구름 많음", icon: "☁️" };
  if ([45, 48].includes(code))
    return { main: "Fog", description: "안개", icon: "🌫️" };
  if ([51, 53, 55].includes(code))
    return { main: "Drizzle", description: "이슬비", icon: "🌦️" };
  if ([56, 57].includes(code))
    return { main: "Freezing Drizzle", description: "언 비", icon: "🌧️" };
  if ([61, 63, 65].includes(code))
    return { main: "Rain", description: "비", icon: "🌧️" };
  if ([66, 67].includes(code))
    return { main: "Freezing Rain", description: "언 비", icon: "🌧️" };
  if ([71, 73, 75].includes(code))
    return { main: "Snow", description: "눈", icon: "❄️" };
  if ([77].includes(code))
    return { main: "Snow Grains", description: "싸락눈", icon: "🌨️" };
  if ([80, 81, 82].includes(code))
    return { main: "Rain Showers", description: "소나기", icon: "🌦️" };
  if ([85, 86].includes(code))
    return { main: "Snow Showers", description: "눈 소나기", icon: "🌨️" };
  if ([95].includes(code))
    return { main: "Thunderstorm", description: "뇌우", icon: "⛈️" };
  if ([96, 99].includes(code))
    return { main: "Thunderstorm", description: "뇌우(우박)", icon: "⛈️" };
  return { main: "Unknown", description: "날씨 정보 없음", icon: "⛅" };
}

// 지역명 조립 (구/군 → 시/도 → 국가코드)
function buildPlace(r: {
  name?: string;
  admin2?: string;
  admin1?: string;
  state?: string;
  country_code?: string;
  country?: string;
}) {
  const second = r.admin2 ?? r.admin1 ?? r.state;
  const cc = r.country_code ?? r.country;
  return [r.name, second, cc].filter(Boolean).join(", ");
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const qCity =
      searchParams.get("city") ?? process.env.DEFAULT_CITY ?? "Seoul";
    const qCountry =
      searchParams.get("country") ?? process.env.DEFAULT_COUNTRY ?? "KR";

    // ── 1) 좌표/지역명 해석 ──────────────────────────────────────────
    let latNum: number | null = lat ? Number(lat) : null;
    let lonNum: number | null = lon ? Number(lon) : null;
    let placeName: string | undefined;

    if (latNum == null || lonNum == null) {
      // (A) 도시명 → 좌표 (영문 표기 선호 시 language=en)
      const geoRes = await fetch(
        `${GEO_API}?name=${encodeURIComponent(
          qCity
        )}&count=1&language=en&format=json`,
        { cache: "no-store" }
      );
      const geo = await geoRes.json();
      const g0 = geo?.results?.[0];
      latNum = g0?.latitude ?? null;
      lonNum = g0?.longitude ?? null;
      if (g0) {
        placeName = buildPlace({
          name: g0.name,
          admin2: g0.admin2,
          admin1: g0.admin1,
          country_code: g0.country_code,
        });
      }
      if (latNum == null || lonNum == null) {
        return NextResponse.json(
          { message: "Geocoding failed" },
          { status: 400 }
        );
      }
    } else {
      // (B) 좌표 → 지역명(역지오코딩) — 영문으로 받아 "Gangnam-gu, Seoul, KR" 포맷 유도
      try {
        const revRes = await fetch(
          `${GEO_REV}?latitude=${latNum}&longitude=${lonNum}&language=en&format=json&count=1`,
          { cache: "no-store" }
        );
        if (revRes.ok) {
          const rev = await revRes.json();
          const r0 = rev?.results?.[0];
          if (r0) {
            placeName = buildPlace({
              name: r0.name,
              admin2: r0.admin2,
              admin1: r0.admin1,
              country_code: r0.country_code,
            });
          }
        }
        // 폴백: OpenWeather Reverse (키가 있다면)
        if (!placeName && process.env.OPENWEATHER_API_KEY) {
          const ow = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latNum}&lon=${lonNum}&limit=1&appid=${process.env.OPENWEATHER_API_KEY}`,
            { cache: "no-store" }
          );
          if (ow.ok) {
            const arr = await ow.json();
            const r = arr?.[0];
            if (r) {
              placeName = buildPlace({
                name: r.name,
                state: r.state,
                country: r.country,
              });
            }
          }
        }
      } catch {
        /* ignore */
      }
    }

    // ── 2) 7일 예보(Open-Meteo) ──────────────────────────────────────
    const params = new URLSearchParams({
      latitude: String(latNum),
      longitude: String(lonNum),
      timezone: "auto",
      forecast_days: "7",
      windspeed_unit: "ms", // m/s
      daily: [
        "weathercode",
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_probability_max",
        "windspeed_10m_max",
        "relative_humidity_2m_mean", // 일별 평균 습도
      ].join(","),
      hourly: ["relative_humidity_2m"].join(","), // 습도 폴백용
    });

    const meteoRes = await fetch(`${METEO}?${params.toString()}`, {
      cache: "no-store",
    });
    if (!meteoRes.ok) {
      const err = await meteoRes.json().catch(() => ({}));
      return NextResponse.json(
        { message: "Open-Meteo fetch failed", detail: err },
        { status: meteoRes.status }
      );
    }
    const m = await meteoRes.json();

    const tzOffset = (m?.utc_offset_seconds ?? 0) as number;
    const time: string[] = m?.daily?.time ?? [];
    const code: number[] = m?.daily?.weathercode ?? [];
    const tmax: number[] = m?.daily?.temperature_2m_max ?? [];
    const tmin: number[] = m?.daily?.temperature_2m_min ?? [];
    const pop: number[] = m?.daily?.precipitation_probability_max ?? [];
    const windMax: number[] = m?.daily?.windspeed_10m_max ?? [];
    const rhDaily: number[] | undefined = m?.daily?.relative_humidity_2m_mean;

    // 시간별 습도(폴백) → 날짜별 평균
    let rhByDay: Map<string, number[]> | null = null;
    if (!rhDaily || rhDaily.every((v) => v == null)) {
      const hTimes: string[] = m?.hourly?.time ?? [];
      const hRH: number[] = m?.hourly?.relative_humidity_2m ?? [];
      rhByDay = new Map();
      for (let i = 0; i < hTimes.length; i++) {
        const key = hTimes[i]?.slice(0, 10); // "YYYY-MM-DD"
        if (!key || typeof hRH[i] !== "number") continue;
        if (!rhByDay.has(key)) rhByDay.set(key, []);
        rhByDay.get(key)!.push(hRH[i]);
      }
    }

    const daily: Daily[] = time.map((iso: string, i: number) => {
      const dt = Math.floor(new Date(iso + "T00:00:00Z").getTime() / 1000);
      const w = codeToWeather(code[i] ?? 0);

      // 습도: 일별 값 우선, 없으면 시간별 평균
      let humidity: number | undefined =
        typeof rhDaily?.[i] === "number" ? Math.round(rhDaily![i]) : undefined;
      if (humidity == null && rhByDay) {
        const arr = rhByDay.get(iso);
        if (arr?.length)
          humidity = Math.round(arr.reduce((s, v) => s + v, 0) / arr.length);
      }

      return {
        dt,
        temp: { min: tmin[i] ?? 0, max: tmax[i] ?? 0 },
        weather: w,
        wind_speed:
          typeof windMax[i] === "number" ? Math.round(windMax[i] * 10) / 10 : 0,
        pop:
          typeof pop[i] === "number"
            ? Math.max(0, Math.min(1, pop[i] / 100))
            : undefined,
        humidity,
      };
    });

    const fallbackCity =
      placeName ??
      (latNum != null && lonNum != null
        ? `${latNum.toFixed(3)}, ${lonNum.toFixed(3)}`
        : undefined);

    const trimmed: Weekly = {
      timezone_offset: tzOffset,
      daily,
      source: "open-meteo",
      city: fallbackCity, // 항상 채워지도록
    };

    return NextResponse.json(trimmed, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=120" },
    });
  } catch {
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}
