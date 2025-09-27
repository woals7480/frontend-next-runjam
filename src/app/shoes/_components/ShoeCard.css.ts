// src/app/shoes/_components/ShoeItem.css.ts
import { style } from "@vanilla-extract/css";

export const item = style({
  display: "grid",
  gridTemplateColumns: "72px 1fr 20px",
  columnGap: 16,
  alignItems: "center",
  padding: 12,
  borderRadius: 16,
  background: "rgba(255,255,255,0.92)",
  border: "1px solid #e5e7eb",
  boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
  overflow: "hidden",
  backdropFilter: "saturate(120%) blur(8px)",
  WebkitBackdropFilter: "saturate(120%) blur(8px)",
  "@media": {
    "(prefers-color-scheme: dark)": {
      background: "rgba(17,24,39,0.65)",
      border: "1px solid #374151",
      boxShadow: "0 6px 22px rgba(0,0,0,0.4)",
    },
  },
});

export const thumbWrap = style({
  width: 72,
  height: 72,
  borderRadius: 14,
  background: "#f4f5f6",
  display: "grid",
  placeItems: "center",
  overflow: "hidden",
});

export const name = style({
  fontSize: 20,
  fontWeight: 700,
  lineHeight: 1.2,
});

export const kmText = style({
  marginTop: 6,
  fontSize: 16,
  color: "rgba(0,0,0,0.55)",
});

export const chevron = style({
  color: "rgba(0,0,0, 1)",
});
