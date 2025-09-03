import { createVar, style } from "@vanilla-extract/css";

export const colorBg = createVar();
export const colorFg = createVar();
export const colorPrimary = createVar();
export const colorBorder = createVar();
export const colorDanger = createVar();

export const appRoot = style({
  vars: {
    [colorBg]: "#ffffff",
    [colorFg]: "#111827",
    [colorPrimary]: "#2563eb",
    [colorBorder]: "#e5e7eb",
    [colorDanger]: "#dc2626",
  },
});
