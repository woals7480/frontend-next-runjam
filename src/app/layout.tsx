import { appRoot } from "@/app/_styles/tokens.css";
import RQProvider from "@/app/_components/RQProvider";
import AuthSync from "@/app/_components/AuthSync";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={appRoot}>
        <RQProvider>
          {/* <AuthSync /> */}
          {children}
        </RQProvider>
      </body>
    </html>
  );
}
