"use client";

import dynamic from "next/dynamic";

const DynamicCopilotPopupClient = dynamic(
  () => import("@/components/common/CopilotPopupClient"),
  {
    ssr: false,
    // Optional: 로딩 중 표시할 컴포넌트
    // loading: () => <p>Loading Assistant...</p>,
  }
);

export default function CopilotPopupLoader() {
  return <DynamicCopilotPopupClient />;
}
