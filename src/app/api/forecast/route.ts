import { NextRequest, NextResponse } from "next/server";

const GEO_API = "https://api.openweathermap.org/geo/1.0/direct";
const ONECALL = "https://api.openweathermap.org/data/3.0/onecall";
const FORECAST5 = "https://api.openweathermap.org/data/2.5/forecast";

type Daily = {
  dt: number; // unix (UTC)
  temp: { min: number; max: number };
  weather: { main: string; description: string; icon: string };
  humidity: number;
  wind_speed: number; // m/s
  pop?: number; // 강수확률(0~1)
};

type Weekly = {
  timezone_offset: number;
  daily: Daily[];
  source: "onecall" | "forecast5";
  city?: string;
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const city =
      searchParams.get("city") ?? process.env.DEFAULT_CITY ?? "Seoul";
    const country =
      searchParams.get("country") ?? process.env.DEFAULT_COUNTRY ?? "KR";
    const appid = process.env.OPENWEATHER_API_KEY;
    if (!appid)
      return NextResponse.json(
        { message: "OPENWEATHER_API_KEY missing" },
        { status: 500 }
      );

    // 1) 좌표 없으면 지오코딩
    let latNum: number | null = lat ? Number(lat) : null;
    let lonNum: number | null = lon ? Number(lon) : null;
    if (latNum == null || lonNum == null) {
      const geoRes = await fetch(
        `${GEO_API}?q=${encodeURIComponent(
          `${city},${country}`
        )}&limit=1&appid=${appid}`,
        { cache: "no-store" }
      );
      const geo = (await geoRes.json()) as Array<{
        lat: number;
        lon: number;
        name: string;
      }>;
      latNum = geo?.[0]?.lat ?? null;
      lonNum = geo?.[0]?.lon ?? null;
      if (latNum == null || lonNum == null) {
        return NextResponse.json(
          { message: "Geocoding failed" },
          { status: 400 }
        );
      }
    }

    // 2) One Call 3.0 시도 (정식 7일 daily)
    const onecallUrl = `${ONECALL}?lat=${latNum}&lon=${lonNum}&exclude=minutely,hourly,alerts&units=metric&lang=kr&appid=${appid}`;
    const oneRes = await fetch(onecallUrl, { cache: "no-store" });

    if (oneRes.ok) {
      const j = await oneRes.json();
      const daily: Daily[] = (j.daily ?? []).slice(0, 7).map((d: any) => ({
        dt: d.dt,
        temp: { min: d.temp?.min, max: d.temp?.max },
        weather: {
          main: d.weather?.[0]?.main,
          description: d.weather?.[0]?.description,
          icon: d.weather?.[0]?.icon,
        },
        humidity: d.humidity,
        wind_speed: d.wind_speed,
        pop: d.pop,
      }));
      const trimmed: Weekly = {
        timezone_offset: j.timezone_offset ?? 0,
        daily,
        source: "onecall",
      };
      return NextResponse.json(trimmed, {
        headers: {
          "Cache-Control": "s-maxage=300, stale-while-revalidate=120",
        },
      });
    }

    // 3) 폴백: 5일/3시간 데이터를 일 단위로 집계하여 5~6일 근사값 생성
    const fRes = await fetch(
      `${FORECAST5}?lat=${latNum}&lon=${lonNum}&units=metric&lang=kr&appid=${appid}`,
      { cache: "no-store" }
    );
    if (!fRes.ok) {
      const err = await fRes.json().catch(() => ({}));
      return NextResponse.json(
        { message: "Forecast fetch failed", detail: err },
        { status: fRes.status }
      );
    }
    const f = await fRes.json();
    const list: any[] = f.list ?? []; // 3-hour steps
    // day key (YYYY-MM-DD)로 그룹핑
    const byDay = new Map<string, any[]>();
    for (const it of list) {
      const dt = new Date(it.dt * 1000);
      const key = dt.toISOString().slice(0, 10);
      if (!byDay.has(key)) byDay.set(key, []);
      byDay.get(key)!.push(it);
    }
    const grouped = [...byDay.entries()].slice(0, 7).map(([key, arr]) => {
      const temps = arr
        .map((a) => a.main?.temp)
        .filter((n) => typeof n === "number");
      const hums = arr
        .map((a) => a.main?.humidity)
        .filter((n) => typeof n === "number");
      const winds = arr
        .map((a) => a.wind?.speed)
        .filter((n) => typeof n === "number");
      // 대표 날씨: 정오(12:00) 근처 또는 첫 항목
      const noon = arr.find((a) => a.dt_txt?.includes("12:00")) ?? arr[0];
      const icons = noon?.weather?.[0];

      return {
        dt: Math.floor(new Date(key + "T00:00:00Z").getTime() / 1000),
        temp: { min: Math.min(...temps), max: Math.max(...temps) },
        weather: {
          main: icons?.main,
          description: icons?.description,
          icon: icons?.icon,
        },
        humidity: Math.round(
          hums.reduce((s, v) => s + v, 0) / Math.max(1, hums.length)
        ),
        wind_speed:
          Math.round(
            (winds.reduce((s, v) => s + v, 0) / Math.max(1, winds.length)) * 10
          ) / 10,
        pop: Math.max(...arr.map((a) => a.pop ?? 0)),
      } as Daily;
    });

    const trimmed: Weekly = {
      timezone_offset: f.city?.timezone ?? 0,
      daily: grouped,
      source: "forecast5",
      city: f.city?.name,
    };
    return NextResponse.json(trimmed, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=120" },
    });
  } catch (e) {
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}
