// 이 파일이 하는 일: 모든 페이지를 감싸는 공통 틀 (본문 바로가기, 헤더, 본문, 푸터)
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
      >
        본문 바로가기
      </a>
      <Header />
      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-5 pt-10 sm:pt-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
