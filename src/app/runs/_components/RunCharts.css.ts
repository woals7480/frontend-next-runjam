import { style } from "@vanilla-extract/css";

export const page = style({
  maxWidth: 720,
  margin: "0 auto",
  border: "1px solid #e5e7eb",
  padding: 16,
  borderRadius: 16,
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 16,
});

export const title = style({
  fontSize: 24,
  fontWeight: 800,
});

export const tabs = style({
  display: "grid",
  gridAutoFlow: "column",
  gap: 8,
});

export const tabBtn = style({
  padding: "10px 14px",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
  background: "#fff",
  cursor: "pointer",
  selectors: {
    '&[data-active="true"]': {
      background: "#2563eb",
      color: "#fff",
      borderColor: "#2563eb",
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
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  background: "#fff",
  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 12,
});

export const metricLabel = style({ fontSize: 12, opacity: 0.65 });
export const metricValue = style({
  fontSize: "1rem",
  fontWeight: 800,
  lineHeight: 1.1,
  display: "flex",
  justifyContent: "flex-end",
});

export const chartWrap = style({
  width: "100%",
  height: 260,
});

export const section = style({
  marginTop: 12,
});
