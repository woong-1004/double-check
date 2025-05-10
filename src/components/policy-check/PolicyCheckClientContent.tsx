"use client";

import React, { useState, useMemo } from "react";
// import dynamic from "next/dynamic"; // CopilotPopupLoader로 이동
import SearchBar from "@/components/common/SearchBar";
import CategoryFilter from "./CategoryFilter";
import PolicyListDisplay from "./PolicyListDisplay";
import type { GroupedPolicy } from "@/types/policy";
import CopilotPopupLoader from "@/components/common/CopilotPopupLoader"; // 로더 컴포넌트 import

// DynamicCopilotPopupClient 정의 제거
// const DynamicCopilotPopupClient = dynamic(
//   () => import("../common/CopilotPopupClient"),
//   {
//     ssr: false,
//     // 로딩 중 표시할 컴포넌트 (선택 사항)
//     // loading: () => <p>Loading Popup...</p>,
//   }
// );

interface PolicyCheckClientContentProps {
  initialGroupedPolicies: GroupedPolicy[];
  initialCategories: string[];
}

const TOPICS_PER_PAGE = 3; // 페이지당 보여줄 토픽 그룹 수

export default function PolicyCheckClientContent({
  initialGroupedPolicies,
  initialCategories,
}: PolicyCheckClientContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태

  const filteredAndSearchedPolicies = useMemo(() => {
    let policiesToDisplay = initialGroupedPolicies;
    if (selectedCategory !== "전체") {
      policiesToDisplay = policiesToDisplay.filter(
        (group) => group.category === selectedCategory
      );
    }
    if (searchTerm.trim() !== "") {
      const lowerSearchTerm = searchTerm.toLowerCase();
      policiesToDisplay = policiesToDisplay.filter(
        (group) =>
          group.topic.toLowerCase().includes(lowerSearchTerm) ||
          group.category.toLowerCase().includes(lowerSearchTerm) ||
          group.subcategory.toLowerCase().includes(lowerSearchTerm) ||
          group.candidates.some(
            (candidate) =>
              candidate.candidateName.toLowerCase().includes(lowerSearchTerm) ||
              candidate.content.toLowerCase().includes(lowerSearchTerm)
          )
      );
    }
    // 필터링/검색 후 페이지 변경 시 첫 페이지로 리셋
    // setCurrentPage(1); // 이 위치는 적절하지 않음, useEffect로 처리 필요
    return policiesToDisplay;
  }, [initialGroupedPolicies, selectedCategory, searchTerm]);

  // 필터링 또는 검색 결과가 변경될 때 현재 페이지를 1로 리셋
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  // 페이지네이션 로직
  const totalFilteredItems = filteredAndSearchedPolicies.length;
  const totalPages = Math.ceil(totalFilteredItems / TOPICS_PER_PAGE);

  const paginatedPolicies = useMemo(() => {
    const startIndex = (currentPage - 1) * TOPICS_PER_PAGE;
    const endIndex = startIndex + TOPICS_PER_PAGE;
    return filteredAndSearchedPolicies.slice(startIndex, endIndex);
  }, [filteredAndSearchedPolicies, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // 페이지 변경 시 스크롤을 맨 위로 이동 (선택 사항)
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          2025 대선 후보 정책 비교
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          대선 후보들의 정책을 주제별로 간단하고 보기 쉽게 비교해보세요.
          유권자가 이념적 선동에 휘둘리지 않고 합리적인 판단을 내릴 수 있도록
          돕습니다.
        </p>
      </section>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="정책, 공약, 이슈 등으로 검색..."
      />
      <section className="mb-8">
        <CategoryFilter
          categories={initialCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>
      <section>
        {/* 페이지네이션 컨트롤 UI */}
        {totalPages > 1 && (
          <div className="my-8 flex justify-center items-center space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              이전
            </button>
            <span className="text-sm text-gray-700">
              {currentPage} / {totalPages} 페이지
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </div>
        )}

        <PolicyListDisplay policies={paginatedPolicies} />

        {/* 페이지네이션 컨트롤 UI (하단에도 추가 가능) */}
        {totalPages > 1 && paginatedPolicies.length > 0 && (
          <div className="mt-8 flex justify-center items-center space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              이전
            </button>
            <span className="text-sm text-gray-700">
              {currentPage} / {totalPages} 페이지
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </div>
        )}
        {filteredAndSearchedPolicies.length === 0 && searchTerm && (
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
              &apos;{searchTerm}&apos;에 대한 검색 결과가 없습니다. 다른
              검색어를 시도해 보세요.
            </p>
          </div>
        )}
      </section>
      {/* <DynamicCopilotPopupClient /> */}
      <CopilotPopupLoader /> {/* 로더 컴포넌트 사용 */}
    </>
  );
}
