// src/app/shoes/_components/ShoeItem.css.ts
import { style } from "@vanilla-extract/css";

export const item = style({
  display: "grid",
  gridTemplateColumns: "72px 1fr 20px",
  columnGap: 16,
  alignItems: "center",
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
