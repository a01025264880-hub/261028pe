// 이 파일이 하는 일: Firestore에서 읽은 값을 안전하게 화면용 데이터로 바꾸는 공통 도구
import type { DocumentData } from "firebase/firestore";
import type { ExternalLink } from "../types";

export function str(data: DocumentData, key: string, fallback = ""): string {
  const v: unknown = data[key];
  return typeof v === "string" ? v : fallback;
}

export function num(data: DocumentData, key: string, fallback = 0): number {
  const v: unknown = data[key];
  return typeof v === "number" ? v : Number(v) || fallback;
}

export function strArray(data: DocumentData, key: string): string[] {
  const v: unknown = data[key];
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}

export function links(data: DocumentData): ExternalLink[] {
  const v: unknown = data.links;
  if (!Array.isArray(v)) return [];
  return v
    .map((item: unknown) => {
      if (typeof item !== "object" || item === null) return null;
      const o = item as Record<string, unknown>;
      return typeof o.label === "string" && typeof o.url === "string" ? { label: o.label, url: o.url } : null;
    })
    .filter((x): x is ExternalLink => x !== null);
}

/** 오늘 날짜를 "YYYY-MM-DD" 형식으로 */
export function today(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
