// ============================================================
// 수업 자료 샘플 데이터 (처음 한 번만 사용)
// - 이제 실제 수업 자료는 Firebase(Firestore)에 저장되며, 사이트의 [관리] 화면에서 추가·수정·삭제합니다.
// - 이 파일은 관리 화면의 "샘플 넣기" 버튼을 누를 때만 쓰입니다. 평소에는 고칠 필요가 없습니다.
// ============================================================
import type { TeachingMaterial } from "../types";

export const materials: TeachingMaterial[] = [
  {
    id: "t1",
    course: "샘플 과목 A: 교육과정론",
    title: "1주차 강의안: 교육과정의 개념",
    description: "[샘플 설명] 교육과정의 다양한 정의와 관점을 소개합니다.",
    semester: "2026-1",
    type: "강의안",
    links: [{ label: "강의안 (Google Drive)", url: "https://drive.google.com/" }],
    createdAt: "2026-03-02",
  },
  {
    id: "t2",
    course: "샘플 과목 A: 교육과정론",
    title: "참고문헌 목록",
    description: "[샘플 설명] 학기 중 함께 읽을 참고문헌 목록입니다.",
    semester: "2026-1",
    type: "참고문헌",
    links: [{ label: "목록 보기", url: "https://drive.google.com/" }],
    createdAt: "2026-03-03",
  },
  {
    id: "t3",
    course: "샘플 과목 B: 교수학습이론",
    title: "중간 과제 안내",
    description: "[샘플 설명] 수업 설계안 작성 과제의 안내문과 평가 기준입니다.",
    semester: "2026-1",
    type: "과제",
    links: [{ label: "과제 안내문", url: "https://drive.google.com/" }],
    createdAt: "2026-04-10",
  },
  {
    id: "t4",
    course: "샘플 과목 B: 교수학습이론",
    title: "3주차 강의안: 구성주의 학습이론",
    description: "[샘플 설명] 구성주의 학습이론의 핵심 개념과 수업 적용 사례입니다.",
    semester: "2025-2",
    type: "강의안",
    links: [{ label: "강의안 (Google Drive)", url: "https://drive.google.com/" }],
    createdAt: "2025-09-15",
  },
  {
    id: "t5",
    course: "샘플 과목 C: 평생교육론",
    title: "평생교육 관련 기관 링크 모음",
    description: "[샘플 설명] 수업에서 참고할 평생교육 관련 기관 웹사이트 모음입니다.",
    semester: "2025-2",
    type: "기타",
    links: [
      { label: "링크 모음 1", url: "https://www.example.com/" },
      { label: "링크 모음 2", url: "https://www.example.org/" },
    ],
    createdAt: "2025-09-01",
  },
  {
    id: "t6",
    course: "샘플 과목 C: 평생교육론",
    title: "기말 과제 안내",
    description: "[샘플 설명] 평생교육 프로그램 기획안 작성 과제입니다.",
    semester: "2025-2",
    type: "과제",
    links: [],
    createdAt: "2025-11-20",
  },
];
