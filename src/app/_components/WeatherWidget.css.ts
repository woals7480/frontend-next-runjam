import { style } from "@vanilla-extract/css";

export const card = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: "12px",
  padding: "14px 16px",
  borderRadius: "16px",
  border: "1px solid rgba(0,0,0,.08)",
  boxShadow: "0 4px 16px rgba(0,0,0,.06)",
  backdropFilter: "blur(8px)",
});

export const left = style({ display: "grid", placeItems: "center" });
export const mid = style({ display: "grid", gap: 2 });
export const place = style({ fontSize: 14, opacity: 0.8 });
export const temp = style({ fontSize: 26, fontWeight: 700, lineHeight: 1.1 });
export const desc = style({ fontSize: 13, opacity: 0.9 });

export const right = style({
  display: "grid",
  justifyItems: "end",
  gap: 4,
  fontSize: 12,
  opacity: 0.9,
});
export const row = style({ display: "flex", gap: 8, alignItems: "center" });

export const iconImg = style({ width: 48, height: 48 });
