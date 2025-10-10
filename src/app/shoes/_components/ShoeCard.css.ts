// src/app/shoes/_components/ShoeItem.css.ts
import { style } from "@vanilla-extract/css";
import { colorBg, colorFg, colorBorder } from "@/app/_styles/tokens.css";

const glassBg = `color-mix(in srgb, ${colorBg} 92%, transparent)`;
const thumbBg = `color-mix(in srgb, ${colorBg} 78%, transparent)`;
const mutedText = `color-mix(in srgb, ${colorFg} 60%, transparent)`;
const iconFg = `color-mix(in srgb, ${colorFg} 88%, transparent)`;

export const item = style({
  display: "grid",
  gridTemplateColumns: "72px 1fr 20px",
  columnGap: 16,
  alignItems: "center",
  padding: 12,
  borderRadius: 16,
  background: glassBg,
  border: `1px solid ${colorBorder}`,
  boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
  overflow: "hidden",
  backdropFilter: "saturate(120%) blur(8px)",
  WebkitBackdropFilter: "saturate(120%) blur(8px)",
  "@media": {
    "(prefers-color-scheme: dark)": {
      boxShadow: "0 6px 22px rgba(0,0,0,0.4)",
    },
  },
});

export const thumbWrap = style({
  width: 72,
  height: 72,
  borderRadius: 14,
  background: thumbBg,
  display: "grid",
  placeItems: "center",
  overflow: "hidden",
  border: `1px solid ${colorBorder}`,
});

export const name = style({
  fontSize: 20,
  fontWeight: 700,
  lineHeight: 1.2,
  color: colorFg,
});

export const kmText = style({
  marginTop: 6,
  fontSize: 16,
  color: mutedText,
});

export const chevron = style({
  color: iconFg,
});
