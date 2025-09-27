// src/app/shoes/_components/ShoeForm.css.ts
import { style } from "@vanilla-extract/css";

export const form = style({ display: "grid", gap: 14 });
export const field = style({ display: "grid", gap: 6 });
export const label = style({ fontSize: 14, fontWeight: 600 });
export const input = style({
  height: 40,
  padding: "0 12px",
  border: "1px solid #e2e2e2",
  borderRadius: 10,
  outline: "none",
});
export const error = style({ color: "#d14343", fontSize: 12 });
export const actions = style({ marginTop: 8, display: "flex", gap: 8 });
export const button = style({
  height: 42,
  padding: "0 16px",
  border: "1px solid #e2e2e2",
  borderRadius: 10,
  fontWeight: 600,
  cursor: "pointer",
});
export const primary = style([
  button,
  { background: "black", color: "white", border: "1px solid black" },
]);
