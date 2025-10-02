// src/app/_components/ConfirmModal.css.ts
import { style } from "@vanilla-extract/css";

/** react-modal overlay */
export const overlay = style({
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.45)",
  display: "grid",
  placeItems: "center",
  padding: 16,
  zIndex: 60,
});

/** react-modal content */
export const content = style({
  outline: "none",
  border: "none",
  borderRadius: 16,
  background: "#fff",
  boxShadow: "0 10px 30px rgba(0,0,0,.20)",
  minWidth: 300,
  maxWidth: 560,
  width: "100%",
  overflow: "hidden",
  "@media": {
    "(prefers-color-scheme: dark)": {
      background: "rgba(28,28,28,.98)",
      boxShadow: "0 10px 30px rgba(0,0,0,.55)",
    },
  },
});

/** 내부 컨테이너 */
export const body = style({
  padding: 20,
});

/** 제목 */
export const title = style({
  margin: 0,
  fontSize: 18,
  fontWeight: 700,
  lineHeight: 1.3,
});

/** 설명 */
export const description = style({
  marginTop: 12,
  lineHeight: 1.6,
  color: "#4b5563",
  "@media": {
    "(prefers-color-scheme: dark)": { color: "#9ca3af" },
  },
});

/** 하단 버튼 영역 */
export const actions = style({
  marginTop: 16,
  display: "flex",
  gap: 8,
  justifyContent: "flex-end",
});

/** 버튼 공통 */
export const btn = style({
  appearance: "none",
  border: "1px solid #e5e7eb",
  background: "#fff",
  color: "#111827",
  borderRadius: 10,
  padding: "8px 14px",
  fontSize: 14,
  cursor: "pointer",
  "@media": {
    "(prefers-color-scheme: dark)": {
      background: "#27272a",
      border: "1px solid #3f3f46",
      color: "#e5e7eb",
      selectors: {
        "&:hover": { background: "#313135" },
        "&:active": { background: "#2a2a2e" },
      },
    },
  },
});

/** 주요(확인/삭제) 버튼 */
export const btnPrimary = style({
  border: "none",
  background: "#111827",
  color: "#fff",
  selectors: {
    "&:hover": { filter: "brightness(1.05)" },
    "&:active": { filter: "brightness(0.95)" },
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      background: "#e5e7eb",
      color: "#111827",
    },
  },
});
