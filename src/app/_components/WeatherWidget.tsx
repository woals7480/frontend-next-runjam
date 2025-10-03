"use client";

import Image from "next/image";
import * as s from "./WeatherWidget.css";
import { useEffect, useState } from "react";

import clsx from "clsx";
import { getLocation } from "../_lib/getLocation";
import { useWeather } from "../_hooks/useWeather";

type Props = {
  className?: string;
  // 폴백 도시 (선택)
  city?: string;
  country?: string;
};

export default function WeatherWidget({
  className,
  city = "Seoul",
  country = "KR",
}: Props) {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );

  useEffect(() => {
    let mounted = true;
    getLocation().then((c) => {
      if (mounted) setCoords(c);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const { data, isLoading, isError } = useWeather(
    coords ? { lat: coords.lat, lon: coords.lon } : { city, country }
  );

  if (isLoading) {
    return (
      <section
        className={clsx(s.card, className)}
        aria-busy="true"
        aria-live="polite"
      >
        <div className={s.left}>⛅</div>
        <div className={s.mid}>
          <div className={s.place}>날씨 불러오는 중...</div>
          <div className={s.temp}>—</div>
          <div className={s.desc}>—</div>
        </div>
        <div className={s.right}>
          <div className={s.row}>
            <span>습도</span>
            <b>—</b>
          </div>
          <div className={s.row}>
            <span>바람</span>
            <b>—</b>
          </div>
          <div className={s.row}>
            <span>체감</span>
            <b>—</b>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className={clsx(s.card, className)}>
        <div className={s.left}>⚠️</div>
        <div className={s.mid}>
          <div className={s.place}>날씨를 가져올 수 없어요</div>
          <div className={s.desc}>위치 권한 확인 또는 잠시 후 다시 시도</div>
        </div>
      </section>
    );
  }

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather.icon}@2x.png`;
  return (
    <section className={clsx(s.card, className)} aria-live="polite">
      <div className={s.left}>
        {/* 외부 이미지이므로 next.config 이미지 도메인에 openweathermap.org 추가 필요 */}
        <Image
          src={iconUrl}
          alt={data.weather.description}
          width={48}
          height={48}
          className={s.iconImg}
        />
      </div>

      <div className={s.mid}>
        <div className={s.place}>{data.name}</div>
        <div className={s.temp}>{Math.round(data.main.temp)}°</div>
        <div className={s.desc}>{data.weather.description}</div>
      </div>

      <div className={s.right}>
        <div className={s.row}>
          <span>습도</span>
          <b>{data.main.humidity}%</b>
        </div>
        <div className={s.row}>
          <span>바람</span>
          <b>{data.wind.speed} m/s</b>
        </div>
        <div className={s.row}>
          <span>체감</span>
          <b>{Math.round(data.main.feels_like)}°</b>
        </div>
      </div>
    </section>
  );
}
