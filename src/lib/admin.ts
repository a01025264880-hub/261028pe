// 이 파일이 하는 일: 관리자(자료 추가·수정·삭제 가능) 계정 목록
// 주의: 여기를 바꾸면 firestore.rules 파일의 이메일도 똑같이 바꾸고, Firebase 콘솔의 규칙에도 다시 붙여 넣어야 합니다.
// (화면 표시는 이 파일이, 실제 데이터 보호는 firestore.rules가 담당합니다)
export const ADMIN_EMAILS: readonly string[] = ["a01025264880@gmail.com"];

export function isAdminEmail(email: string | null | undefined): boolean {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}
