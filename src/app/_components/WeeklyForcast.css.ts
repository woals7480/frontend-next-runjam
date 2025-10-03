import { style } from "@vanilla-extract/css";

export const wrap = style({
  border: "1px solid rgba(0,0,0,.08)",
  borderRadius: 16,
  boxShadow: "0 4px 16px rgba(0,0,0,.06)",
  padding: 12,
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
  fontSize: 14,
  opacity: 0.8,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(100px, 1fr))",
  gap: 8,
});

export const day = style({
  borderRadius: 12,
  padding: 10,
  display: "grid",
  justifyItems: "center",
  gap: 6,
  border: "1px solid rgba(0,0,0,.06)",
});

export const icon = style({ width: 48, height: 48 });
export const dow = style({ fontSize: 13, opacity: 0.85 });
export const temp = style({ fontSize: 16, fontWeight: 700 });
export const sub = style({ fontSize: 12, opacity: 0.9, textAlign: "center" });
