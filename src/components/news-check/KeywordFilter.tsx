import React from "react";

interface KeywordFilterProps {
  selectedKeywords: string[];
  onKeywordToggle: (keyword: string) => void;
}

const KEYWORDS = [
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
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        {KEYWORDS.map((keyword) => {
          const isSelected = selectedKeywords.includes(keyword);
          return (
            <button
              key={keyword}
              onClick={() => onKeywordToggle(keyword)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isSelected
                  ? "bg-[#AA60C8] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-[#F0E6F5]"
              }`}
            >
              {keyword}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default KeywordFilter;