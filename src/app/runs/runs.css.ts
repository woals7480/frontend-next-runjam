import { style } from "@vanilla-extract/css";

export const mainWrapper = style({
  maxWidth: 720,
  margin: "0 auto",
  padding: "20px 16px 40px",
});

export const sectionHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const sectionTitle = style({
  fontSize: 20,
  fontWeight: 800,
  margin: "8px 0 14px",
});

export const plusBtn = style({
  border: "none",
  backgroundColor: "inherit",
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
  color: "inherit",
});

export const helperText = style({
  fontSize: 14,
  opacity: 0.8,
});

export const retryBtn = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "8px 12px",
  borderRadius: 10,
  border: "1px solid currentColor",
  background: "transparent",
  color: "inherit",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  transition:
    "transform .06s ease, background-color .15s ease, opacity .15s ease",
  selectors: {
    "&:hover": { background: "rgba(0,0,0,0.06)" },
    "&:active": { transform: "translateY(1px)" },
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
    "&:focus-visible": { outline: "2px solid currentColor", outlineOffset: 2 },
  },
  // ✅ @media는 최상위에서, 그 안에 selectors를 다시 사용
  "@media": {
    "(prefers-color-scheme: dark)": {
      selectors: {
        "&:hover": { background: "rgba(255,255,255,0.06)" },
      },
    },
  },
});

export const inlineFetching = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  margin: "8px 0 12px",
  fontSize: 13,
  opacity: 0.9,
});

export const inlineFetchingText = style({
  fontSize: 13,
  lineHeight: "20px",
  opacity: 0.8,
});
