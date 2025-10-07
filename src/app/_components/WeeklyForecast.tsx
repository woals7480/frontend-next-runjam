"use client";

import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
// ✅ 파일명이 'WeeklyForecast.css.ts' 라면 아래 경로를 맞춰주세요.
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

function toLocalDate(unixUtcSec: number, tzOffsetSec = 0, forceKST?: boolean) {
  const offset = forceKST ? 9 * 3600 : tzOffsetSec ?? 0;
  return new Date((unixUtcSec + offset) * 1000);
}
const DOW = ["일", "월", "화", "수", "목", "금", "토"];

// 오픈웨더 아이콘 코드 패턴 (예: "10d", "04n")
const OWM_ICON_RE = /^[0-9]{2}[dn]$/;

export default function WeeklyForecast({
  city = "Seoul",
  country = "KR",
  className,
  forceKST,
}: Props) {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [locTried, setLocTried] = useState(false); // ⬅️ 시도 여부

  useEffect(() => {
    let mounted = true;
    getLocation().then((c) => {
      if (!mounted) return;
      setCoords(c);
      setLocTried(true); // ⬅️ 시도 완료
    });
    return () => {
      mounted = false;
    };
  }, []);

  const { data, isLoading, isError } = useWeeklyForecast(
    coords ? { lat: coords.lat, lon: coords.lon } : { city, country }
  );

  const locationLabel = isLoading
    ? "불러오는 중..."
    : isError
    ? "가져올 수 없음"
    : data?.city ??
      (coords
        ? `${coords.lat.toFixed(3)}, ${coords.lon.toFixed(3)}`
        : locTried
        ? `${city}, ${country}`
        : "위치 확인 중...");

  const days = useMemo(() => data?.daily ?? [], [data]);
  const tzOffset = data?.timezone_offset ?? 0;

  return (
    <section className={s.wrap}>
      <header className={s.header}>
        <span>주간 예보</span>
        <span>{locationLabel}</span>
      </header>

      <div className={s.scroller} aria-busy={isLoading}>
        <div className={s.grid}>
          {isLoading &&
            Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className={s.day} aria-hidden>
                <div className={s.dow}>—</div>
                <div className={s.icon}>⛅</div>
                <div className={s.temp}>—/—°</div>
                <div className={s.sub}>습도 —% · 바람 —</div>
                <div className={s.sub}>강수확률 —%</div>
              </div>
            ))}

          {!isLoading &&
            !isError &&
            // ✅ 실제 들어온 일수만큼만 렌더 (OpenWeather 7일 / Open-Meteo 7일 / forecast5는 5~6일일 수 있음)
            days.map((d) => {
              const date = toLocalDate(d.dt, tzOffset, forceKST);
              const dow = DOW[date.getUTCDay()];
              const iconStr = String(d.weather.icon ?? "");
              const isOwmIcon = OWM_ICON_RE.test(iconStr);
              const iconUrl = isOwmIcon
                ? `https://openweathermap.org/img/wn/${iconStr}@2x.png`
                : null; // Open-Meteo 등은 이모지/라벨로 처리

              return (
                <div key={d.dt} className={s.day}>
                  <div className={s.dow}>
                    {`${date.getUTCMonth() + 1}/${date.getUTCDate()}(${dow})`}
                  </div>

                  {/* 아이콘: 오픈웨더면 이미지, 아니면 이모지/텍스트 */}
                  {isOwmIcon ? (
                    <Image
                      src={iconUrl!}
                      alt={d.weather.description}
                      width={48}
                      height={48}
                      className={s.icon}
                      unoptimized
                    />
                  ) : (
                    <div className={s.icon} aria-label={d.weather.description}>
                      {iconStr || "⛅"}
                    </div>
                  )}

                  <div className={s.temp}>
                    {Math.round(d.temp.max)}° / {Math.round(d.temp.min)}°
                  </div>
                  <div className={s.sub}>{d.weather.description}</div>
                  <div className={s.sub}>
                    {/* ⚠️ Open-Meteo 서버를 쓰는 경우 wind 단위를 m/s로 바꾸려면
                      서버 요청에 windspeed_unit=ms 를 넣어 주세요.
                      (이미 서버에서 m/s로 내려주고 있다면 그대로 표기 OK) */}
                    습도 {d.humidity ?? "—"}% · 바람 {d.wind_speed} m/s
                  </div>
                  <div className={s.sub}>
                    강수확률 {Math.round((d.pop ?? 0) * 100)}%
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
