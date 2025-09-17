import { style } from "@vanilla-extract/css";

const radius = "16px";

export const card = style({
  borderRadius: radius,
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

export const inner = style({
  padding: "16px",
});

export const headRow = style({
  display: "grid",
  gridTemplateColumns: "64px 1fr",
  columnGap: "12px",
  alignItems: "center",
});

export const thumb = style({
  width: 64,
  height: 64,
  borderRadius: "12px",
  background: "#f3f4f6",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const title = style({
  fontSize: "18px",
  fontWeight: 700,
  lineHeight: 1.15,
  margin: 0,
});

export const subtitle = style({
  marginTop: "4px",
  fontSize: "13px",
  color: "#6b7280",
});

export const metrics = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "8px",
  marginTop: "14px",
});

export const metric = style({
  display: "grid",
  rowGap: 2,
  justifyItems: "start",
});

export const value = style({
  fontSize: "24px",
  fontWeight: 800,
  letterSpacing: "-0.2px",
});

export const label = style({
  fontSize: "12px",
  color: "#6b7280",
});

export const divider = style({
  height: 1,
  background: "#f1f5f9",
  margin: "12px 0 4px",
  "@media": {
    "(prefers-color-scheme: dark)": {
      background: "#334155",
    },
  },
});

export const footer = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "0 16px 12px 16px",
});

export const badge = style({
  width: 28,
  height: 28,
  borderRadius: 8,
  background: "#111827",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
});
