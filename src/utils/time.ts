export function secondsToHHMMSS(sec: number): string {
  const total = Math.max(0, Math.floor(sec)); // 음수/소수 방지
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}
