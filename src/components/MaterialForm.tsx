// 이 파일이 하는 일: (관리자) 수업 자료를 추가하거나 수정하는 입력 양식
import { useState, type FormEvent } from "react";
import type { ExternalLink, MaterialType, TeachingMaterial } from "../types";
import type { MaterialInput } from "../services/teachingService";
import { today } from "../services/firestoreHelpers";
import { cleanLinks } from "../lib/formUtils";
import FormField, { inputClass } from "./FormField";
import LinksEditor from "./LinksEditor";

const TYPES: MaterialType[] = ["강의안", "참고문헌", "과제", "기타"];

interface MaterialFormProps {
  initial?: TeachingMaterial;
  courses: string[];
  saving: boolean;
  onSubmit: (input: MaterialInput) => void;
  onCancel: () => void;
}

function defaultSemester(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() < 7 ? 1 : 2}`;
}

export default function MaterialForm({ initial, courses, saving, onSubmit, onCancel }: MaterialFormProps) {
  const [course, setCourse] = useState(initial?.course ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [semester, setSemester] = useState(initial?.semester ?? defaultSemester());
  const [type, setType] = useState<MaterialType>(initial?.type ?? "강의안");
  const [links, setLinks] = useState<ExternalLink[]>(initial?.links ?? []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      course: course.trim(),
      title: title.trim(),
      description: description.trim(),
      semester: semester.trim(),
      type,
      links: cleanLinks(links),
      createdAt: initial?.createdAt || today(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-navy-100 bg-navy-50/50 p-5 sm:p-6">
      <h3 className="font-serif text-xl font-bold">{initial ? "수업 자료 수정" : "새 수업 자료 추가"}</h3>
      <FormField id="m-course" label="과목명" required hint="같은 과목명끼리 한 묶음으로 표시됩니다. 기존 과목은 목록에서 고를 수 있습니다.">
        <input
          id="m-course"
          list="m-course-list"
          aria-describedby="m-course-hint"
          className={inputClass}
          required
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <datalist id="m-course-list">
          {courses.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </FormField>
      <FormField id="m-title" label="자료 제목" required>
        <input id="m-title" className={inputClass} required value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormField>
      <FormField id="m-desc" label="설명">
        <textarea
          id="m-desc"
          className={`${inputClass} min-h-24`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormField>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="m-semester" label="학기" required hint="예: 2026-1 (1학기), 2026-2 (2학기)">
          <input
            id="m-semester"
            aria-describedby="m-semester-hint"
            className={inputClass}
            required
            pattern="\d{4}-[0-9A-Za-z가-힣]+"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
        </FormField>
        <FormField id="m-type" label="자료 유형" required>
          <select
            id="m-type"
            className={inputClass}
            value={type}
            onChange={(e) => setType(TYPES.find((t) => t === e.target.value) ?? "기타")}
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </FormField>
      </div>
      <LinksEditor idPrefix="m-link" links={links} onChange={setLinks} />
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
