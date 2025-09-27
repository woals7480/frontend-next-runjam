// src/app/shoes/[id]/ShoeDetail.css.ts
import { style } from "@vanilla-extract/css";

export const page = style({
  maxWidth: 720,
  margin: "0 auto",
  paddingBottom: 32,
});

export const header = style({
  display: "grid",
  gridTemplateColumns: "40px 1fr 40px",
  alignItems: "center",
  padding: "12px 16px",
});

export const title = style({
  textAlign: "center",
  fontSize: 18,
  fontWeight: 700,
});

export const hero = style({
  textAlign: "center",
  padding: "24px 16px 8px",
  background: "linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0) 60%)",
});

export const kmNum = style({
  fontSize: 72,
  fontWeight: 900,
  letterSpacing: -2,
  lineHeight: 0.9,
});

export const kmUnit = style({
  display: "block",
  marginTop: 8,
  fontSize: 36,
  fontWeight: 900,
});

export const shoeGhost = style({
  width: "72%",
  height: 160,
  margin: "16px auto 8px",
  opacity: 0.18,
});

export const section = style({
  background: "#fff",
  padding: "20px 16px",
});

export const card = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  textAlign: "center",
  rowGap: 8,
});

export const statNum = style({
  fontSize: 22,
  fontWeight: 800,
});

export const statLabel = style({
  color: "rgba(0,0,0,0.45)",
});

export const divider = style({
  height: 1,
  background: "rgba(0,0,0,0.08)",
  margin: "16px 0",
});

export const centerBox = style({
  minHeight: "15dvh",
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  gap: 12,
  color: "inherit",
});

export const helperText = style({
  fontSize: 14,
  opacity: 0.8,
});

export const menuWrapper = style({
  position: "relative",
});

export const menu = style({
  position: "absolute",
  top: "18px",
  right: 0,
  minWidth: 140,
  padding: 6,
  borderRadius: 12,
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  boxShadow: "0 10px 30px rgba(0,0,0,.12)",
  opacity: 0,
  transform: "translateY(-4px)",
  pointerEvents: "none",
  transition: "opacity .15s ease, transform .15s ease",
  zIndex: 20,
  "@media": {
    "(prefers-color-scheme: dark)": {
      background: "rgba(17,24,39,0.95)",
      border: "1px solid #374151",
    },
  },
});

export const menuOpen = style({
  opacity: 1,
  transform: "translateY(0)",
  pointerEvents: "auto",
});

export const item = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 10px",
  borderRadius: 8,
  fontSize: 14,
  lineHeight: 1.1,
  color: "#111827",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  textAlign: "left",
  selectors: {
    "&:hover": { background: "#f3f4f6" },
    "&:focus-visible": { outline: "2px solid #60a5fa", outlineOffset: 2 },
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      color: "#e5e7eb",
      selectors: { "&:hover": { background: "rgba(255,255,255,0.10)" } },
    },
  },
});

export const modalOverlay = style({
  inset: 0,
  position: "fixed",
  background: "rgba(0,0,0,.45)",
});

export const modalContent = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "8px",
  overflow: "hidden",
  outline: "none",
  background: "white",
  minWidth: "400px",
  boxShadow: "0 10px 30px rgba(0,0,0,.2)",
  padding: "16px",
});
