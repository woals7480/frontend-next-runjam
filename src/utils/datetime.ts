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
