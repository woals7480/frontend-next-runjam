"use client";

import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import * as s from "./WeeklyForcast.css";
import { useWeeklyForecast } from "../_hooks/useWeeklyForecast";
import { getLocation } from "../_lib/getLocation";

type Props = {
  city?: string; // 폴백 도시
  country?: string; // 폴백 국가
  className?: string;
  // 서울(+09:00) 기준 표시를 원하면 true (기본: API timezone 사용)
  forceKST?: boolean;
};

function toLocalDate(
  unixUtcSec: number,
  tzOffsetSec: number,
  forceKST?: boolean
) {
  const offset = forceKST ? 9 * 3600 : tzOffsetSec ?? 0;
  return new Date((unixUtcSec + offset) * 1000);
}
const DOW = ["일", "월", "화", "수", "목", "금", "토"];

export default function WeeklyForecast({
  city = "Seoul",
  country = "KR",
  className,
  forceKST,
}: Props) {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );

  useEffect(() => {
    let mounted = true;
    getLocation().then((c) => mounted && setCoords(c));
    return () => {
      mounted = false;
    };
  }, []);

  const { data, isLoading, isError } = useWeeklyForecast(
    coords ? { lat: coords.lat, lon: coords.lon } : { city, country }
  );

  const days = useMemo(() => data?.daily ?? [], [data]);

  return (
    <section className={s.wrap}>
      <header className={s.header}>
        <span>주간 예보</span>
        <span>
          {isLoading
            ? "불러오는 중..."
            : isError
            ? "가져올 수 없음"
            : data?.city ?? (coords ? "현재 위치" : `${city}, ${country}`)}
        </span>
      </header>

      <div className={s.grid} aria-busy={isLoading}>
        {isLoading &&
          Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={s.day} aria-hidden>
              <div className={s.dow}>—</div>
              <div className={s.icon}>⛅</div>
              <div className={s.temp}>—/—°</div>
              <div className={s.sub}>습도 —% · 바람 — m/s</div>
              <div className={s.sub}>강수확률 —%</div>
            </div>
          ))}

        {!isLoading &&
          !isError &&
          days.slice(0, 7).map((d) => {
            const date = toLocalDate(d.dt, data!.timezone_offset, forceKST);
            const dow = DOW[date.getUTCDay()];
            const iconUrl = `https://openweathermap.org/img/wn/${d.weather.icon}@2x.png`;
            return (
              <div key={d.dt} className={s.day}>
                <div className={s.dow}>{`${
                  date.getUTCMonth() + 1
                }/${date.getUTCDate()}(${dow})`}</div>
                <Image
                  src={iconUrl}
                  alt={d.weather.description}
                  width={48}
                  height={48}
                  className={s.icon}
                  unoptimized
                />
                <div className={s.temp}>
                  {Math.round(d.temp.max)}° / {Math.round(d.temp.min)}°
                </div>
                <div className={s.sub}>{d.weather.description}</div>
                <div className={s.sub}>
                  습도 {d.humidity}% · 바람 {d.wind_speed} m/s
                </div>
                <div className={s.sub}>
                  강수확률 {Math.round((d.pop ?? 0) * 100)}%
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
