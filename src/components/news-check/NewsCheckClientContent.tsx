"use client";

import { useState, useMemo, useEffect } from "react";
import type { GroupedNewsTopic } from "@/types/news";
import SearchBar from "@/components/common/SearchBar";
import NewsTopicDisplay from "./NewsTopicDisplay";
import KeywordFilter from "./KeywordFilter";
import CopilotPopupLoader from "@/components/common/CopilotPopupLoader";

interface NewsCheckClientContentProps {
  initialGroupedNews: GroupedNewsTopic[];
}

const TOPIC_GROUPS_PER_PAGE = 3;

export default function NewsCheckClientContent({
  initialGroupedNews,
}: NewsCheckClientContentProps) {
  // Sort news by date initially
  const sortedInitialNews = [...initialGroupedNews].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const [groupedNews] = useState<GroupedNewsTopic[]>(sortedInitialNews);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [currentPageForTopicGroups, setCurrentPageForTopicGroups] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
  };

  const handleTopicGroupPageChange = (newPage: number) => {
    setCurrentPageForTopicGroups(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredNews = useMemo(() => {
    return groupedNews.filter((group) => {
      // Search term filter
      const searchTermLower = debouncedSearchTerm.toLowerCase();
      const matchesSearch =
        !debouncedSearchTerm ||
        group.topic.toLowerCase().includes(searchTermLower) ||
        group.items.some(
          (item) =>
            item.media.toLowerCase().includes(searchTermLower) ||
            (item.politicalOrientation &&
              item.politicalOrientation.toLowerCase().includes(searchTermLower)) ||
            item.aiSummary.toLowerCase().includes(searchTermLower)
        ) ||
        (group.commonFactCheck &&
          group.commonFactCheck.toLowerCase().includes(searchTermLower));

      // Keyword filter
      const matchesKeywords =
        selectedKeywords.length === 0 ||
        selectedKeywords.some(
          (keyword) =>
            group.topic.includes(keyword) ||
            group.items.some(
              (item) =>
                item.aiSummary.includes(keyword) ||
                item.media.includes(keyword)
            ) ||
            (group.commonFactCheck &&
              group.commonFactCheck.includes(keyword))
        );

      return matchesSearch && matchesKeywords;
    });
  }, [debouncedSearchTerm, groupedNews, selectedKeywords]);

  useEffect(() => {
    setCurrentPageForTopicGroups(1);
  }, [filteredNews]);

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
      <KeywordFilter
        selectedKeywords={selectedKeywords}
        onKeywordToggle={handleKeywordToggle}
      />
      {debouncedSearchTerm && filteredNews.length === 0 ? (
        <div className="text-center py-12">
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
            return (
              <NewsTopicDisplay
                key={topicDateKey}
                group={group}
              />
            );
          })}
          {renderPaginationControls()}
        </>
      )}
      <CopilotPopupLoader />
    </div>
  );
}