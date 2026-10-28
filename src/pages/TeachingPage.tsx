// 이 파일이 하는 일: 수업 자료 (과목별 묶음, 학기 필터, 외부 링크)
import { useMemo, useState } from "react";
import { listMaterials } from "../services/teachingService";
import { useAsync } from "../lib/useAsync";
import { usePageTitle } from "../lib/usePageTitle";
import { formatSemester } from "../lib/format";
import type { TeachingMaterial } from "../types";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import MaterialItem from "../components/MaterialItem";
import SelectFilter from "../components/SelectFilter";
import StatusMessage from "../components/StatusMessage";

export default function TeachingPage() {
  usePageTitle("수업 자료");
  const { data, loading, error } = useAsync(listMaterials, []);
  const [semester, setSemester] = useState("");

  const all = useMemo(() => data ?? [], [data]);
  const semesters = useMemo(() => [...new Set(all.map((m) => m.semester))].sort().reverse(), [all]);

  const groups = useMemo(() => {
    const map = new Map<string, TeachingMaterial[]>();
    for (const m of all) {
      if (semester && m.semester !== semester) continue;
      const list = map.get(m.course) ?? [];
      list.push(m);
      map.set(m.course, list);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b, "ko"));
  }, [all, semester]);

  return (
    <>
      <PageHeader
        eyebrow="TEACHING"
        title="수업 자료"
        description="과목별 강의안, 참고문헌, 과제 안내를 모았습니다. 링크를 누르면 새 창에서 열립니다."
      />
      <Container className="relative -mt-8">
      <div className="mb-12 max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
        <SelectFilter
          id="filter-semester"
          label="학기"
          value={semester}
          onChange={setSemester}
          options={semesters.map((s) => ({ value: s, label: formatSemester(s) }))}
        />
      </div>

      {loading && <StatusMessage kind="loading" />}
      {error && <StatusMessage kind="error" />}
      {data && groups.length === 0 && (
        <StatusMessage kind="empty" message={all.length === 0 ? "등록된 수업 자료가 없습니다." : "선택한 학기의 자료가 없습니다."} />
      )}
      <div className="space-y-16">
        {groups.map(([course, items], index) => (
          <section key={course} aria-labelledby={`course-${index}`}>
            <div className="mb-6 flex flex-wrap items-baseline gap-3 border-b border-slate-200 pb-3">
              <span aria-hidden="true" className="font-serif text-2xl font-bold text-gold-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 id={`course-${index}`} className="font-serif text-2xl font-bold">
                {course}
              </h2>
              <span className="text-slate-500">자료 {items.length}건</span>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((m) => (
                <MaterialItem key={m.id} material={m} />
              ))}
            </div>
          </section>
        ))}
      </div>
      </Container>
    </>
  );
}
