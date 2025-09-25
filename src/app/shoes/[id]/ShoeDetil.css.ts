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
  fontSize: 96,
  fontWeight: 900,
  letterSpacing: -2,
  lineHeight: 0.9,
});

export const kmUnit = style({
  display: "block",
  marginTop: 8,
  fontSize: 44,
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
  fontSize: 28,
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
