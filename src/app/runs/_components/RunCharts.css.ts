import { style } from "@vanilla-extract/css";
import {
  colorBg,
  colorBorder,
  colorFg,
  colorPrimary,
} from "@/app/_styles/tokens.css";

export const page = style({
  maxWidth: 720,
  margin: "0 auto",
  border: `1px solid ${colorBorder}`,
  padding: 16,
  borderRadius: 16,
  background: colorBg,
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 16,
  color: colorFg,
});

export const title = style({
  fontSize: 24,
  fontWeight: 800,
  color: colorFg,
});

export const tabs = style({
  display: "grid",
  gridAutoFlow: "column",
  gap: 8,
});

export const tabBtn = style({
  padding: "10px 14px",
  borderRadius: 999,
  border: `1px solid ${colorBorder}`,
  background: colorBg,
  color: colorFg,
  cursor: "pointer",
  selectors: {
    '&[data-active="true"]': {
      background: colorPrimary,
      color: "#fff",
      borderColor: colorPrimary,
    },
  },
});

export const summaryGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 12,
  marginTop: 8,
  marginBottom: 16,
});

export const card = style({
  padding: 14,
  border: `1px solid ${colorBorder}`,
  borderRadius: 16,
  background: colorBg,
  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 12,
  "@media": {
    "(prefers-color-scheme: dark)": {
      boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
    },
  },
});

export const metricLabel = style({
  fontSize: 12,
  opacity: 0.65,
  color: colorFg,
});

export const metricValue = style({
  fontSize: "1rem",
  fontWeight: 800,
  lineHeight: 1.1,
  display: "flex",
  justifyContent: "flex-end",
  color: colorFg,
});

export const chartWrap = style({
  width: "100%",
  height: 260,
});

export const section = style({
  marginTop: 12,
});
