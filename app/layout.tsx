import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "그 장면 해석 리포트 관리자",
  description: "관계 장면 리포트 자동화 관리자 MVP"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
