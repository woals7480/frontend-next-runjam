export function secondsToHHMMSS(sec: number): string {
  const total = Math.max(0, Math.floor(sec)); // 음수/소수 방지
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export function secondsToKorean(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const parts: string[] = [];
  if (h > 0) parts.push(`${h}시간`);
  if (m > 0) parts.push(`${m}분`);
  if (s > 0 || parts.length === 0) parts.push(`${s}초`);
  return parts.join(" ");
}

export function SecToMs(sec: number): string {
  const t = Math.max(0, Math.trunc(sec || 0));
  const m = Math.floor(t / 60);
  const s = t % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(m)}:${pad(s)}`;
}

export function pacePerKmSeconds(totalSeconds: number, distanceKm: number) {
  if (!(distanceKm > 0) || !(totalSeconds >= 0)) return NaN;
  const v = totalSeconds / distanceKm;

  return SecToMs(v);
}
