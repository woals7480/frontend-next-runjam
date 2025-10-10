import { style } from "@vanilla-extract/css";
import { colorBg, colorBorder, colorFg } from "@/app/_styles/tokens.css";

export const wrap = style({
  border: `1px solid ${colorBorder}`,
  borderRadius: 16,
  boxShadow: "0 4px 16px rgba(0,0,0,.06)",
  padding: 12,
  overflow: "hidden",
  background: colorBg,
  color: colorFg,

  "@media": {
    "(prefers-color-scheme: dark)": {
      boxShadow: "0 8px 24px rgba(0,0,0,.5)",
    },
  },
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
  fontSize: 14,
  color: colorFg,
  opacity: 0.85,
});

export const scroller = style({
  overflowX: "auto",
  overflowY: "hidden",
  scrollSnapType: "x mandatory",
  padding: "0 8px 4px",
  msOverflowStyle: "none",
  scrollbarWidth: "thin",
  selectors: {
    "&::-webkit-scrollbar": { height: 6 },
    "&::-webkit-scrollbar-thumb": {
      background: colorBorder,
      borderRadius: 4,
    },
  },
});

export const grid = style({
  display: "grid",
  gap: 8,
  gridTemplateColumns: "repeat(7, 112px)",
  "@media": {
    "(min-width: 768px)": {
      gridTemplateColumns: "repeat(7, minmax(112px, 1fr))",
    },
  },
});

export const day = style({
  borderRadius: 12,
  padding: 10,
  display: "grid",
  justifyItems: "center",
  alignContent: "start",
  gap: 6,
  border: `1px solid ${colorBorder}`,
  background: "transparent",
  minWidth: 112,
  scrollSnapAlign: "start",
  color: colorFg,
});

export const icon = style({
  width: 48,
  height: 48,
  display: "grid",
  placeItems: "center",
  fontSize: 34,
  color: colorFg,
});

export const dow = style({
  fontSize: 13,
  opacity: 0.85,
  color: colorFg,
});

export const temp = style({
  fontSize: 16,
  fontWeight: 700,
  color: colorFg,
});

export const sub = style({
  fontSize: 12,
  opacity: 0.9,
  textAlign: "center",
  lineHeight: 1.3,
  color: colorFg,
});
