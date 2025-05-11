import React, { useState } from "react";
import type { GroupedNewsTopic, ProcessedNewsItem } from "@/types/news";
import YouTubePlayer from "@/components/news-check/YouTubePlayer";
import { Dialog } from '@headlessui/react';

interface NewsTopicDisplayProps {
  group: GroupedNewsTopic;
}

const NewsTopicDisplay: React.FC<NewsTopicDisplayProps> = ({ group }) => {
  const [isFactCheckOpen, setIsFactCheckOpen] = useState(false);

  return (
    <div className="mb-12 p-6 md:p-8 bg-white rounded-xl shadow-2xl">
      {/* 주제 제목 및 날짜 */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-[#AA60C8]">{group.topic}</h2>
            <p className="text-md text-gray-500 mt-1">{group.date}</p>
          </div>
          <button
            onClick={() => setIsFactCheckOpen(true)}
            className="px-4 py-2 bg-[#F5EBFA] text-[#AA60C8] rounded-lg hover:bg-[#EBD6F5] transition-colors duration-200 flex items-center shadow-sm"
          >
            🧠 AI 팩트체크
          </button>
        </div>
      </div>

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

      {/* Fact Check Modal */}
      <Dialog
        open={isFactCheckOpen}
        onClose={() => setIsFactCheckOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-2xl rounded bg-white p-6 max-h-[80vh] overflow-y-auto">
            <Dialog.Title className="text-2xl font-bold text-black mb-6">
              🧠 AI 팩트체크
            </Dialog.Title>
            <div className="prose prose-sm max-w-none text-black whitespace-pre-line">
              {group.commonFactCheck}
            </div>
            <button
              className="mt-6 inline-flex justify-center rounded-md border border-transparent bg-[#F5EBFA] px-4 py-2 text-sm font-medium text-[#AA60C8] hover:bg-[#EBD6F5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#AA60C8] focus-visible:ring-offset-2"
              onClick={() => setIsFactCheckOpen(false)}
            >
              닫기
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default NewsTopicDisplay;