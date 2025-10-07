import { style } from "@vanilla-extract/css";

const borderLight = "rgba(0,0,0,.08)";
const borderSoft = "rgba(0,0,0,.06)";

export const wrap = style({
  border: `1px solid ${borderLight}`,
  borderRadius: 16,
  boxShadow: "0 4px 16px rgba(0,0,0,.06)",
  padding: 12,
  // 둥근 모서리 밖으로 내용이 넘어가지 않게
  overflow: "hidden",
  background: "rgba(255,255,255,.7)",
  backdropFilter: "blur(8px)",
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
  fontSize: 14,
  opacity: 0.85,
  // (옵션) 세로 스크롤이 생기는 레이아웃에서도 상단 고정시키고 싶다면 주석 해제
  // position: "sticky",
  // top: 0,
  // background: "inherit",
  // paddingBottom: 8,
  // zIndex: 1,
});

/** ⬇️ 카드 전용 스크롤 컨테이너 */
export const scroller = style({
  overflowX: "auto",
  overflowY: "hidden",
  scrollSnapType: "x mandatory",
  padding: "0 8px 4px", // 좌우·하단 여백 (테두리에 딱 붙지 않게)
  msOverflowStyle: "none",
  scrollbarWidth: "thin",
  selectors: {
    "&::-webkit-scrollbar": { height: 6 },
    "&::-webkit-scrollbar-thumb": {
      background: "rgba(0,0,0,.2)",
      borderRadius: 4,
    },
  },
});

/** 실제 카드 그리드 */
export const grid = style({
  display: "grid",
  gap: 8,
  // 모바일: 가로 스크롤 + 고정폭 카드
  gridTemplateColumns: "repeat(7, 112px)",
  "@media": {
    "(min-width: 768px)": {
      // 태블릿 이상: 7등분로 꽉 차게
      gridTemplateColumns: "repeat(7, minmax(112px, 1fr))",
    },
  },
});

export const day = style({
  borderRadius: 12,
  padding: 10,
  display: "grid",
  justifyItems: "center",
  alignContent: "start",
  gap: 6,
  border: `1px solid ${borderSoft}`,
  background: "transparent",
  minWidth: 112,
  scrollSnapAlign: "start",
});

export const icon = style({
  width: 48,
  height: 48,
  display: "grid",
  placeItems: "center",
  fontSize: 34,
});
export const dow = style({ fontSize: 13, opacity: 0.85 });
export const temp = style({ fontSize: 16, fontWeight: 700 });
export const sub = style({
  fontSize: 12,
  opacity: 0.9,
  textAlign: "center",
  lineHeight: 1.3,
});
