// 이 파일이 하는 일: 로그인 상태를 사이트 전체에 공유하는 틀 (지금은 동작하지 않음)
// TODO(Firebase): Firebase Auth 연동 시 이 파일 안쪽만 수정하세요.
//   - onAuthStateChanged로 user/loading 상태 갱신
//   - signInWithGoogle: signInWithPopup(auth, new GoogleAuthProvider())
//   - signOut: firebase/auth의 signOut(auth)
import { createContext, useContext, useMemo, type ReactNode } from "react";

export interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const value = useMemo<AuthContextValue>(
    () => ({
      user: null,
      loading: false,
      signInWithGoogle: async () => {
        // TODO(Firebase): Google 로그인 구현
      },
      signOut: async () => {
        // TODO(Firebase): 로그아웃 구현
      },
    }),
    [],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth는 AuthProvider 안에서만 사용할 수 있습니다.");
  return ctx;
}
