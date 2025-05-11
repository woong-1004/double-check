import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Double Check - 교차검증 플랫폼",
    template: "%s | Double Check",
  },
  description:
    "다양한 시각의 뉴스와 정책을 비교 분석하여 합리적인 판단을 돕는 교차검증 플랫폼입니다.",
  keywords: ["뉴스", "정책", "팩트체크", "교차검증", "선거", "정치", "후보자"],
  openGraph: {
    title: "Double Check - 교차검증 플랫폼",
    description:
      "다양한 시각의 뉴스와 정책을 비교 분석하여 합리적인 판단을 돕는 교차검증 플랫폼입니다.",
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "Double Check",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Double Check 로고",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Double Check - 교차검증 플랫폼",
    description:
      "다양한 시각의 뉴스와 정책을 비교 분석하여 합리적인 판단을 돕는 교차검증 플랫폼입니다.",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if the runtime URL is available
  const runtimeUrl = process.env.NEXT_PUBLIC_CHAT_API_BASE_URL;
  
  // If no runtime URL is available, render without CopilotKit
  if (!runtimeUrl) {
    return (
      <html lang="ko">
        <body
          className={`${inter.className} bg-gray-50 text-gray-800 flex flex-col min-h-screen`}
        >
          <Header />
          <main className="pt-8">
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </main>
          <Footer />
        </body>
      </html>
    );
  }

  return (
    <html lang="ko">
      <body
        className={`${inter.className} bg-gray-50 text-gray-800 flex flex-col min-h-screen`}
      >
        <CopilotKit runtimeUrl={runtimeUrl}>
          <Header />
          <main className="pt-8">
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </main>
          <Footer />
        </CopilotKit>
      </body>
    </html>
  );
}