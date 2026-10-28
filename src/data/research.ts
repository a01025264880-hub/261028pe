// ============================================================
// 연구 샘플 데이터 (처음 한 번만 사용)
// - 이제 실제 연구는 Firebase(Firestore)에 저장되며, 사이트의 [관리] 화면에서 추가·수정·삭제합니다.
// - 이 파일은 관리 화면의 "샘플 넣기" 버튼을 누를 때만 쓰입니다. 평소에는 고칠 필요가 없습니다.
// ============================================================
import type { Research } from "../types";

export const researches: Research[] = [
  {
    id: "r1",
    title: "샘플 연구 제목 1: 학습자 중심 수업 설계 모형 개발",
    summary:
      "[샘플 요약] 이 연구는 학습자 중심 수업 설계 모형을 개발하고 그 효과를 검증하는 것을 목적으로 합니다. 실제 연구 요약으로 바꾸어 주세요.",
    year: 2025,
    tags: ["교수학습", "수업설계"],
    status: "진행중",
    collaborators: ["[공동연구자 A]", "[공동연구자 B]"],
    links: [
      { label: "연구 계획서 (Google Drive)", url: "https://drive.google.com/" },
      { label: "KCI 검색", url: "https://www.kci.go.kr/" },
    ],
    createdAt: "2025-03-01",
  },
  {
    id: "r2",
    title: "샘플 연구 제목 2: 교사 전문성 개발 프로그램의 효과 분석",
    summary:
      "[샘플 요약] 현직 교사 대상 전문성 개발 프로그램의 효과를 분석한 연구입니다.",
    year: 2024,
    tags: ["교사교육", "프로그램평가"],
    status: "완료",
    collaborators: ["[공동연구자 C]"],
    links: [
      { label: "DOI", url: "https://doi.org/" },
      { label: "RISS", url: "https://www.riss.kr/" },
    ],
    createdAt: "2024-09-15",
  },
  {
    id: "r3",
    title: "샘플 연구 제목 3: 디지털 전환기 교육과정 재구성 방향",
    summary:
      "[샘플 요약] 디지털 전환 시대에 필요한 교육과정 재구성의 방향을 탐색한 연구입니다.",
    year: 2024,
    tags: ["교육과정", "디지털교육"],
    status: "완료",
    collaborators: ["[공동연구자 A]", "[공동연구자 D]"],
    links: [{ label: "KCI 논문 보기", url: "https://www.kci.go.kr/" }],
    createdAt: "2024-05-20",
  },
  {
    id: "r4",
    title: "샘플 연구 제목 4: 성인 학습자의 학습 동기 연구",
    summary:
      "[샘플 요약] 평생교육 기관에 참여하는 성인 학습자의 학습 동기 요인을 탐색한 연구입니다.",
    year: 2023,
    tags: ["평생교육", "학습동기"],
    status: "완료",
    collaborators: ["[공동연구자 E]"],
    links: [{ label: "RISS", url: "https://www.riss.kr/" }],
    createdAt: "2023-11-10",
  },
  {
    id: "r5",
    title: "샘플 연구 제목 5: 과정중심 평가의 학교 현장 적용",
    summary:
      "[샘플 요약] 과정중심 평가가 학교 현장에 적용되는 양상과 과제를 분석한 연구입니다.",
    year: 2023,
    tags: ["교육평가", "교육과정"],
    status: "완료",
    collaborators: ["[공동연구자 B]", "[공동연구자 F]"],
    links: [{ label: "DOI", url: "https://doi.org/" }],
    createdAt: "2023-04-02",
  },
  {
    id: "r6",
    title: "샘플 연구 제목 6: 예비교사의 수업 성찰 역량 탐색",
    summary:
      "[샘플 요약] 교육실습에 참여한 예비교사의 수업 성찰 역량을 질적으로 탐색한 연구입니다.",
    year: 2026,
    tags: ["교사교육", "질적연구"],
    status: "진행중",
    collaborators: [],
    links: [],
    createdAt: "2026-02-10",
  },
];
