"use client";

import React from "react";
import type { GroupedNewsTopic, ProcessedNewsItem } from "@/types/news";
import YouTubePlayer from "@/components/news-check/YouTubePlayer";

interface NewsTopicDisplayProps {
  group: GroupedNewsTopic; // 이제 group.items는 전체 아이템을 포함
  // currentPage, totalPages, onPageChange, itemsPerPage, totalItems props 제거
}

const NewsTopicDisplay: React.FC<NewsTopicDisplayProps> = ({ group }) => {
  // startIndex, endIndex 계산 제거

  return (
    <div className="mb-12 p-6 md:p-8 bg-white rounded-xl shadow-2xl">
      {/* 주제 제목 및 날짜 */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-3xl font-bold text-indigo-700">{group.topic}</h2>
        <p className="text-md text-gray-500 mt-1">{group.date}</p>
      </div>

      {/* 공통 팩트체크 */}
      {group.commonFactCheck && (
        <div className="mb-8 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <h3 className="text-xl font-semibold text-indigo-800 mb-2">
            토픽 공통 팩트체크
          </h3>
          <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
            {group.commonFactCheck}
          </p>
        </div>
      )}

      {/* 미디어별 AI 요약 및 분석 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          미디어별 AI 요약 및 분석{" "}
          {group.items.length > 0 ? `(${group.items.length}개)` : "(0개)"}
        </h3>
        {group.items.length > 0 ? (
          <div className="space-y-6">
            {group.items.map((item: ProcessedNewsItem) => (
              <div
                key={item.id}
                className="p-6 border border-gray-200 rounded-lg shadow-md bg-slate-50"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                  <h4 className="text-2xl font-semibold text-gray-800 mb-1 sm:mb-0">
                    {item.media}
                  </h4>
                  <span
                    className={`text-sm px-3 py-1 rounded-full font-semibold ${
                      item.politicalOrientation === "좌편향"
                        ? "bg-blue-100 text-blue-700 ring-1 ring-blue-300"
                        : item.politicalOrientation === "우편향"
                        ? "bg-red-100 text-red-700 ring-1 ring-red-300"
                        : "bg-gray-100 text-gray-700 ring-1 ring-gray-300"
                    }`}
                  >
                    {item.politicalOrientation}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mb-4 whitespace-pre-line leading-relaxed">
                  <span className="font-semibold text-gray-800">AI 요약:</span>{" "}
                  {item.aiSummary}
                </p>

                {item.youtubeVideoId && (
                  <div className="mt-3 w-full rounded-lg shadow-lg overflow-hidden">
                    <YouTubePlayer videoId={item.youtubeVideoId} />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            표시할 뉴스가 없습니다.
          </p>
        )}
      </div>

      {/* 페이지네이션 컨트롤 제거 */}
    </div>
  );
};

export default NewsTopicDisplay;
