// 이 파일이 하는 일: Google 로그인·로그아웃 페이지 (관리자는 관리 화면으로 이동 가능)
import { useState } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { useAuth } from "../context/AuthContext";
import { usePageTitle } from "../lib/usePageTitle";
import { toKoreanError } from "../lib/firebaseErrors";
import Container from "../components/Container";
import Notice from "../components/Notice";
import PageHeader from "../components/PageHeader";
import StatusMessage from "../components/StatusMessage";

export default function LoginPage() {
  usePageTitle("로그인");
  const { user, loading, isAdmin, signInWithGoogle, signOut } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const act = async (fn: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
    } catch (err) {
      setError(toKoreanError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader eyebrow="MEMBERS" title="로그인" description="Google 계정으로 로그인합니다." />
      <Container className="relative -mt-8">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg sm:p-10">
          {loading ? (
            <StatusMessage kind="loading" message="로그인 상태를 확인하는 중입니다..." />
          ) : user ? (
            <>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={`${user.displayName ?? "사용자"} 프로필 사진`}
                  referrerPolicy="no-referrer"
                  className="mx-auto mb-4 h-16 w-16 rounded-full ring-4 ring-gold-100"
                />
              ) : null}
              <h2 className="font-serif text-2xl font-bold">{user.displayName ?? "로그인됨"}</h2>
              <p className="mt-1 break-all text-slate-600">{user.email}</p>
              <p className="mt-4 text-slate-700">
                {isAdmin ? "관리자 계정으로 로그인되었습니다." : "로그인되었습니다. 공동연구자 전용 자료는 준비 중입니다."}
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="rounded-full bg-navy-900 px-6 py-3 font-semibold text-white hover:bg-navy-700"
                  >
                    관리 화면으로 가기
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => act(signOut)}
                  disabled={busy}
                  className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-60"
                >
                  로그아웃
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-serif text-2xl font-bold">{profile.siteName} 로그인</h2>
              <p className="mt-3 text-slate-600">공개된 연구와 수업 자료는 로그인 없이 볼 수 있습니다.</p>
              <button
                type="button"
                onClick={() => act(signInWithGoogle)}
                disabled={busy}
                className="mt-8 inline-flex h-12 w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-white text-base font-semibold text-slate-800 shadow-sm hover:bg-slate-50 disabled:opacity-60"
              >
                <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                  <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
                </svg>
                {busy ? "로그인 중..." : "Google 계정으로 로그인"}
              </button>
            </>
          )}
          {error && (
            <div className="mt-6 text-left">
              <Notice kind="error" message={error} />
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
