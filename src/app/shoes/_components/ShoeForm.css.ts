// src/app/shoes/_components/ShoeForm.css.ts
import { style } from "@vanilla-extract/css";
import {
  colorBg,
  colorFg,
  colorBorder,
  colorPrimary,
  colorDanger,
} from "@/app/_styles/tokens.css";

export const form = style({ display: "grid", gap: 14 });

export const field = style({ display: "grid", gap: 6 });

export const label = style({
  fontSize: 14,
  fontWeight: 600,
  color: colorFg,
});

export const input = style({
  height: 40,
  padding: "0 12px",
  border: `1px solid ${colorBorder}`,
  borderRadius: 10,
  outline: "none",
  background: colorBg,
  color: colorFg,
  selectors: {
    "&::placeholder": {
      color: `color-mix(in srgb, ${colorFg} 60%, transparent)`,
    },
    "&:focus": {
      borderColor: colorPrimary,
      boxShadow: `0 0 0 3px color-mix(in srgb, ${colorPrimary} 35%, transparent)`,
    },
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  },
});

export const error = style({
  color: colorDanger,
  fontSize: 12,
});

export const actions = style({
  marginTop: 8,
  display: "flex",
  gap: 8,
});

export const button = style({
  height: 42,
  padding: "0 16px",
  border: `1px solid ${colorBorder}`,
  borderRadius: 10,
  fontWeight: 600,
  cursor: "pointer",
  background: colorBg,
  color: colorFg,
  transition:
    "transform .06s ease, background-color .15s ease, opacity .15s ease, filter .15s ease",
});

export const primary = style([
  button,
  {
    background: colorPrimary,
    color: "#fff",
    border: `1px solid ${colorPrimary}`,
  },
]);
