import { NextRequest, NextResponse } from "next/server";

const API = "https://api.openweathermap.org/data/2.5/weather";

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

    if (!appid) {
      return NextResponse.json(
        { message: "OPENWEATHER_API_KEY missing" },
        { status: 500 }
      );
    }

    const url =
      lat && lon
        ? `${API}?lat=${lat}&lon=${lon}&appid=${appid}&units=metric&lang=kr`
        : `${API}?q=${encodeURIComponent(
            `${city},${country}`
          )}&appid=${appid}&units=metric&lang=kr`;

    const res = await fetch(url, { cache: "no-store" }); // 실시간
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { message: "Weather fetch failed", detail: err },
        { status: res.status }
      );
    }
    const data = await res.json();

    // 필요한 필드만 슬림하게 변환
    const trimmed = {
      name: data.name as string,
      dt: data.dt as number,
      weather: {
        main: data.weather?.[0]?.main as string,
        description: data.weather?.[0]?.description as string,
        icon: data.weather?.[0]?.icon as string, // ex) "10d"
      },
      main: {
        temp: data.main?.temp as number,
        feels_like: data.main?.feels_like as number,
        humidity: data.main?.humidity as number,
      },
      wind: {
        speed: data.wind?.speed as number, // m/s
      },
    };

    // 2분짜리 CDN 캐시도 원하면 아래를 사용 (선택):
    // const resJson = NextResponse.json(trimmed);
    // resJson.headers.set("Cache-Control", "s-maxage=120, stale-while-revalidate=60");
    // return resJson;

    return NextResponse.json(trimmed);
  } catch (e) {
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}
