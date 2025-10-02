// datetime-local → API ("YYYY-MM-DD HH:mm")
// export function formatRunAtForApi(inputValue: string) {
//   return inputValue.replace("T", " ");

import dayjs from "dayjs";

export function formatRunAtForApi(inputValue: string): string {
  const day = dayjs(inputValue, "YYYY-MM-DDTHH:mm", true);
  return day.isValid() ? day.format("YYYY-MM-DD HH:mm") : "";
}

// API/엔티티 runAt → datetime-local input 값
export function formatRunAtForInput(apiValue: string) {
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(apiValue)) {
    return apiValue.replace(" ", "T").slice(0, 16);
  }
  if (apiValue.includes("T")) {
    return apiValue.slice(0, 16);
  }
  return "";
}

export function getWeekRange(date?: string): {
  start: string;
  end: string;
} {
  // dayjs는 기본 일요일 시작 → 월요일 시작으로 +1d 보정
  const monday = dayjs(date).startOf("week").add(1, "day").startOf("day");
  const sunday = monday.add(6, "day").endOf("day");

  const start = monday.format("YYYY-MM-DD");
  const end = sunday.format("YYYY-MM-DD");

  return { start, end };
}
