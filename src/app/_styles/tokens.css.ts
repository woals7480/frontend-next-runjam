import { createVar, style } from "@vanilla-extract/css";

export const colorBg = createVar();
export const colorFg = createVar();
export const colorPrimary = createVar();
export const colorBorder = createVar();
export const colorDanger = createVar();

export const modalOverlayBg = createVar();
export const modalBg = createVar();
export const modalInputBg = createVar();
export const modalTextMuted = createVar();
export const modalBtnBg = createVar();
export const modalBtnBorder = createVar();
export const modalBtnFg = createVar();
export const modalBtnPrimaryBg = createVar();
export const modalBtnPrimaryFg = createVar();

/** 시스템 설정에 따라 자동 전환 (prefers-color-scheme 전용) */
export const appRoot = style({
  // 기본(라이트)
  vars: {
    [colorBg]: "#ffffff",
    [colorFg]: "#111827",
    [colorPrimary]: "#2563eb",
    [colorBorder]: "#e5e7eb",
    [colorDanger]: "#dc2626",

    [modalOverlayBg]: "rgba(0,0,0,.45)",
    [modalBg]: "#ffffff",
    [modalTextMuted]: "#4b5563",
    [modalBtnBg]: "#ffffff",
    [modalInputBg]: "#ffffff",
    [modalBtnBorder]: "#e5e7eb",
    [modalBtnFg]: "#111827",
    [modalBtnPrimaryBg]: "#111827",
    [modalBtnPrimaryFg]: "#ffffff",
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: {
        [colorBg]: "#111318ff",
        [colorFg]: "rgba(255,255,255,0.92)",
        [colorPrimary]: "#2563eb", // 브랜드 컬러는 동일 유지
        [colorBorder]: "rgba(255,255,255,0.16)",
        [colorDanger]: "#ef4444",

        [modalOverlayBg]: "rgba(0,0,0,.45)", // 동일 유지
        [modalBg]: "rgba(28,28,28,.98)",
        [modalTextMuted]: "#9ca3af",
        [modalBtnBg]: "#27272a",
        [modalInputBg]: "#2c2828ff",
        [modalBtnBorder]: "#3f3f46",
        [modalBtnFg]: "#e5e7eb",
        [modalBtnPrimaryBg]: "#e5e7eb",
        [modalBtnPrimaryFg]: "#111827",
      },
    },
  },
});
