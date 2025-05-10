import type { Metadata } from "next";
import Link from "next/link";
// import dynamic from "next/dynamic"; // dynamic import는 CopilotPopupLoader로 이동
import {
  DocumentTextIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import CopilotPopupLoader from "@/components/common/CopilotPopupLoader"; // 새로 만든 로더 컴포넌트 import

// DynamicCopilotPopupClient 정의 제거
// const DynamicCopilotPopupClient = dynamic(
//   () => import("@/components/common/CopilotPopupClient"),
//   {
//     ssr: false,
//   }
// );

export const metadata: Metadata = {
  title: "홈 | Double Check - 교차검증 플랫폼", // 템플릿 사용 안 함 (기본값이므로)
  description:
    "Double Check는 다양한 정치적 시각과 정책 정보를 비교 분석하여 사용자의 합리적인 판단을 돕는 교차검증 플랫폼입니다. 주요 후보들의 정책과 최신 뉴스에 대한 다각적 분석을 제공합니다.",
  openGraph: {
    title: "Double Check - 당신의 정보 교차검증 파트너",
    description:
      "뉴스, 정책, 공약 정보를 한 곳에서 비교하고 균형 잡힌 시각을 얻으세요.",
    url: "/",
    // 기본 OG 이미지는 layout.tsx에서 상속받으므로 여기서는 생략 가능
    // 필요시 특정 이미지를 지정: images: ['/og-image-home.png'],
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            더블체크
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            정치적 의견에 대한 다양한 시각을 한눈에 확인하세요
          </p>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Policy Check Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <div className="p-4 bg-blue-100 rounded-full mb-6">
                <DocumentTextIcon className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                정책체크
              </h2>
              <p className="text-gray-600 mb-6">
                대선 후보들의 주요 정책을 한눈에 비교하여 투표 결정에 도움을
                드립니다
              </p>
              <Link href="/policy-check">
                <span className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer">
                  정책 비교하기
                </span>
              </Link>
            </div>

            {/* News Check Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <div className="p-4 bg-purple-100 rounded-full mb-6">
                <PencilSquareIcon className="h-10 w-10 text-purple-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                뉴스체크
              </h2>
              <p className="text-gray-600 mb-6">
                정치 이슈에 대한 좌우 언론의 관점 차이를 비교하여 균형 잡힌
                시각을 제공합니다
              </p>
              <Link href="/news-check">
                <span className="inline-block px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300 cursor-pointer">
                  뉴스 비교하기
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* <DynamicCopilotPopupClient /> */}
      <CopilotPopupLoader /> {/* 새로 만든 로더 컴포넌트 사용 */}
    </div>
  );
}
