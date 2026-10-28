// 이 파일이 하는 일: 연구 한 건을 카드 모양으로 요약 표시 (카드 전체를 누르면 상세 페이지로 이동)
import { Link } from "react-router-dom";
import type { Research } from "../types";
import StatusBadge from "./StatusBadge";
import Tag from "./Tag";

export default function ResearchCard({ research }: { research: Research }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lg focus-within:-translate-y-1 focus-within:shadow-lg">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-navy-800 via-navy-600 to-gold-400 opacity-0 transition-opacity group-hover:opacity-100"
      />
      <div className="mb-4 flex items-center justify-between gap-2">
        <span className="font-serif text-2xl font-bold text-navy-600">{research.year}</span>
        <StatusBadge status={research.status} />
      </div>
      <h3 className="text-xl font-semibold">
        <Link
          to={`/research/${research.id}`}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          {research.title}
        </Link>
      </h3>
      <p className="mt-3 line-clamp-3 flex-1 text-slate-600">{research.summary}</p>
      {research.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {research.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
      <span aria-hidden="true" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-navy-700">
        자세히 보기
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </article>
  );
}
