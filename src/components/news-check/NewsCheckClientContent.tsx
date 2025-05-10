"use client";

import { useState, useMemo, useEffect } from "react";
// import dynamic from "next/dynamic"; // CopilotPopupLoader로 이동
import type { GroupedNewsTopic } from "@/types/news";
import SearchBar from "@/components/common/SearchBar";
import NewsTopicDisplay from "./NewsTopicDisplay";
import CopilotPopupLoader from "@/components/common/CopilotPopupLoader"; // 로더 컴포넌트 import

// DynamicCopilotPopupClient 정의 제거
// const DynamicCopilotPopupClient = dynamic(
//   () => import("../common/CopilotPopupClient"),
//   {
//     ssr: false,
//   }
// );

interface NewsCheckClientContentProps {
  initialGroupedNews: GroupedNewsTopic[];
}

// const ITEMS_PER_PAGE = 3; // 주제 내 아이템 페이지당 수 -> 제거
const TOPIC_GROUPS_PER_PAGE = 3; // 페이지당 보여줄 토픽 그룹 수

export default function NewsCheckClientContent({
  initialGroupedNews,
}: NewsCheckClientContentProps) {
  const [groupedNews] = useState<GroupedNewsTopic[]>(initialGroupedNews);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // 각 주제별 내부 아이템 페이지 상태 -> 제거
  // const [currentPageByTopic, setCurrentPageByTopic] = useState<{
  //   [key: string]: number;
  // }>({});

  // 토픽 그룹 페이지 상태
  const [currentPageForTopicGroups, setCurrentPageForTopicGroups] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 주제 내 아이템 페이지 변경 핸들러 -> 제거
  // const handleItemPageChange = (topicDateKey: string, newPage: number) => {
  //   setCurrentPageByTopic((prev) => ({
  //     ...prev,
  //     [topicDateKey]: newPage,
  //   }));
  // };

  // 토픽 그룹 페이지 변경 핸들러
  const handleTopicGroupPageChange = (newPage: number) => {
    setCurrentPageForTopicGroups(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredNews = useMemo(() => {
    if (!debouncedSearchTerm) {
      return groupedNews;
    }
    return groupedNews.filter((group) => {
      const searchTermLower = debouncedSearchTerm.toLowerCase();
      const topicMatch = group.topic.toLowerCase().includes(searchTermLower);
      const mediaMatch = group.items.some(
        (item) =>
          item.media.toLowerCase().includes(searchTermLower) ||
          (item.politicalOrientation &&
            item.politicalOrientation.toLowerCase().includes(searchTermLower))
      );
      const summaryMatch = group.items.some((item) =>
        item.aiSummary.toLowerCase().includes(searchTermLower)
      );
      const factCheckMatch =
        group.commonFactCheck &&
        group.commonFactCheck.toLowerCase().includes(searchTermLower);
      return topicMatch || mediaMatch || summaryMatch || factCheckMatch;
    });
  }, [debouncedSearchTerm, groupedNews]);

  // 검색 결과 변경 시 토픽 그룹 페이지 1로 초기화
  useEffect(() => {
    setCurrentPageForTopicGroups(1);
  }, [filteredNews]);

  // 각 토픽 그룹 내부의 아이템 페이지 상태 초기화 (filteredNews 변경 시) -> 제거
  // useEffect(() => {
  //   const initialItemPages: { [key: string]: number } = {};
  //   filteredNews.forEach((group) => {
  //     const topicDateKey = `${group.topic}-${group.date}`;
  //     initialItemPages[topicDateKey] = 1;
  //   });
  //   setCurrentPageByTopic(initialItemPages);
  // }, [filteredNews]);

  // 토픽 그룹 페이지네이션 로직
  const totalFilteredTopicGroups = filteredNews.length;
  const totalTopicGroupPages = Math.ceil(
    totalFilteredTopicGroups / TOPIC_GROUPS_PER_PAGE
  );

  const paginatedTopicGroups = useMemo(() => {
    const startIndex = (currentPageForTopicGroups - 1) * TOPIC_GROUPS_PER_PAGE;
    const endIndex = startIndex + TOPIC_GROUPS_PER_PAGE;
    return filteredNews.slice(startIndex, endIndex);
  }, [filteredNews, currentPageForTopicGroups]);

  const renderPaginationControls = () => {
    if (totalTopicGroupPages <= 1) return null;
    return (
      <div className="my-8 flex justify-center items-center space-x-4">
        <button
          onClick={() =>
            handleTopicGroupPageChange(currentPageForTopicGroups - 1)
          }
          disabled={currentPageForTopicGroups === 1}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          이전 토픽 그룹
        </button>
        <span className="text-sm text-gray-700">
          {currentPageForTopicGroups} / {totalTopicGroupPages} 페이지
        </span>
        <button
          onClick={() =>
            handleTopicGroupPageChange(currentPageForTopicGroups + 1)
          }
          disabled={currentPageForTopicGroups === totalTopicGroupPages}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          다음 토픽 그룹
        </button>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-gray-800">
        뉴스 체크
      </h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        다양한 시각의 뉴스와 AI 요약, 팩트체크를 비교해보세요.
      </p>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="뉴스 주제 또는 미디어 이름으로 검색..."
      />
      {debouncedSearchTerm && filteredNews.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="mt-2 text-xl font-medium text-gray-900">
            검색 결과 없음
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            &apos;{debouncedSearchTerm}&apos;에 대한 검색 결과가 없습니다. 다른
            검색어를 시도해 보세요.
          </p>
        </div>
      ) : (
        <>
          {renderPaginationControls()}
          {paginatedTopicGroups.map((group) => {
            const topicDateKey = `${group.topic}-${group.date}`;
            // 아이템 페이지네이션 관련 로직 제거
            // const currentItemPage = currentPageByTopic[topicDateKey] || 1;
            // const totalItemsInGroup = group.items.length;
            // const totalItemPagesInGroup = Math.ceil(totalItemsInGroup / ITEMS_PER_PAGE);

            // const startIndex = (currentItemPage - 1) * ITEMS_PER_PAGE;
            // const endIndex = startIndex + ITEMS_PER_PAGE;
            // const paginatedItemsInGroup = group.items.slice(startIndex, endIndex);

            return (
              <NewsTopicDisplay
                key={topicDateKey}
                group={group} // 이제 group.items는 전체 아이템을 가짐
                // currentPage, totalPages, onPageChange, itemsPerPage, totalItems props 전달 제거
              />
            );
          })}
          {renderPaginationControls()}
        </>
      )}
      {/* <DynamicCopilotPopupClient /> */}
      <CopilotPopupLoader /> {/* 로더 컴포넌트 사용 */}
    </div>
  );
}
