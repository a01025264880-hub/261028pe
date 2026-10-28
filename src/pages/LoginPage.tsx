// 이 파일이 하는 일: 로그인 페이지 (현재는 "준비 중" 안내만 표시)
import { usePageTitle } from "../lib/usePageTitle";
import PageHeader from "../components/PageHeader";

export default function LoginPage() {
  usePageTitle("로그인");
  return (
    <>
      <PageHeader title="로그인" />
      <div className="mx-auto max-w-md rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-lg text-slate-700">
          공동연구자 전용 자료 열람을 위한 로그인 기능을 준비하고 있습니다.
        </p>
        <button
          type="button"
          disabled
          aria-describedby="login-notice"
          className="mt-6 inline-flex h-12 w-full cursor-not-allowed items-center justify-center rounded-md border border-slate-300 bg-white text-base font-semibold text-slate-500"
        >
          Google 로그인 (준비 중)
        </button>
        <p id="login-notice" className="mt-4 text-slate-600">
          공개된 연구와 수업 자료는 로그인 없이 볼 수 있습니다.
        </p>
      </div>
    </>
  );
}
