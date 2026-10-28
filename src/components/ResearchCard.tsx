// 이 파일이 하는 일: 연구 한 건을 카드 모양으로 요약 표시 (클릭 시 상세 페이지로 이동)
import { Link } from "react-router-dom";
import type { Research } from "../types";
import StatusBadge from "./StatusBadge";
import Tag from "./Tag";

export default function ResearchCard({ research }: { research: Research }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
        <span>{research.year}</span>
        <StatusBadge status={research.status} />
      </div>
      <h3 className="text-xl font-semibold">
        <Link to={`/research/${research.id}`} className="hover:underline hover:underline-offset-4">
          {research.title}
        </Link>
      </h3>
      <p className="mt-3 line-clamp-3 flex-1 text-slate-600">{research.summary}</p>
      {research.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {research.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
    </article>
  );
}
