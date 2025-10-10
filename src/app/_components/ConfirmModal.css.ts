// src/app/_components/ConfirmModal.css.ts
import { style } from "@vanilla-extract/css";
import {
  modalOverlayBg,
  modalBg,
  modalTextMuted,
  modalBtnBg,
  modalBtnBorder,
  modalBtnFg,
  modalBtnPrimaryBg,
  modalBtnPrimaryFg,
} from "@/app/_styles/tokens.css";

/** react-modal overlay */
export const overlay = style({
  position: "fixed",
  inset: 0,
  background: modalOverlayBg, // ✅ 토큰
  display: "grid",
  placeItems: "center",
  padding: 16,
  zIndex: 60,
});

/** react-modal content */
export const content = style({
  outline: "none",
  border: "none",
  borderRadius: 16,
  background: modalBg, // ✅ 토큰
  boxShadow: "0 10px 30px rgba(0,0,0,.20)", // 그림자는 색상 토큰 아님(요청사항 유지)
  minWidth: 300,
  maxWidth: 560,
  width: "100%",
  overflow: "hidden",
  "@media": {
    "(prefers-color-scheme: dark)": {
      // 다크에선 요청하신 대로 더 깊은 그림자 유지
      boxShadow: "0 10px 30px rgba(0,0,0,.55)",
    },
  },
});

/** 내부 컨테이너 */
export const body = style({
  padding: 20,
});

/** 제목 */
export const title = style({
  margin: 0,
  fontSize: 18,
  fontWeight: 700,
  lineHeight: 1.3,
});

/** 설명 */
export const description = style({
  marginTop: 12,
  lineHeight: 1.6,
  color: modalTextMuted, // ✅ 토큰
});

/** 하단 버튼 영역 */
export const actions = style({
  marginTop: 16,
  display: "flex",
  gap: 8,
  justifyContent: "flex-end",
});

/** 버튼 공통 */
export const btn = style({
  appearance: "none",
  border: `1px solid ${modalBtnBorder}`, // ✅ 토큰
  background: modalBtnBg, // ✅ 토큰
  color: modalBtnFg, // ✅ 토큰
  borderRadius: 10,
  padding: "8px 14px",
  fontSize: 14,
  cursor: "pointer",
});

/** 주요(확인/삭제) 버튼 */
export const btnPrimary = style({
  border: "none",
  background: modalBtnPrimaryBg, // ✅ 토큰
  color: modalBtnPrimaryFg, // ✅ 토큰
});
