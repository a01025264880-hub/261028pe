// 이 파일이 하는 일: Firebase 오류를 이해하기 쉬운 한국어 안내 문구로 바꿈
import { FirebaseError } from "firebase/app";

const messages: Record<string, string> = {
  "auth/popup-closed-by-user": "로그인 창이 닫혔습니다. 다시 시도해 주세요.",
  "auth/cancelled-popup-request": "로그인 창이 이미 열려 있습니다.",
  "auth/popup-blocked": "브라우저가 로그인 팝업을 막았습니다. 팝업 허용 후 다시 시도해 주세요.",
  "auth/unauthorized-domain":
    "이 주소는 Firebase에 승인된 도메인이 아닙니다. Firebase 콘솔 > Authentication > 설정 > 승인된 도메인에 추가해 주세요.",
  "auth/network-request-failed": "네트워크 연결을 확인해 주세요.",
  "permission-denied": "권한이 없습니다. 관리자 계정으로 로그인했는지, Firestore 보안 규칙을 게시했는지 확인해 주세요.",
  unavailable: "데이터베이스에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.",
  "not-found": "데이터베이스를 찾을 수 없습니다. Firebase 콘솔에서 Firestore Database를 만들었는지 확인해 주세요.",
};

export function toKoreanError(err: unknown): string {
  if (err instanceof FirebaseError) return messages[err.code] ?? `오류가 발생했습니다. (${err.code})`;
  if (err instanceof Error) return err.message;
  return "알 수 없는 오류가 발생했습니다.";
}
