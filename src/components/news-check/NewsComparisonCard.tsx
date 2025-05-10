"use client";

import React from "react";
import type { ProcessedNewsItem } from "@/types/news";
import MediaReportCard from "./MediaReportCard";

interface NewsComparisonCardProps {
  leftReport: ProcessedNewsItem | null; // 좌측에 표시될 뉴스 (없을 수도 있음)
  rightReport: ProcessedNewsItem | null; // 우측에 표시될 뉴스 (없을 수도 있음)
}

const NewsComparisonCard: React.FC<NewsComparisonCardProps> = ({
  leftReport,
  rightReport,
}) => {
  // 특정 성향의 뉴스가 여러 개일 경우, 첫 번째 항목만 사용 (또는 다른 로직으로 선택 가능)
  // 여기서는 부모 컴포넌트(NewsTopicDisplay)에서 이미 좌/우 하나씩 전달한다고 가정합니다.

  if (!leftReport && !rightReport) {
    return (
      <div className="p-4 text-center text-gray-500 bg-gray-100 rounded-lg">
        비교할 미디어 보도 내용이 없습니다.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-x-6 gap-y-8 items-start">
      {leftReport ? (
        <MediaReportCard report={leftReport} isLeft={true} />
      ) : (
        <div className="p-5 border rounded-lg shadow-md h-full flex items-center justify-center text-gray-400 bg-gray-50 border-blue-200">
          좌편향 미디어 보도 정보가 없습니다.
        </div>
      )}
      {rightReport ? (
        <MediaReportCard report={rightReport} isLeft={false} />
      ) : (
        <div className="p-5 border rounded-lg shadow-md h-full flex items-center justify-center text-gray-400 bg-gray-50 border-red-200">
          우편향 미디어 보도 정보가 없습니다.
        </div>
      )}
    </div>
  );
};

export default NewsComparisonCard;
