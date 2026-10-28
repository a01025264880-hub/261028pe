// 이 파일이 하는 일: 연구 데이터를 가져오는 함수 모음 (페이지는 반드시 이 함수만 사용)
// TODO(Firebase): Firestore 연동 시 아래 함수 "안쪽"만 Firestore 호출로 교체하세요.
//   예) listResearches → getDocs(query(collection(db, "researches"), orderBy("year", "desc")))
//   함수 이름과 반환 형식(Promise<Research[]> 등)은 그대로 유지해야 페이지를 고치지 않아도 됩니다.
import { researches } from "../data/research";
import type { Research } from "../types";

/** 모든 연구 목록을 최신 연도 순으로 반환 */
export async function listResearches(): Promise<Research[]> {
  return [...researches].sort((a, b) => b.year - a.year);
}

/** 홈 화면에 보일 대표 연구 (data/research.ts의 앞쪽 항목) */
export async function listFeaturedResearches(count = 3): Promise<Research[]> {
  return researches.slice(0, count);
}

/** id로 연구 한 건을 찾아 반환 (없으면 null) */
export async function getResearch(id: string): Promise<Research | null> {
  return researches.find((r) => r.id === id) ?? null;
}
