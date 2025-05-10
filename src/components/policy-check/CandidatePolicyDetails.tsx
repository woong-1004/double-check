"use client";

import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

// 타입 정의 import로 변경
import type { CandidatePolicy } from "@/types/policy";

// PolicyCheckPage에 정의된 타입을 가져오거나, 별도 types 파일로 분리 후 import 해야 합니다.
// 여기서는 PolicyCheckPage로부터 props로 타입이 전달된다고 가정합니다.

interface CandidatePolicyDetailsProps {
  candidatePolicy: CandidatePolicy;
}

const CandidatePolicyDetails: React.FC<CandidatePolicyDetailsProps> = ({
  candidatePolicy,
}) => {
  return (
    <div
      className={`p-4 rounded-md ${candidatePolicy.colors.bg} ${candidatePolicy.colors.border}`}
    >
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        {candidatePolicy.candidateName}
      </h3>
      <p className="text-gray-600 text-sm mb-3 whitespace-pre-line">
        {candidatePolicy.content}
      </p>
      <div className="text-xs text-gray-500 mb-3">
        발표일: {candidatePolicy.date}
      </div>
      <a
        href={candidatePolicy.source}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 hover:underline"
      >
        출처 보기 <ArrowTopRightOnSquareIcon className="h-3 w-3 ml-1" />
      </a>
    </div>
  );
};

export default CandidatePolicyDetails;
