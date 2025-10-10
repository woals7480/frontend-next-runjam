import { style } from "@vanilla-extract/css";
import {
  colorBg,
  colorBorder,
  colorFg,
  colorPrimary,
} from "@/app/_styles/tokens.css";

const radius = "16px";

// 살짝 투명한 서피스(글래스 느낌)
const glassBg = `color-mix(in srgb, ${colorBg} 92%, transparent)`;
const softBg = `color-mix(in srgb, ${colorBg} 92%, transparent)`; // modal 등에도 재사용
const mutedText = `color-mix(in srgb, ${colorFg} 65%, transparent)`; // 보조 텍스트
const hoverBg = "color-mix(in srgb, currentColor 8%, transparent)"; // 공통 hover

export const card = style({
  borderRadius: radius,
  background: glassBg,
  border: `1px solid ${colorBorder}`,
  boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
  overflow: "hidden",
  backdropFilter: "saturate(120%) blur(8px)",
  WebkitBackdropFilter: "saturate(120%) blur(8px)",
  "@media": {
    "(prefers-color-scheme: dark)": {
      // 다크에선 그림자만 조금 깊게
      boxShadow: "0 6px 22px rgba(0,0,0,0.4)",
    },
  },
});

export const inner = style({
  padding: "16px",
  color: colorFg,
});

export const headRow = style({
  display: "flex",
  justifyContent: "space-between",
  color: colorFg,
});

export const headRowLeft = style({
  display: "grid",
  gridTemplateColumns: "64px 1fr",
  columnGap: "12px",
  alignItems: "center",
});

export const headRowRight = style({
  position: "relative",
});

export const dots = style({
  cursor: "pointer",
  color: colorFg,
});

export const thumb = style({
  width: 64,
  height: 64,
  borderRadius: "12px",
  background: `color-mix(in srgb, ${colorBg} 75%, transparent)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${colorBorder}`,
  color: colorFg,
});

export const title = style({
  fontSize: "18px",
  fontWeight: 700,
  lineHeight: 1.15,
  margin: 0,
  color: colorFg,
});

export const subtitle = style({
  marginTop: "4px",
  fontSize: "13px",
  color: mutedText,
});

export const metrics = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "8px",
  marginTop: "14px",
  color: colorFg,
});

export const metric = style({
  display: "grid",
  rowGap: 2,
  justifyItems: "start",
});

export const value = style({
  fontSize: "24px",
  fontWeight: 800,
  letterSpacing: "-0.2px",
  color: colorFg,
});

export const label = style({
  fontSize: "12px",
  color: mutedText,
});

export const menu = style({
  position: "absolute",
  top: "18px",
  right: 0,
  minWidth: 140,
  padding: 6,
  borderRadius: 12,
  background: softBg,
  border: `1px solid ${colorBorder}`,
  boxShadow: "0 10px 30px rgba(0,0,0,.12)",
  opacity: 0,
  transform: "translateY(-4px)",
  pointerEvents: "none",
  transition: "opacity .15s ease, transform .15s ease",
  zIndex: 20,
  color: colorFg,
});

export const menuOpen = style({
  opacity: 1,
  transform: "translateY(0)",
  pointerEvents: "auto",
});

export const item = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 10px",
  borderRadius: 8,
  fontSize: 14,
  lineHeight: 1.1,
  color: colorFg,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  textAlign: "left",
  selectors: {
    "&:hover": { background: hoverBg },
    "&:focus-visible": {
      outline: `2px solid ${colorPrimary}`,
      outlineOffset: 2,
    },
  },
});

export const itemIcon = style({ width: 16, height: 16, color: colorFg });

export const modalOverlay = style({
  inset: 0,
  position: "fixed",
  background: "rgba(0,0,0,.45)", // 오버레이는 토큰 영향 안 받는 게 자연스러움
});

export const modalContent = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "8px",
  overflow: "hidden",
  outline: "none",
  background: colorBg,
  minWidth: "400px",
  boxShadow: "0 10px 30px rgba(0,0,0,.2)",
  padding: "16px",
  border: `1px solid ${colorBorder}`,
  color: colorFg,
});

export const divider = style({
  height: 1,
  background: `color-mix(in srgb, ${colorBorder} 100%, transparent)`,
  margin: "0 16px",
});

export const shoeWrap = style({
  cursor: "pointer",
  padding: "16px",
  display: "flex",
  alignItems: "center",
  borderRadius: 10,
  selectors: {
    "&:hover": { background: hoverBg },
  },
  color: colorFg,
});

export const shoeName = style({
  fontSize: "18px",
  marginLeft: "12px",
  color: colorFg,
});
