import type { Metadata } from "next";
import fs from "fs/promises";
import path from "path";
import PolicyCheckClientContent from "@/components/policy-check/PolicyCheckClientContent";
import type {
  PolicyItem,
  GroupedPolicy,
  CandidatePolicy,
} from "@/types/policy";

export const metadata: Metadata = {
  title: "후보자 정책 비교", // layout.tsx의 title.template에 의해 "후보자 정책 비교 | Double Check"가 됨
  description:
    "주요 후보자들의 정책 공약을 주제별, 카테고리별로 비교 분석합니다. 각 정책의 상세 내용과 출처를 확인하고 현명한 선택을 하세요.",
  openGraph: {
    title: "후보자 정책 비교 - Double Check",
    description:
      "대선 후보 및 주요 정치인들의 정책 공약을 한눈에 비교하고 분석하세요.",
    url: "/policy-check",
    // 이 페이지를 위한 특정 OG 이미지가 있다면 여기에 추가 (예: images: ['/og-image-policy.png'])
  },
};

const CANDIDATE_COLORS: { [key: string]: { border: string; bg: string } } = {
  이준석: { border: "border-l-4 border-green-500", bg: "bg-green-50" },
  김문수: { border: "border-l-4 border-blue-500", bg: "bg-blue-50" },
  한덕수: { border: "border-l-4 border-purple-500", bg: "bg-purple-50" },
  이재명: { border: "border-l-4 border-red-500", bg: "bg-red-50" },
  default: { border: "border-l-4 border-gray-400", bg: "bg-gray-50" },
};

const getCandidateColors = (candidateName: string) => {
  return CANDIDATE_COLORS[candidateName] || CANDIDATE_COLORS["default"];
};

async function getPoliciesData(): Promise<{
  groupedPolicies: GroupedPolicy[];
  categories: string[];
}> {
  // public 폴더의 파일 경로를 올바르게 구성합니다.
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "policyCheckData.json"
  );
  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const rawPolicies: PolicyItem[] = JSON.parse(fileContents);

    const groups: { [key: string]: GroupedPolicy } = {};
    rawPolicies.forEach((item) => {
      if (!groups[item.topic]) {
        groups[item.topic] = {
          category: item.category,
          subcategory: item.subcategory,
          topic: item.topic,
          candidates: [],
        };
      }
      const candidatePolicy: CandidatePolicy = {
        candidateName: item.candidateName,
        content: item.content,
        source: item.source,
        date: item.date,
        colors: getCandidateColors(item.candidateName),
      };
      groups[item.topic].candidates.push(candidatePolicy);
    });
    const groupedPoliciesResult = Object.values(groups);

    const uniqueCategories = new Set(rawPolicies.map((item) => item.category));
    const categoriesResult = ["전체", ...Array.from(uniqueCategories)];

    return {
      groupedPolicies: groupedPoliciesResult,
      categories: categoriesResult,
    };
  } catch (error) {
    console.error("Failed to read or parse policy data:", error);
    // 실제 프로덕션에서는 더 정교한 에러 처리가 필요할 수 있습니다.
    return { groupedPolicies: [], categories: ["전체"] };
  }
}

export default async function PolicyCheckPage() {
  const { groupedPolicies, categories } = await getPoliciesData();

  // 초기 데이터가 비어있는 경우 (파일 읽기 실패 등)에 대한 처리
  if (groupedPolicies.length === 0 && categories.length <= 1) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4 md:p-8">
          <div className="text-center py-10">
            <h1 className="text-2xl font-bold text-red-500 mb-4">
              데이터 로드 실패
            </h1>
            <p className="text-gray-600">
              정책 데이터를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해
              주세요.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 md:p-8">
        <PolicyCheckClientContent
          initialGroupedPolicies={groupedPolicies}
          initialCategories={categories}
        />
      </div>
    </div>
  );
}
