"use client";

import React from "react";
import type { ProcessedNewsItem } from "@/types/news";
import YouTubePlayer from "./YouTubePlayer"; // YouTubePlayer 컴포넌트를 임포트합니다.

interface MediaReportCardProps {
  report: ProcessedNewsItem;
  // isLeft?: boolean; // 좌측 카드인지 여부 (스타일링 목적) - politicalOrientation이 없어지므로 일단 주석 처리 또는 제거 고려
}

const MediaReportCard: React.FC<MediaReportCardProps> = ({
  report,
  // isLeft = false, // politicalOrientation이 없어지므로 일단 주석 처리 또는 제거 고려
}) => {
  // politicalOrientation 관련 로직 제거
  // const orientationColor =
  //   report.politicalOrientation === "좌편향"
  //     ? "bg-blue-100 text-blue-800 border-blue-300"
  //     : report.politicalOrientation === "우편향"
  //     ? "bg-red-100 text-red-800 border-red-300"
  //     : "bg-gray-100 text-gray-800 border-gray-300";

  return (
    <div
      className={`p-5 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-slate-50 border-slate-200`}
      // className={`p-5 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
      //   isLeft ? "border-blue-200 bg-blue-50" : "border-red-200 bg-red-50"
      // }`}
    >
      {/* media 및 politicalOrientation 표시 제거 */}
      <h4 className="text-xl font-semibold mb-2 text-gray-800">
        {/* {report.media} */}
        {/* <span
          className={`ml-2 text-xs px-2.5 py-1 rounded-full font-semibold ${orientationColor}`}
        >
          {report.politicalOrientation}
        </span> */}
        AI 분석 리포트 {/* 제목 대체 또는 다른 정보 표시 */}
      </h4>

      {report.youtubeVideoId && (
        <div className="mb-3 bg-black rounded overflow-hidden shadow-inner min-h-[210px] sm:min-h-[240px] md:min-h-[270px] w-full">
          <YouTubePlayer videoId={report.youtubeVideoId} />
        </div>
      )}

      {report.videoLink && !report.youtubeVideoId && (
        <div className="mb-2 text-sm">
          <p className="text-gray-600">
            영상 링크:
            <a
              href={report.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
            >
              {report.videoLink}
            </a>
          </p>
          <p className="text-xs text-red-600 font-medium">
            유튜브 영상 ID를 추출하지 못했습니다.
          </p>
        </div>
      )}
      {!report.videoLink && (
        <div className="mb-3 p-3 text-center text-sm text-gray-500 bg-gray-100 rounded border border-gray-200">
          관련 영상이 없습니다.
        </div>
      )}

      <div className="p-3 bg-slate-100 rounded mt-2 border border-slate-200">
        <h5 className="text-base font-semibold text-slate-700 mb-1">AI 요약</h5>
        <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
          {report.aiSummary}
        </p>
      </div>
    </div>
  );
};

export default MediaReportCard;
