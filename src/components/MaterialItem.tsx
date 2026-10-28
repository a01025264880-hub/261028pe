// 이 파일이 하는 일: 수업 자료 한 건을 표시 (자료 유형, 학기, 설명, 외부 링크)
import type { TeachingMaterial } from "../types";
import { formatSemester } from "../lib/format";
import ExternalLinkList from "./ExternalLinkList";

interface MaterialItemProps {
  material: TeachingMaterial;
  showCourse?: boolean;
}

export default function MaterialItem({ material, showCourse = false }: MaterialItemProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
        <span className="rounded bg-navy-800 px-2 py-0.5 font-semibold text-white">{material.type}</span>
        <span className="text-slate-500">{formatSemester(material.semester)}</span>
      </div>
      {showCourse && <p className="text-sm text-slate-500">{material.course}</p>}
      <h3 className="text-lg font-semibold">{material.title}</h3>
      <p className="mt-1 text-slate-600">{material.description}</p>
      <div className="mt-4">
        <ExternalLinkList links={material.links} emptyText="링크 준비 중입니다." />
      </div>
    </article>
  );
}
