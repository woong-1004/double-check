"use client";

import { CopilotPopup } from "@copilotkit/react-ui";
import React from "react";

// React.FC의 제네릭 타입 제거, props를 받지 않도록 수정
const CopilotPopupClient: React.FC = () => {
  // props로 받던 값을 컴포넌트 내부 상수로 정의
  const instructions =
    "한국 21대 대선 정책 q&a 에이전트로, 사용자의 질문에 대해 친절하게 답변해주세요.";
  const labels = {
    title: "21대 대선 정책 q&a AI 에이전트",
    initial: "21대 대선 정책에 질문해 주세요.",
  };

  return (
    <div className="fixed bottom-4 right-4">
      <CopilotPopup
        instructions={instructions}
        labels={labels}
        makeSystemMessage={(): string => {
          return "You are assisting the user as best as you can. Answer in the best way possible given the data you have.";
        }}
      />
    </div>
  );
};

export default CopilotPopupClient;
