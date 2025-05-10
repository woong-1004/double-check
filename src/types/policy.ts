export interface PolicyItem {
  category: string;
  subcategory: string;
  topic: string;
  candidateName: string;
  candidatePhoto: string;
  content: string;
  source: string;
  date: string;
}

export interface CandidatePolicy {
  candidateName: string;
  content: string;
  source: string;
  date: string;
  colors: { border: string; bg: string };
}

export interface GroupedPolicy {
  category: string;
  subcategory: string;
  topic: string;
  candidates: CandidatePolicy[];
}
