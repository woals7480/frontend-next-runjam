// src/components/modal.css.ts
import { style } from "@vanilla-extract/css";

export const overlay = style({
  inset: 0,
  position: "fixed",
  background: "rgba(0,0,0,.45)",
});

export const content = style({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "16px",
  overflow: "hidden",
  outline: "none",
  background: "white",
  minWidth: "320px",
  boxShadow: "0 10px 30px rgba(0,0,0,.2)",
});
