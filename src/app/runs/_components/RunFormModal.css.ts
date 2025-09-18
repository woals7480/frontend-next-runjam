// src/app/_components/RunFormModal.css.ts
import { style } from "@vanilla-extract/css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.45)",
  display: "grid",
  placeItems: "center",
  padding: 16,
  zIndex: 70,
});

export const content = style({
  outline: "none",
  border: "none",
  borderRadius: 16,
  background: "#fff",
  minWidth: 340,
  maxWidth: 560,
  width: "100%",
  boxShadow: "0 10px 30px rgba(0,0,0,.20)",
  overflow: "hidden",
  "@media": {
    "(prefers-color-scheme: dark)": {
      background: "#1f2937",
      boxShadow: "0 10px 30px rgba(0,0,0,.55)",
    },
  },
});

export const header = style({
  padding: "18px 20px",
  borderBottom: "1px solid #e5e7eb",
  fontWeight: 700,
  "@media": {
    "(prefers-color-scheme: dark)": { borderBottom: "1px solid #374151" },
  },
});

export const body = style({
  padding: 20,
  display: "grid",
  gap: 14,
});

export const row = style({
  display: "grid",
  gap: 6,
});

export const label = style({
  fontSize: 14,
  color: "#374151",
  "@media": { "(prefers-color-scheme: dark)": { color: "#e5e7eb" } },
});

export const input = style({
  height: 40,
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  background: "#fff",
  padding: "0 12px",
  fontSize: 14,
  color: "#111827",
  selectors: {
    "&:focus": { outline: "2px solid #60a5fa", borderColor: "#93c5fd" },
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      background: "#111827",
      color: "#e5e7eb",
      border: "1px solid #374151",
    },
  },
});

export const textarea = style([
  input,
  {
    height: 96,
    padding: 12,
    resize: "vertical",
  },
]);

export const error = style({
  fontSize: 12,
  color: "#ef4444",
});

export const footer = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
  padding: "16px 20px",
  borderTop: "1px solid #e5e7eb",
  "@media": {
    "(prefers-color-scheme: dark)": { borderTop: "1px solid #374151" },
  },
});

export const btn = style({
  appearance: "none",
  borderRadius: 10,
  height: 38,
  padding: "0 14px",
  fontSize: 14,
  cursor: "pointer",
  border: "1px solid #e5e7eb",
  background: "#fff",
  color: "#111827",
  selectors: {
    "&:hover": { background: "#f9fafb" },
    "&:active": { background: "#f3f4f6" },
    "&:disabled": { opacity: 0.6, cursor: "not-allowed" },
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      background: "#27272a",
      border: "1px solid #3f3f46",
      color: "#e5e7eb",
      selectors: {
        "&:hover": { background: "#313135" },
        "&:active": { background: "#2a2a2e" },
      },
    },
  },
});

export const primary = style({
  border: "none",
  background: "#111827",
  color: "#fff",
  selectors: {
    "&:hover": { filter: "brightness(1.05)" },
    "&:active": { filter: "brightness(0.95)" },
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      background: "#e5e7eb",
      color: "#111827",
    },
  },
});
