// src/app/shoes/ShoesPage.css.ts
import { style } from "@vanilla-extract/css";
import {
  colorBg,
  colorFg,
  colorBorder,
  colorPrimary,
} from "@/app/_styles/tokens.css";

export const page = style({
  maxWidth: 720,
  margin: "0 auto",
  padding: "16px 20px 40px",
  color: colorFg,
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 0 16px",
  color: colorFg,
});

export const title = style({
  fontSize: 20,
  fontWeight: 700,
  color: colorFg,
});

export const addBtn = style({
  width: 36,
  height: 36,
  borderRadius: 12,
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
  background: "inherit",
  color: colorFg,
});

export const list = style({
  display: "grid",
  gap: 16,
  cursor: "pointer",
  color: colorFg,
});

export const centerBox = style({
  minHeight: "15dvh",
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  gap: 12,
  color: colorFg,
});

export const helperText = style({
  fontSize: 14,
  opacity: 0.8,
  color: colorFg,
});
