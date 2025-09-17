import { style } from "@vanilla-extract/css";

export const mainWrapper = style({
  maxWidth: 720,
  margin: "0 auto",
  padding: "20px 16px 40px",
});

export const sectionTitle = style({
  fontSize: 20,
  fontWeight: 800,
  margin: "8px 0 14px",
});

export const list = style({
  display: "grid",
  rowGap: 16,
});
