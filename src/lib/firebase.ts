// 이 파일이 하는 일: Firebase 앱을 초기화하고 로그인(auth)·데이터베이스(db) 연결을 내보냄
//
// 아래 설정값은 Firebase 콘솔 > 프로젝트 설정 > 내 앱 에서 복사한 값입니다.
// Firebase 웹 설정값은 비밀번호가 아니라 공개되어도 되는 값이며, 데이터 보호는 firestore.rules(보안 규칙)가 담당합니다.
// 다른 Firebase 프로젝트로 바꾸려면 .env 파일에 VITE_FIREBASE_* 값을 넣으면 그 값이 우선 적용됩니다.
//
// 무료(Spark) 요금제 기준: Firestore + Authentication만 사용 (Cloud Storage, Cloud Functions 사용 안 함)
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyDgXXmDJkj94NqbYPv7mYC82kFT7t78IXA",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "claude-edu-bb854.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "claude-edu-bb854",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "claude-edu-bb854.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1095334021926",
  appId: env.VITE_FIREBASE_APP_ID || "1:1095334021926:web:8d3e2fb242f8e267308fe7",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
