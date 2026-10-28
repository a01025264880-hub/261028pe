// 이 파일이 하는 일: 로그인 페이지 (현재는 "준비 중" 안내만 표시)
import { profile } from "../data/profile";
import { usePageTitle } from "../lib/usePageTitle";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";

export default function LoginPage() {
  usePageTitle("로그인");
  return (
    <>
      <PageHeader eyebrow="MEMBERS" title="로그인" description="공동연구자 전용 자료 열람 공간입니다." />
      <Container className="relative -mt-8">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg sm:p-10">
          <span
            aria-hidden="true"
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-navy-50 text-navy-700"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M8 11V8a4 4 0 118 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <h2 className="font-serif text-2xl font-bold">{profile.siteName} 회원 로그인</h2>
          <p className="mt-3 text-slate-600">로그인 기능을 준비하고 있습니다.</p>
          <button
            type="button"
            disabled
            aria-describedby="login-notice"
            className="mt-8 inline-flex h-12 w-full cursor-not-allowed items-center justify-center rounded-full border border-slate-300 bg-slate-50 text-base font-semibold text-slate-500"
          >
            Google 로그인 (준비 중)
          </button>
          <p id="login-notice" className="mt-4 text-sm text-slate-600">
            공개된 연구와 수업 자료는 로그인 없이 볼 수 있습니다.
          </p>
        </div>
      </Container>
    </>
  );
}
