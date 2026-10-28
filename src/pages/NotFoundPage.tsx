// 이 파일이 하는 일: 없는 주소로 접속했을 때 보여 주는 404 안내 페이지
import { Link } from "react-router-dom";
import { usePageTitle } from "../lib/usePageTitle";

export default function NotFoundPage() {
  usePageTitle("페이지를 찾을 수 없음");
  return (
    <div className="py-16 text-center">
      <p className="text-5xl font-bold text-navy-200">404</p>
      <h1 className="mt-4 text-3xl font-bold">페이지를 찾을 수 없습니다</h1>
      <p className="mt-3 text-lg text-slate-600">주소가 바뀌었거나 삭제된 페이지입니다.</p>
      <Link to="/" className="mt-8 inline-block rounded-md bg-navy-800 px-6 py-3 font-semibold text-white hover:bg-navy-900">
        홈으로 가기
      </Link>
    </div>
  );
}
