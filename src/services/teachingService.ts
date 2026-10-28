// 이 파일이 하는 일: 수업 자료 데이터를 가져오는 함수 모음 (페이지는 반드시 이 함수만 사용)
// TODO(Firebase): Firestore 연동 시 아래 함수 "안쪽"만 Firestore 호출로 교체하세요.
//   예) listMaterials → getDocs(query(collection(db, "materials"), orderBy("createdAt", "desc")))
import { materials } from "../data/teaching";
import type { TeachingMaterial } from "../types";

/** 모든 수업 자료를 등록일 최신 순으로 반환 */
export async function listMaterials(): Promise<TeachingMaterial[]> {
  return [...materials].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
