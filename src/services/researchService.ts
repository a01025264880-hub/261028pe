// 이 파일이 하는 일: Firestore "researches" 컬렉션에서 연구 데이터를 읽고 쓰는 함수 모음 (페이지는 반드시 이 함수만 사용)
import {
  collection,
  deleteDoc,
  doc,
  getDocFromServer,
  getDocsFromServer,
  limit,
  query,
  setDoc,
  addDoc,
  updateDoc,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { researches as sampleResearches } from "../data/research";
import type { Research } from "../types";
import { links, num, str, strArray } from "./firestoreHelpers";

const COLLECTION = "researches";
const col = () => collection(db, COLLECTION);

export type ResearchInput = Omit<Research, "id">;

function toResearch(id: string, d: DocumentData): Research {
  return {
    id,
    title: str(d, "title", "(제목 없음)"),
    summary: str(d, "summary"),
    year: num(d, "year", new Date().getFullYear()),
    tags: strArray(d, "tags"),
    status: d.status === "완료" ? "완료" : "진행중",
    collaborators: strArray(d, "collaborators"),
    links: links(d),
    createdAt: str(d, "createdAt"),
  };
}

function byNewest(a: Research, b: Research): number {
  return b.year - a.year || b.createdAt.localeCompare(a.createdAt);
}

/** 모든 연구 목록을 최신 연도 순으로 반환 */
export async function listResearches(): Promise<Research[]> {
  const snap = await getDocsFromServer(col());
  return snap.docs.map((d) => toResearch(d.id, d.data())).sort(byNewest);
}

/** 홈 화면에 보일 대표 연구 (가장 최근 연구 순) */
export async function listFeaturedResearches(count = 3): Promise<Research[]> {
  return (await listResearches()).slice(0, count);
}

/** id로 연구 한 건을 찾아 반환 (없으면 null) */
export async function getResearch(id: string): Promise<Research | null> {
  const snap = await getDocFromServer(doc(db, COLLECTION, id));
  return snap.exists() ? toResearch(snap.id, snap.data()) : null;
}

/** (관리자) 연구 추가 → 새 id 반환 */
export async function createResearch(input: ResearchInput): Promise<string> {
  const ref = await addDoc(col(), input);
  return ref.id;
}

/** (관리자) 연구 수정 */
export async function updateResearch(id: string, input: ResearchInput): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), { ...input });
}

/** (관리자) 연구 삭제 */
export async function deleteResearch(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

/** (관리자) 컬렉션이 비어 있으면 src/data/research.ts의 샘플을 넣음 → 넣은 건수 반환 */
export async function seedSampleResearches(): Promise<number> {
  const existing = await getDocsFromServer(query(col(), limit(1)));
  if (!existing.empty) return 0;
  await Promise.all(
    sampleResearches.map(({ id, ...rest }) => setDoc(doc(db, COLLECTION, id), rest)),
  );
  return sampleResearches.length;
}
