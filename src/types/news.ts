export interface RawNewsItem {
  id?: string;
  politicalOrientation: string;
  topic: string;
  date: string;
  media: string;
  videoLink?: string; // 비디오 링크는 선택적
  aiSummary: string;
  topicFactCheck: string; // 동일 주제에 대해 중복될 수 있음
}

export interface ProcessedNewsItem {
  id: string;
  politicalOrientation: string;
  media: string;
  videoLink?: string;
  aiSummary: string;
  youtubeVideoId?: string; // 유튜브 링크에서 추출한 ID
}

export interface GroupedNewsTopic {
  topic: string;
  date: string;
  items: ProcessedNewsItem[]; // 일반적으로 2개 항목 (좌/우) 또는 그 이상
  commonFactCheck: string; // 해당 토픽에 대한 공통 팩트체크 내용
}
