"use client";

import React from "react";
import CandidatePolicyDetails from "./CandidatePolicyDetails";

// 타입 정의 import로 변경
import type { GroupedPolicy } from "@/types/policy";

interface PolicyTopicCardProps {
  groupedPolicyData: GroupedPolicy;
}

const PolicyTopicCard: React.FC<PolicyTopicCardProps> = ({
  groupedPolicyData,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <p className="text-sm text-blue-600 font-semibold mb-1">
          {groupedPolicyData.category} &gt; {groupedPolicyData.subcategory}
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {groupedPolicyData.topic}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          {groupedPolicyData.candidates.map((candidate) => (
            <CandidatePolicyDetails
              key={candidate.candidateName}
              candidatePolicy={candidate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicyTopicCard;
