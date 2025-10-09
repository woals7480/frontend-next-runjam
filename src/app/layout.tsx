import { appRoot } from "@/app/_styles/tokens.css";
import RQProvider from "@/app/_components/RQProvider";
import "./global.css.ts";
import { pretendard } from "@/font/font";
import clsx from "clsx";
import ModalSetup from "./_components/ModalSetup";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={clsx(pretendard.variable, appRoot)}>
        <ModalSetup />
        <Toaster position="bottom-center" />
        <RQProvider>
          <div id="app-root">{children}</div>
        </RQProvider>
      </body>
    </html>
  );
}
