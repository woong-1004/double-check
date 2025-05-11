import React from "react";

interface KeywordFilterProps {
  selectedKeywords: string[];
  onKeywordToggle: (keyword: string) => void;
}

const KEYWORDS = [
  "전체",
  "김문수",
  "한덕수",
  "이준석",
  "이재명",
  "국민의힘",
  "개혁신당",
  "더불어민주당",
];

const KeywordFilter: React.FC<KeywordFilterProps> = ({
  selectedKeywords,
  onKeywordToggle,
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {KEYWORDS.map((keyword) => {
        const isSelected = keyword === "전체" 
          ? selectedKeywords.length === 0 
          : selectedKeywords.includes(keyword);
        return (
          <button
            key={keyword}
            onClick={() => {
              if (keyword === "전체") {
                onKeywordToggle("전체"); // This will clear all selections
              } else {
                onKeywordToggle(keyword);
              }
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${
                isSelected
                  ? "bg-[#AA60C8] text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
          >
            {keyword}
          </button>
        );
      })}
    </div>
  );
};

export default KeywordFilter;