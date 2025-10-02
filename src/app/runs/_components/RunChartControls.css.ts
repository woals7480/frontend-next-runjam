import { style } from "@vanilla-extract/css";

export const controls = style({
  display: "flex",
  gap: 8,
  alignItems: "center",
  flexWrap: "wrap",
});

export const select = style({
  appearance: "none",
  border: "1px solid #e5e7eb",
  padding: "8px 10px",
  borderRadius: 10,
  background: "#fff",
  fontSize: 14,
  cursor: "pointer",
});

export const input = style({
  border: "1px solid #e5e7eb",
  padding: "8px 10px",
  borderRadius: 10,
  background: "#fff",
  fontSize: 14,
  cursor: "pointer",
});
