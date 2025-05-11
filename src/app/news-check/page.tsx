import type { Metadata } from "next";
import fs from "fs/promises";
import path from "path";
import type {
  RawNewsItem,
  ProcessedNewsItem,
  GroupedNewsTopic,
} from "@/types/news";
import NewsCheckClientContent from "@/components/news-check/NewsCheckClientContent"; // 추후 사용 -> 주석 해제

export const metadata: Metadata = {
  title: "뉴스 교차 검증", // layout.tsx의 title.template에 의해 "뉴스 교차 검증 | Double Check"가 됨
  description:
    "다양한 언론사의 뉴스와 AI 요약, 팩트체크를 비교하여 이슈를 다각도로 분석합니다. 정치적 편향성에 대한 이해를 돕습니다.",
  openGraph: {
    title: "뉴스 교차 검증 - Double Check",
    description:
      "최신 정치 이슈에 대한 다양한 언론사의 보도와 AI 요약을 비교 분석하세요.",
    url: "/news-check",
    // 이 페이지를 위한 특정 OG 이미지가 있다면 여기에 추가 (예: images: ['/og-image-news.png'])
  },
};

// 유튜브 비디오 ID 추출 헬퍼 함수
function getYouTubeVideoId(url?: string): string | undefined {
  if (!url) return undefined;
  let videoId: string | undefined;
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.hostname.includes("youtube.com")) {
      if (urlObj.pathname === "/watch") {
        videoId = urlObj.searchParams.get("v") || undefined;
      } else if (urlObj.pathname.startsWith("/embed/")) {
        videoId = urlObj.pathname.split("/embed/")[1];
      } else if (urlObj.pathname.startsWith("/v/")) {
        videoId = urlObj.pathname.split("/v/")[1];
      }
    }
    // 짧은 ID 형식 (11자리)인지 간단히 확인. 더 엄격한 정규식 사용 가능.
    return videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId) ? videoId : undefined;
  } catch (e) {
    // URL 파싱 실패 등 예외 발생 시 콘솔에 로그 남기고 undefined 반환
    console.error(`Failed to parse YouTube URL: ${url}`, e);
    return undefined;
  }
}

async function getNewsData(): Promise<GroupedNewsTopic[]> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "newsCheckData.json"
  );
  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const rawNewsItems: RawNewsItem[] = JSON.parse(fileContents);

    const groupedByTopicAndDate: { [key: string]: GroupedNewsTopic } = {};

    rawNewsItems.forEach((item, index) => {
      const groupKey = `${item.topic}#-#${item.date}`; // 복합 키 사용

      if (!groupedByTopicAndDate[groupKey]) {
        groupedByTopicAndDate[groupKey] = {
          topic: item.topic,
          date: item.date,
          items: [],
          commonFactCheck: item.topicFactCheck, // 첫 번째 아이템의 팩트체크를 공통으로 사용
        };
      }

      // 임시 고유 ID 생성 (더 견고한 방법으로 대체 가능)
      const itemId =
        item.id ||
        `${item.media}-${item.date}-${item.aiSummary
          .substring(0, 20)
          .replace(/\s+/g, "-")}-${index}`;

      const processedItem: ProcessedNewsItem = {
        id: itemId,
        politicalOrientation: item.politicalOrientation,
        media: item.media,
        videoLink: item.videoLink,
        aiSummary: item.aiSummary,
        youtubeVideoId: getYouTubeVideoId(item.videoLink),
      };
      groupedByTopicAndDate[groupKey].items.push(processedItem);
    });

    return Object.values(groupedByTopicAndDate);
  } catch (error) {
    console.error("Failed to read or parse news data:", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
}

export default async function NewsCheckPage() {
  const groupedNewsTopics = await getNewsData();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 md:p-8">
        <NewsCheckClientContent initialGroupedNews={groupedNewsTopics} />
      </div>
    </div>
  );
}
