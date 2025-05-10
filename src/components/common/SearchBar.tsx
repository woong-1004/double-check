"use client";

import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface CommonSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
  onSearch?: () => void; // 검색 버튼 및 Enter키 액션용
}

const CommonSearchBar: React.FC<CommonSearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  placeholder = "검색어를 입력하세요...", // 보다 일반적인 placeholder
  onSearch,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  return (
    <div className="mb-8 w-full">
      <div className="relative flex items-center">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className={`w-full px-4 py-3 pl-10 text-gray-700 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
            onSearch ? "rounded-l-lg" : "rounded-lg"
          }`}
        />
        {onSearch && (
          <button
            onClick={onSearch}
            className="px-4 py-3 text-sm font-medium text-white bg-indigo-600 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 transition-colors duration-200 border border-indigo-600 -ml-px"
            // className 수정: py-3으로 input과 높이 맞춤, ring-offset-0, border 추가, -ml-px로 경계선 겹침 처리
          >
            검색
          </button>
        )}
      </div>
    </div>
  );
};

export default CommonSearchBar;
