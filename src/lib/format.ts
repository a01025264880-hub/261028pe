// 이 파일이 하는 일: 화면 표시용 글자 변환 도구
/** "2025-1" → "2025년 1학기" */
export function formatSemester(semester: string): string {
  const [year, term] = semester.split("-");
  return term ? `${year}년 ${term}학기` : semester;
}
