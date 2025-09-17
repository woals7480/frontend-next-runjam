import { appRoot } from "@/app/_styles/tokens.css";
import RQProvider from "@/app/_components/RQProvider";
import AuthSync from "@/app/_components/AuthSync";
import "./global.css.ts";
import { pretendard } from "@/font/font";
import clsx from "clsx";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={clsx(pretendard.variable, appRoot)}>
        <RQProvider>
          {/* <AuthSync /> */}
          {children}
        </RQProvider>
      </body>
    </html>
  );
}
