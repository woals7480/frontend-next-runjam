import { style } from "@vanilla-extract/css";
import {
  colorBorder,
  colorFg,
  colorPrimary,
  colorDanger,
} from "@/app/_styles/tokens.css";

export const card = style({
  border: `1px solid ${colorBorder}`,
  borderRadius: 12,
  padding: 16,
  boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
  background: "#fff",
});

export const h1 = style({
  fontSize: 24,
  fontWeight: 700,
  marginBottom: 12,
  color: colorFg,
});

export const label = style({
  display: "grid",
  gap: 6,
  color: colorFg,
  fontSize: 14,
});

export const input = style({
  padding: "10px 12px",
  border: `1px solid ${colorBorder}`,
  borderRadius: 10,
  fontSize: 14,
  selectors: {
    "&:focus": {
      outline: "none",
      borderColor: colorPrimary,
      boxShadow: `0 0 0 3px rgba(37,99,235,0.2)`,
    },
  },
});

export const errorText = style({
  color: colorDanger,
  fontSize: 12,
  marginTop: 4,
});

export const btn = style({
  padding: "10px 14px",
  borderRadius: 10,
  border: `1px solid ${colorPrimary}`,
  background: colorPrimary,
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  selectors: { "&:disabled": { opacity: 0.6, cursor: "not-allowed" } },
});

export const linkBtn = style({
  background: "transparent",
  border: `1px solid ${colorBorder}`,
  color: colorFg,
});

export const page = style({ maxWidth: 420, margin: "80px auto", padding: 16 });
