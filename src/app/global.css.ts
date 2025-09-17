// app/global.css.ts
import { createGlobalTheme, globalStyle } from "@vanilla-extract/css";

// CSS 변수 선언(기본값)
export const vars = createGlobalTheme(":root", {
  background: "#ffffff",
  foreground: "#171717",
});

// 다크 모드에서 변수 값만 오버라이드
globalStyle(":root", {
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: {
        [vars.background]: "#0a0a0a",
        [vars.foreground]: "#ededed",
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
});

// body 전역 규칙
globalStyle("body", {
  color: vars.foreground,
  background: vars.background,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

// 리셋류
globalStyle("*", { boxSizing: "border-box", padding: 0, margin: 0 });

globalStyle("a", { color: "inherit", textDecoration: "none" });

globalStyle("ul", { listStyle: "none" });

// 다크 모드 color-scheme
globalStyle("html", {
  "@media": {
    "(prefers-color-scheme: dark)": { colorScheme: "dark" },
  },
});
