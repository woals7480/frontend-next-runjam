import { style } from "@vanilla-extract/css";
import { colorBorder, colorFg } from "@/app/_styles/tokens.css";

export const mainWrapper = style({
  maxWidth: 720,
  margin: "0 auto",
  padding: "20px 16px 40px",
  color: colorFg,
  background: "transparent",
});

export const sectionHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: colorFg,
});

export const sectionTitle = style({
  fontSize: 20,
  fontWeight: 800,
  margin: "8px 0 14px",
  color: colorFg,
});

export const plusBtn = style({
  border: "none",
  backgroundColor: "inherit",
  color: colorFg,
  cursor: "pointer",
});

export const list = style({
  display: "grid",
  rowGap: 16,
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

export const retryBtn = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "8px 12px",
  borderRadius: 10,
  border: `1px solid ${colorBorder}`,
  background: "transparent",
  color: colorFg,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  transition:
    "transform .06s ease, background-color .15s ease, opacity .15s ease",
  selectors: {
    // currentColor 기반 → 라이트/다크 모두 자연스럽게
    "&:hover": {
      background: "color-mix(in srgb, currentColor 8%, transparent)",
    },
    "&:active": { transform: "translateY(1px)" },
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
    "&:focus-visible": { outline: "2px solid currentColor", outlineOffset: 2 },
  },
});

export const inlineFetching = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  margin: "8px 0 12px",
  fontSize: 13,
  opacity: 0.9,
  color: colorFg,
});

export const inlineFetchingText = style({
  fontSize: 13,
  lineHeight: "20px",
  opacity: 0.8,
  color: colorFg,
});
