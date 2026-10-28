// 이 파일이 하는 일: 입력 양식에서 쓰는 글자 변환 도구
import type { ExternalLink } from "../types";

/** "교사교육, 수업설계" → ["교사교육", "수업설계"] */
export function splitList(text: string): string[] {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** 이름과 주소가 모두 채워진 링크만 남김 */
export function cleanLinks(links: ExternalLink[]): ExternalLink[] {
  return links
    .map((l) => ({ label: l.label.trim(), url: l.url.trim() }))
    .filter((l) => l.label && l.url);
}
