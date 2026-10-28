// ============================================================
// 여기만 수정하세요: 교수 정보 (이름, 소속, 소개, 학력, 경력, 연락처, 연구 분야)
// - 따옴표("") 안의 글자만 바꾸면 사이트 전체에 반영됩니다.
// - 항목을 늘리려면 { ... }, 묶음을 복사해 아래에 붙여 넣으세요.
// ============================================================
import type { Profile } from "../types";

export const profile: Profile = {
  name: "[교수 이름]",
  affiliation: "[대학교 이름] 교육학과",
  title: "교수",
  introduction:
    "[샘플 소개 문구] 교육과정과 교수학습 이론을 바탕으로 학습자 중심 수업 설계를 연구합니다. 이 문장을 교수님의 소개 글로 바꾸어 주세요.",
  education: [
    { period: "20XX", degree: "교육학 박사", institution: "[샘플 대학교] 대학원" },
    { period: "20XX", degree: "교육학 석사", institution: "[샘플 대학교] 대학원" },
    { period: "20XX", degree: "교육학 학사", institution: "[샘플 대학교]" },
  ],
  career: [
    { period: "20XX – 현재", position: "교수", organization: "[대학교 이름] 교육학과" },
    { period: "20XX – 20XX", position: "부교수", organization: "[샘플 대학교] 교육학과" },
    { period: "20XX – 20XX", position: "연구위원", organization: "[샘플 연구기관]" },
  ],
  email: "professor@example.com",
  researchAreas: ["교육과정", "교수학습", "교사교육", "평생교육", "교육평가"],
};
