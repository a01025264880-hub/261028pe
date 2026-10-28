// 이 파일이 하는 일: 수업 자료 유형(강의안/참고문헌/과제/기타)별 아이콘
import type { MaterialType } from "../types";

const paths: Record<MaterialType, string> = {
  강의안: "M4 5h16v11H4zM9 20h6M12 16v4",
  참고문헌: "M5 4h10a4 4 0 014 4v12H9a4 4 0 01-4-4zM5 16a4 4 0 014-4h10",
  과제: "M9 11l3 3 8-8M20 12v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h11",
  기타: "M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1 1M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1-1",
};

export default function MaterialTypeIcon({ type }: { type: MaterialType }) {
  return (
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-gold-300">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d={paths[type]} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
