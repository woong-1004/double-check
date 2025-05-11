import type { Metadata } from "next";
import fs from "fs/promises";
import path from "path";
import type {
  RawNewsItem,
  ProcessedNewsItem,
  GroupedNewsTopic,
} from "@/types/news";
import NewsCheckClientContent from "@/components/news-check/NewsCheckClientContent";

export const metadata: Metadata = {
  title: "뉴스 교차 검증",
  description:
    "다양한 언론사의 뉴스와 AI 요약, 팩트체크를 비교하여 이슈를 다각도로 분석합니다. 정치적 편향성에 대한 이해를 돕습니다.",
  openGraph: {
    title: "뉴스 교차 검증 - Double Check",
    description:
      "최신 정치 이슈에 대한 다양한 언론사의 보도와 AI 요약을 비교 분석하세요.",
    url: "/news-check",
  },
};

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
    return videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId) ? videoId : undefined;
  } catch (e) {
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

    // First, group items by topic and date combination
    const groupedByTopicAndDate: { [key: string]: RawNewsItem[] } = {};
    rawNewsItems.forEach((item) => {
      const key = `${item.topic}-${item.date}`;
      if (!groupedByTopicAndDate[key]) {
        groupedByTopicAndDate[key] = [];
      }
      groupedByTopicAndDate[key].push(item);
    });

    // Convert each topic-date group into a GroupedNewsTopic
    const result: GroupedNewsTopic[] = Object.entries(groupedByTopicAndDate).map(
      ([key, items]) => {
        const firstItem = items[0];
        
        const processedItems: ProcessedNewsItem[] = items.map((item, index) => ({
          id: item.id || `${item.media}-${item.date}-${index}`,
          politicalOrientation: item.politicalOrientation,
          media: item.media,
          videoLink: item.videoLink,
          aiSummary: item.aiSummary,
          youtubeVideoId: getYouTubeVideoId(item.videoLink),
        }));

        return {
          topic: firstItem.topic,
          date: firstItem.date,
          items: processedItems,
          commonFactCheck: firstItem.topicFactCheck,
        };
      }
    );

    // Sort by date in descending order (newest first)
    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Failed to read or parse news data:", error);
    return [];
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