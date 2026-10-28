// 이 파일이 하는 일: Firestore "materials" 컬렉션에서 수업 자료를 읽고 쓰는 함수 모음 (페이지는 반드시 이 함수만 사용)
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocsFromServer,
  limit,
  query,
  setDoc,
  updateDoc,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { materials as sampleMaterials } from "../data/teaching";
import type { MaterialType, TeachingMaterial } from "../types";
import { links, str } from "./firestoreHelpers";

const COLLECTION = "materials";
const col = () => collection(db, COLLECTION);
const TYPES: readonly MaterialType[] = ["강의안", "참고문헌", "과제", "기타"];

export type MaterialInput = Omit<TeachingMaterial, "id">;

function toMaterial(id: string, d: DocumentData): TeachingMaterial {
  const type = TYPES.find((t) => t === d.type) ?? "기타";
  return {
    id,
    course: str(d, "course", "(과목 미지정)"),
    title: str(d, "title", "(제목 없음)"),
    description: str(d, "description"),
    semester: str(d, "semester"),
    type,
    links: links(d),
    createdAt: str(d, "createdAt"),
  };
}

/** 모든 수업 자료를 등록일 최신 순으로 반환 */
export async function listMaterials(): Promise<TeachingMaterial[]> {
  const snap = await getDocsFromServer(col());
  return snap.docs
    .map((d) => toMaterial(d.id, d.data()))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** (관리자) 수업 자료 추가 → 새 id 반환 */
export async function createMaterial(input: MaterialInput): Promise<string> {
  const ref = await addDoc(col(), input);
  return ref.id;
}

/** (관리자) 수업 자료 수정 */
export async function updateMaterial(id: string, input: MaterialInput): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), { ...input });
}

/** (관리자) 수업 자료 삭제 */
export async function deleteMaterial(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

/** (관리자) 컬렉션이 비어 있으면 src/data/teaching.ts의 샘플을 넣음 → 넣은 건수 반환 */
export async function seedSampleMaterials(): Promise<number> {
  const existing = await getDocsFromServer(query(col(), limit(1)));
  if (!existing.empty) return 0;
  await Promise.all(sampleMaterials.map(({ id, ...rest }) => setDoc(doc(db, COLLECTION, id), rest)));
  return sampleMaterials.length;
}
