// src/components/policy-check/PolicyListDisplay.tsx
"use client";

import React from "react";
import PolicyTopicCard from "./PolicyTopicCard";
import type { GroupedPolicy } from "@/types/policy"; // CandidatePolicy는 직접 사용 안 하므로 제거

interface PolicyListDisplayProps {
  policies: GroupedPolicy[];
}

const PolicyListDisplay: React.FC<PolicyListDisplayProps> = ({ policies }) => {
  if (policies.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        해당 조건에 맞는 정책이 없습니다.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {policies.map((group) => (
        <PolicyTopicCard key={group.topic} groupedPolicyData={group} />
      ))}
    </div>
  );
};

export default PolicyListDisplay;
