// 이 파일이 하는 일: 페이지마다 브라우저 탭 제목을 바꿔 주는 도구
import { useEffect } from "react";
import { profile } from "../data/profile";

export function usePageTitle(title?: string) {
  useEffect(() => {
    const base = profile.siteName;
    document.title = title ? `${title} | ${base}` : base;
  }, [title]);
}
