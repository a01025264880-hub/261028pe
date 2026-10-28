// 이 파일이 하는 일: 외부 링크(이름 + 주소) 여러 개를 추가·삭제하며 입력하는 칸
import type { ExternalLink } from "../types";
import { inputClass } from "./FormField";

interface LinksEditorProps {
  idPrefix: string;
  links: ExternalLink[];
  onChange: (links: ExternalLink[]) => void;
}

export default function LinksEditor({ idPrefix, links, onChange }: LinksEditorProps) {
  const update = (i: number, patch: Partial<ExternalLink>) =>
    onChange(links.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));

  return (
    <fieldset className="rounded-lg border border-slate-200 p-4">
      <legend className="px-1 text-sm font-semibold text-navy-900">외부 링크 (Google Drive, DOI, KCI, RISS 등)</legend>
      {links.length === 0 && <p className="mb-3 text-sm text-slate-500">아직 링크가 없습니다.</p>}
      <ul className="space-y-3">
        {links.map((link, i) => (
          <li key={i} className="grid gap-2 sm:grid-cols-[12rem_1fr_auto]">
            <label className="sr-only" htmlFor={`${idPrefix}-label-${i}`}>
              링크 {i + 1} 이름
            </label>
            <input
              id={`${idPrefix}-label-${i}`}
              className={inputClass}
              placeholder="이름 (예: KCI 논문)"
              value={link.label}
              onChange={(e) => update(i, { label: e.target.value })}
            />
            <label className="sr-only" htmlFor={`${idPrefix}-url-${i}`}>
              링크 {i + 1} 주소
            </label>
            <input
              id={`${idPrefix}-url-${i}`}
              className={inputClass}
              type="url"
              placeholder="https://"
              value={link.url}
              onChange={(e) => update(i, { url: e.target.value })}
            />
            <button
              type="button"
              onClick={() => onChange(links.filter((_, idx) => idx !== i))}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-red-50 hover:text-red-800"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => onChange([...links, { label: "", url: "" }])}
        className="mt-3 rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50"
      >
        + 링크 추가
      </button>
    </fieldset>
  );
}
