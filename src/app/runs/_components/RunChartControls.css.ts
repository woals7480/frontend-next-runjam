import { style } from "@vanilla-extract/css";
import { colorBg, colorBorder } from "@/app/_styles/tokens.css";

export const controls = style({
  display: "flex",
  gap: 8,
  alignItems: "center",
  flexWrap: "wrap",
});

export const select = style({
  appearance: "none",
  border: `1px solid ${colorBorder}`,
  padding: "8px 10px",
  borderRadius: 10,
  background: colorBg,
  fontSize: 14,
  cursor: "pointer",
});

export const input = style({
  border: `1px solid ${colorBorder}`,
  padding: "8px 10px",
  borderRadius: 10,
  background: colorBg,
  fontSize: 14,
  cursor: "pointer",
});
