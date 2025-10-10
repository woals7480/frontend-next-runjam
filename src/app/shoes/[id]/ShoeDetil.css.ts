// src/app/shoes/[id]/ShoeDetail.css.ts
import { style } from "@vanilla-extract/css";
import {
  colorBg,
  colorFg,
  colorBorder,
  colorPrimary,
  modalOverlayBg,
  modalBg,
} from "@/app/_styles/tokens.css";

export const page = style({
  maxWidth: 720,
  margin: "0 auto",
  paddingBottom: 32,
  color: colorFg,
});

export const header = style({
  display: "grid",
  gridTemplateColumns: "40px 1fr 40px",
  alignItems: "center",
  padding: "12px 16px",
  color: colorFg,
});

export const title = style({
  textAlign: "center",
  fontSize: 18,
  fontWeight: 700,
  color: colorFg,
});

export const hero = style({
  textAlign: "center",
  padding: "24px 16px 8px",
  background: `linear-gradient(
    180deg,
    color-mix(in srgb, ${colorFg} 8%, transparent),
    transparent 60%
  )`,
});

export const kmNum = style({
  fontSize: 72,
  fontWeight: 900,
  letterSpacing: -2,
  lineHeight: 0.9,
  color: colorFg,
});

export const kmUnit = style({
  display: "block",
  marginTop: 8,
  fontSize: 36,
  fontWeight: 900,
  color: colorFg,
});

export const shoeGhost = style({
  width: "72%",
  height: 160,
  margin: "16px auto 8px",
  opacity: 0.18,
});

export const section = style({
  background: colorBg,
  padding: "20px 16px",
  color: colorFg,
});

export const card = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  textAlign: "center",
  rowGap: 8,
  color: colorFg,
});

export const statNum = style({
  fontSize: 22,
  fontWeight: 800,
  color: colorFg,
});

export const statLabel = style({
  color: `color-mix(in srgb, ${colorFg} 55%, transparent)`,
});

export const divider = style({
  height: 1,
  background: colorBorder,
  margin: "16px 0",
});

export const centerBox = style({
  minHeight: "15dvh",
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  gap: 12,
  color: colorFg,
});

export const helperText = style({
  fontSize: 14,
  opacity: 0.8,
  color: colorFg,
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
  background: colorBg,
  border: `1px solid ${colorBorder}`,
  boxShadow: "0 10px 30px rgba(0,0,0,.12)",
  opacity: 0,
  transform: "translateY(-4px)",
  pointerEvents: "none",
  transition: "opacity .15s ease, transform .15s ease",
  zIndex: 20,
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
  color: colorFg,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  textAlign: "left",
  selectors: {
    "&:hover": {
      background: "color-mix(in srgb, currentColor 8%, transparent)",
    },
    "&:focus-visible": {
      outline: `2px solid ${colorPrimary}`,
      outlineOffset: 2,
    },
  },
});

export const modalOverlay = style({
  inset: 0,
  position: "fixed",
  background: modalOverlayBg, // 토큰
});

export const modalContent = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "8px",
  overflow: "hidden",
  outline: "none",
  background: modalBg, // 토큰
  minWidth: "400px",
  boxShadow: "0 10px 30px rgba(0,0,0,.2)",
  padding: "16px",
  border: `1px solid ${colorBorder}`,
  color: colorFg,
});
