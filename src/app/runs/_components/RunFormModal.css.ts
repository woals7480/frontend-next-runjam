// src/app/_components/RunFormModal.css.ts
import { style } from "@vanilla-extract/css";
import {
  colorBg,
  colorFg,
  colorBorder,
  colorPrimary,
  colorDanger,
  modalOverlayBg,
  modalBg,
  modalInputBg,
} from "@/app/_styles/tokens.css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  background: modalOverlayBg, // ✅ 토큰
  display: "grid",
  placeItems: "center",
  padding: 16,
  zIndex: 70,
});

export const content = style({
  outline: "none",
  border: "none",
  borderRadius: 16,
  background: modalBg, // ✅ 토큰
  minWidth: 340,
  maxWidth: 560,
  width: "100%",
  boxShadow: "0 10px 30px rgba(0,0,0,.20)",
  overflow: "hidden",
  "@media": {
    "(prefers-color-scheme: dark)": {
      boxShadow: "0 10px 30px rgba(0,0,0,.55)", // 다크에서 더 깊게
    },
  },
});

export const header = style({
  padding: "18px 20px",
  borderBottom: `1px solid ${colorBorder}`, // ✅ 토큰
  fontWeight: 700,
  color: colorFg,
});

export const body = style({
  padding: 20,
  display: "grid",
  gap: 14,
  color: colorFg,
});

export const row = style({
  display: "grid",
  gap: 6,
});

export const label = style({
  fontSize: 14,
  color: colorFg,
  opacity: 0.9,
});

export const input = style({
  height: 40,
  borderRadius: 10,
  border: `1px solid ${colorBorder}`, // ✅ 토큰
  background: modalInputBg, // ✅ 토큰
  padding: "0 12px",
  fontSize: 14,
  color: colorFg, // ✅ 토큰
  selectors: {
    "&::placeholder": { opacity: 0.7 },
    "&:focus": {
      outline: `2px solid ${colorPrimary}`,
      outlineOffset: 1,
      borderColor: colorPrimary,
      boxShadow: `0 0 0 3px color-mix(in srgb, ${colorPrimary} 35%, transparent)`,
    },
  },
});

export const textarea = style([
  input,
  {
    height: 96,
    padding: 12,
    resize: "vertical",
  },
]);

export const error = style({
  fontSize: 12,
  color: colorDanger, // ✅ 토큰
});

export const footer = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
  padding: "16px 20px",
  borderTop: `1px solid ${colorBorder}`, // ✅ 토큰
});

export const btn = style({
  appearance: "none",
  borderRadius: 10,
  height: 38,
  padding: "0 14px",
  fontSize: 14,
  cursor: "pointer",
  border: `1px solid ${colorBorder}`, // ✅ 토큰
  background: colorBg, // ✅ 토큰
  color: colorFg, // ✅ 토큰
  transition:
    "transform .06s ease, background-color .15s ease, opacity .15s ease, filter .15s ease",
  selectors: {
    "&:hover": {
      background: `color-mix(in srgb, ${colorFg} 6%, ${colorBg})`, // 테마 자동 반응
    },
    "&:active": { transform: "translateY(1px)" },
    "&:disabled": { opacity: 0.6, cursor: "not-allowed" },
    "&:focus-visible": {
      outline: `2px solid ${colorPrimary}`,
      outlineOffset: 2,
    },
  },
});

/** 주요(확인/저장) 버튼: 브랜드 컬러 */
export const primary = style({
  border: "none",
  background: colorPrimary, // ✅ 토큰
  color: "#fff",
  selectors: {
    "&:hover": {
      filter: "brightness(1.05)",
      background: colorPrimary,
    },
    "&:active": { filter: "brightness(0.95)" },
    "&:disabled": { opacity: 0.6, cursor: "not-allowed" },
  },
});
