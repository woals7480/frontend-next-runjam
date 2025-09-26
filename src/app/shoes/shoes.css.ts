// src/app/shoes/ShoesPage.css.ts
import { style } from "@vanilla-extract/css";

export const page = style({
  maxWidth: 720,
  margin: "0 auto",
  padding: "16px 20px 40px",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 0 16px",
});

export const title = style({
  fontSize: 20,
  fontWeight: 700,
});

export const addBtn = style({
  width: 36,
  height: 36,
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.08)",
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
  background: "white",
});

export const list = style({
  display: "grid",
  gap: 16,
  cursor: "pointer",
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
