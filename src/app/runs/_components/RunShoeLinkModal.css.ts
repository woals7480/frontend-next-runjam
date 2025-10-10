// src/app/_components/RunShoeLinkModal.css.ts
import { style } from "@vanilla-extract/css";
import {
  colorBg,
  colorFg,
  colorBorder,
  colorPrimary,
  colorDanger,
  modalOverlayBg,
  modalBg,
} from "@/app/_styles/tokens.css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  background: modalOverlayBg, // ✅ 토큰
  backdropFilter: "blur(2px)",
  zIndex: 70,
});

export const modal = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(560px, 92vw)",
  maxHeight: "80vh",
  overflow: "auto",
  borderRadius: 16,
  background: modalBg, // ✅ 토큰
  color: colorFg, // ✅ 토큰
  boxShadow: "0 12px 40px rgba(0,0,0,.2)",
  border: `1px solid ${colorBorder}`, // 경계 명확히
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 20px",
  borderBottom: `1px solid ${colorBorder}`, // ✅ 토큰
  color: colorFg,
});

export const title = style({ fontSize: 18, fontWeight: 700, color: colorFg });

export const closeBtn = style({
  fontSize: 22,
  lineHeight: 1,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  color: colorFg, // ✅ 토큰
  selectors: {
    "&:hover": {
      background: "color-mix(in srgb, currentColor 8%, transparent)",
      borderRadius: 6,
    },
    "&:focus-visible": {
      outline: `2px solid ${colorPrimary}`,
      outlineOffset: 2,
      borderRadius: 6,
    },
  },
});

export const form = style({
  padding: 20,
  display: "grid",
  gap: 14,
  color: colorFg,
});

export const fieldRow = style({ display: "grid", gap: 8 });

export const label = style({
  fontSize: 13,
  color: `color-mix(in srgb, ${colorFg} 80%, transparent)`, // 살짝 뮤트
});

export const search = style({
  border: `1px solid ${colorBorder}`,
  borderRadius: 10,
  padding: "10px 12px",
  outline: "none",
  background: colorBg, // ✅ 토큰
  color: colorFg, // ✅ 토큰
  selectors: {
    "&::placeholder": {
      color: `color-mix(in srgb, ${colorFg} 60%, transparent)`,
    },
    "&:focus": {
      borderColor: colorPrimary,
      boxShadow: `0 0 0 3px color-mix(in srgb, ${colorPrimary} 30%, transparent)`,
    },
  },
});

export const selectWrap = style({});

export const list = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
  border: `1px solid ${colorBorder}`,
  borderRadius: 12,
  overflow: "hidden",
  background: "transparent",
});

export const item = style({
  selectors: {
    "&:not(:last-child)": { borderBottom: `1px solid ${colorBorder}` },
  },
});

export const itemSelected = style({
  background: `color-mix(in srgb, ${colorPrimary} 10%, transparent)`, // 선택 시 은은한 하이라이트
});

export const itemLabel = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: 12,
  cursor: "pointer",
  color: colorFg,
  selectors: {
    "&:hover": {
      background: "color-mix(in srgb, currentColor 8%, transparent)",
    },
    "&:focus-visible": {
      outline: `2px solid ${colorPrimary}`,
      outlineOffset: 2,
      borderRadius: 8,
    },
  },
});

export const itemText = style({
  display: "flex",
  alignItems: "baseline",
  gap: 8,
  flexWrap: "wrap",
  color: colorFg,
});

export const brandModel = style({ fontWeight: 600, color: colorFg });

export const nick = style({
  color: `color-mix(in srgb, ${colorFg} 65%, transparent)`,
  fontStyle: "normal",
});

export const mileage = style({
  marginLeft: "auto",
  fontSize: 12,
  color: `color-mix(in srgb, ${colorFg} 65%, transparent)`,
});

export const helper = style({
  fontSize: 13,
  color: `color-mix(in srgb, ${colorFg} 65%, transparent)`,
  padding: "8px 0",
});

export const error = style({});

export const errorText = style({
  color: colorDanger, // ✅ 토큰
  fontSize: 12,
  paddingTop: 6,
});

export const footer = style({
  display: "flex",
  gap: 10,
  justifyContent: "flex-end",
  paddingTop: 6,
});

export const btn = style({
  border: `1px solid ${colorBorder}`,
  borderRadius: 10,
  padding: "10px 14px",
  cursor: "pointer",
  background: colorBg,
  color: colorFg,
  selectors: {
    "&:hover": {
      background: `color-mix(in srgb, ${colorFg} 6%, ${colorBg})`,
    },
    "&:focus-visible": {
      outline: `2px solid ${colorPrimary}`,
      outlineOffset: 2,
    },
    "&:disabled": { opacity: 0.6, cursor: "not-allowed" },
  },
});

export const btnPrimary = style({
  background: colorPrimary,
  color: "#fff",
  border: `1px solid ${colorPrimary}`,
  selectors: {
    "&:hover": { filter: "brightness(1.05)" },
    "&:active": { filter: "brightness(0.95)" },
  },
});

export const btnWarn = style({
  background: `color-mix(in srgb, ${colorDanger} 12%, transparent)`,
  color: colorDanger,
  border: `1px solid color-mix(in srgb, ${colorDanger} 35%, transparent)`,
});

export const btnGhost = style({
  background: "transparent",
  borderColor: colorBorder,
  color: colorFg,
});
