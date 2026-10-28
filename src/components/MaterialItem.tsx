// 이 파일이 하는 일: 수업 자료 한 건을 표시 (자료 유형 아이콘, 학기, 설명, 외부 링크)
import type { TeachingMaterial } from "../types";
import { formatSemester } from "../lib/format";
import ExternalLinkList from "./ExternalLinkList";
import MaterialTypeIcon from "./MaterialTypeIcon";

interface MaterialItemProps {
  material: TeachingMaterial;
  showCourse?: boolean;
}

export default function MaterialItem({ material, showCourse = false }: MaterialItemProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <MaterialTypeIcon type={material.type} />
        <div className="leading-snug">
          <p className="font-semibold text-navy-900">{material.type}</p>
          <p className="text-sm text-slate-500">{formatSemester(material.semester)}</p>
        </div>
      </div>
      {showCourse && <p className="mb-1 text-sm font-medium text-gold-700">{material.course}</p>}
      <h3 className="text-lg font-semibold">{material.title}</h3>
      <p className="mt-2 flex-1 text-slate-600">{material.description}</p>
      <div className="mt-5 border-t border-slate-100 pt-4">
        <ExternalLinkList links={material.links} emptyText="링크 준비 중입니다." />
      </div>
    </article>
  );
}
