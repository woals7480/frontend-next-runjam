import { appRoot } from "@/app/_styles/tokens.css";
import RQProvider from "@/app/_components/RQProvider";
import "./global.css.ts";
import { pretendard } from "@/font/font";
import clsx from "clsx";
import ModalSetup from "./_components/ModalSetup";
import { Toaster } from "react-hot-toast";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RunJam | 러너들의 기록 플랫폼",
  description: "러닝을 더 즐겁게, RunJam에서 달리기 기록을 관리하세요.",
  openGraph: {
    title: "RunJam",
    description: "러너들의 기록 플랫폼",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "RunJam",
    images: [
      {
        url: "/icons/og-runjam.png",
        width: 1200,
        height: 630,
        alt: "RunJam Preview",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icons/logo-mark-runjam.png", type: "image/png", sizes: "any" },
    ],
    apple: [{ url: "/icons/logo-mark-runjam.png" }],
  },
};

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
