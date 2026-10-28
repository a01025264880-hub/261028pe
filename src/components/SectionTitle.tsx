// 이 파일이 하는 일: 각 구역의 제목 (영문 소제목 + 제목 + "전체 보기" 링크)
import { Link } from "react-router-dom";

interface SectionTitleProps {
  id: string;
  eyebrow: string;
  title: string;
  to?: string;
  linkLabel?: string;
}

export default function SectionTitle({ id, eyebrow, title, to, linkLabel }: SectionTitleProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="mb-2 flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-gold-700">
          <span aria-hidden="true" className="h-px w-8 bg-gold-400" />
          {eyebrow}
        </p>
        <h2 id={id} className="font-serif text-2xl font-bold sm:text-3xl">
          {title}
        </h2>
      </div>
      {to && linkLabel && (
        <Link
          to={to}
          className="group inline-flex shrink-0 items-center gap-1 text-base font-semibold text-navy-700 hover:text-navy-900"
        >
          {linkLabel}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      )}
    </div>
  );
}
