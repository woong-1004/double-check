import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";
// import Link from "next/link"; // Header에서 사용하므로 여기서는 제거 가능
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
  return (
    <html lang="ko">
      <body
        className={`${inter.className} bg-gray-50 text-gray-800 flex flex-col min-h-screen`}
      >
        <CopilotKit runtimeUrl={process.env.NEXT_PUBLIC_CHAT_API_BASE_URL}>
          <Header />
          <main className="pt-16">
            {/* pt-24는 헤더 높이(p-4 = 1rem = 16px, 16px*1.5=24px 정도 여유) + 추가여백. 실제 헤더 높이에 맞게 조정 필요 */}
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </main>{" "}
          <Footer />
        </CopilotKit>
      </body>
    </html>
  );
}
