// 이 파일이 하는 일: (관리자) 연구를 추가하거나 수정하는 입력 양식
import { useState, type FormEvent } from "react";
import type { ExternalLink, Research, ResearchStatus } from "../types";
import type { ResearchInput } from "../services/researchService";
import { today } from "../services/firestoreHelpers";
import { cleanLinks, splitList } from "../lib/formUtils";
import FormField, { inputClass } from "./FormField";
import LinksEditor from "./LinksEditor";

interface ResearchFormProps {
  initial?: Research;
  saving: boolean;
  onSubmit: (input: ResearchInput) => void;
  onCancel: () => void;
}

export default function ResearchForm({ initial, saving, onSubmit, onCancel }: ResearchFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [year, setYear] = useState(String(initial?.year ?? new Date().getFullYear()));
  const [status, setStatus] = useState<ResearchStatus>(initial?.status ?? "진행중");
  const [tags, setTags] = useState(initial?.tags.join(", ") ?? "");
  const [collaborators, setCollaborators] = useState(initial?.collaborators.join(", ") ?? "");
  const [links, setLinks] = useState<ExternalLink[]>(initial?.links ?? []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: title.trim(),
      summary: summary.trim(),
      year: Number(year),
      status,
      tags: splitList(tags),
      collaborators: splitList(collaborators),
      links: cleanLinks(links),
      createdAt: initial?.createdAt || today(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-navy-100 bg-navy-50/50 p-5 sm:p-6">
      <h3 className="font-serif text-xl font-bold">{initial ? "연구 수정" : "새 연구 추가"}</h3>
      <FormField id="r-title" label="제목" required>
        <input id="r-title" className={inputClass} required value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormField>
      <FormField id="r-summary" label="요약" required>
        <textarea
          id="r-summary"
          className={`${inputClass} min-h-28`}
          required
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </FormField>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="r-year" label="연도" required>
          <input
            id="r-year"
            type="number"
            min={1950}
            max={2100}
            className={inputClass}
            required
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </FormField>
        <FormField id="r-status" label="상태" required>
          <select
            id="r-status"
            className={inputClass}
            value={status}
            onChange={(e) => setStatus(e.target.value === "완료" ? "완료" : "진행중")}
          >
            <option value="진행중">진행중</option>
            <option value="완료">완료</option>
          </select>
        </FormField>
      </div>
      <FormField id="r-tags" label="키워드" hint="쉼표(,)로 구분해 주세요. 예: 교사교육, 수업설계">
        <input
          id="r-tags"
          aria-describedby="r-tags-hint"
          className={inputClass}
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </FormField>
      <FormField id="r-collab" label="공동연구자" hint="쉼표(,)로 구분해 주세요. 비워 두면 '단독 연구'로 표시됩니다.">
        <input
          id="r-collab"
          aria-describedby="r-collab-hint"
          className={inputClass}
          value={collaborators}
          onChange={(e) => setCollaborators(e.target.value)}
        />
      </FormField>
      <LinksEditor idPrefix="r-link" links={links} onChange={setLinks} />
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-navy-900 px-6 py-2.5 font-semibold text-white hover:bg-navy-700 disabled:opacity-60"
        >
          {saving ? "저장 중..." : "저장"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-slate-300 px-6 py-2.5 font-semibold text-slate-700 hover:bg-slate-100"
        >
          취소
        </button>
      </div>
    </form>
  );
}
