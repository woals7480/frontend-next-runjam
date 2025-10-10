// app/global.css.ts
import { createGlobalTheme, globalStyle } from "@vanilla-extract/css";

// CSS 변수 선언(기본값)
export const vars = createGlobalTheme(":root", {
  background: "#f9fafb",
  foreground: "#111827",
});

// 다크 모드에서 변수 값만 오버라이드
globalStyle(":root", {
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: {
        [vars.background]: "#202227ff",
        [vars.foreground]: "rgba(255,255,255,0.95)",
      },
    },
  },
});

// html, body 전역 규칙
globalStyle("html, body", {
  fontFamily: 'var(--font-pretendard), "Malgun Gothic", sans-serif',
  lineHeight: 1.55,
  letterSpacing: "0.005em",
  maxWidth: "100vw",
  overflowX: "hidden",
  background: vars.background,
  color: vars.foreground,
  transition: "background-color 160ms ease, color 160ms ease",
});

// body 전역 규칙
globalStyle("body", {
  color: vars.foreground,
  background: vars.background,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

globalStyle("input, textarea", {
  fontFamily: 'var(--font-pretendard), "Malgun Gothic", sans-serif',
});

// 리셋류
globalStyle("*", { boxSizing: "border-box", padding: 0, margin: 0 });

globalStyle("a", { color: "inherit", textDecoration: "none" });

globalStyle("ul", { listStyle: "none" });

globalStyle("button", {
  border: "none",
  backgroundColor: "inherit",
  cursor: "pointer",
});

// 다크 모드 color-scheme
globalStyle("html", {
  "@media": {
    "(prefers-color-scheme: dark)": { colorScheme: "dark" },
  },
});
