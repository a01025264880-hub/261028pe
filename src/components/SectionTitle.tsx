// 이 파일이 하는 일: 홈 화면 각 구역의 제목과 "전체 보기" 링크
import { Link } from "react-router-dom";

interface SectionTitleProps {
  id: string;
  title: string;
  to: string;
  linkLabel: string;
}

export default function SectionTitle({ id, title, to, linkLabel }: SectionTitleProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <h2 id={id} className="text-2xl font-bold">
        {title}
      </h2>
      <Link to={to} className="shrink-0 text-base font-medium text-navy-700 underline underline-offset-4">
        {linkLabel}
      </Link>
    </div>
  );
}
