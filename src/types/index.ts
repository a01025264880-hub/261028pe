// 이 파일이 하는 일: 사이트 전체에서 쓰는 데이터 형식 정의 (나중에 Firestore 컬렉션 구조와 동일하게 사용)

export interface ExternalLink {
  label: string;
  url: string;
}

export type ResearchStatus = "진행중" | "완료";

export interface Research {
  id: string;
  title: string;
  summary: string;
  year: number;
  tags: string[];
  status: ResearchStatus;
  collaborators: string[];
  links: ExternalLink[];
  /** 등록일 (ISO 형식 문자열, 예: "2025-03-01") */
  createdAt: string;
}

export type MaterialType = "강의안" | "참고문헌" | "과제" | "기타";

export interface TeachingMaterial {
  id: string;
  course: string;
  title: string;
  description: string;
  /** 학기 (예: "2025-1") */
  semester: string;
  type: MaterialType;
  links: ExternalLink[];
  /** 등록일 (ISO 형식 문자열, 예: "2025-03-01") */
  createdAt: string;
}

export interface Education {
  period: string;
  degree: string;
  institution: string;
}

export interface Career {
  period: string;
  position: string;
  organization: string;
}

export interface Profile {
  /** 사이트 이름 (상단 로고, 브라우저 탭 제목에 표시) */
  siteName: string;
  /** 사이트 한 줄 설명 (로고 아래, 홈 화면에 표시) */
  siteTagline: string;
  name: string;
  affiliation: string;
  title: string;
  introduction: string;
  education: Education[];
  career: Career[];
  email: string;
  researchAreas: string[];
}
