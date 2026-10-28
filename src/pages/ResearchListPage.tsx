// 이 파일이 하는 일: 연구 목록 (제목·키워드 검색, 연도·태그·상태 필터)
import { useMemo, useState } from "react";
import { listResearches } from "../services/researchService";
import { useAsync } from "../lib/useAsync";
import { usePageTitle } from "../lib/usePageTitle";
import PageHeader from "../components/PageHeader";
import ResearchCard from "../components/ResearchCard";
import SelectFilter from "../components/SelectFilter";
import StatusMessage from "../components/StatusMessage";

export default function ResearchListPage() {
  usePageTitle("연구");
  const { data, loading, error } = useAsync(listResearches, []);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState("");

  const all = useMemo(() => data ?? [], [data]);
  const years = useMemo(() => [...new Set(all.map((r) => r.year))].sort((a, b) => b - a), [all]);
  const tags = useMemo(() => [...new Set(all.flatMap((r) => r.tags))].sort((a, b) => a.localeCompare(b, "ko")), [all]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((r) => {
      if (q && !r.title.toLowerCase().includes(q) && !r.tags.some((t) => t.toLowerCase().includes(q))) return false;
      if (year && String(r.year) !== year) return false;
      if (tag && !r.tags.includes(tag)) return false;
      if (status && r.status !== status) return false;
      return true;
    });
  }, [all, query, year, tag, status]);

  const hasFilter = query || year || tag || status;
  const reset = () => {
    setQuery("");
    setYear("");
    setTag("");
    setStatus("");
  };

  return (
    <>
      <PageHeader title="연구" description="진행 중이거나 완료된 연구를 소개합니다. 제목이나 키워드로 찾아보세요." />

      <form
        role="search"
        aria-label="연구 검색"
        onSubmit={(e) => e.preventDefault()}
        className="mb-8 grid gap-4 rounded-lg bg-slate-50 p-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-4">
          <label htmlFor="research-search" className="text-sm font-medium text-slate-700">
            제목·키워드 검색
          </label>
          <input
            id="research-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="예: 교사교육"
            className="h-11 rounded-md border border-slate-300 bg-white px-3 text-base"
          />
        </div>
        <SelectFilter
          id="filter-year"
          label="연도"
          value={year}
          onChange={setYear}
          options={years.map((y) => ({ value: String(y), label: `${y}년` }))}
        />
        <SelectFilter
          id="filter-tag"
          label="태그"
          value={tag}
          onChange={setTag}
          options={tags.map((t) => ({ value: t, label: t }))}
        />
        <SelectFilter
          id="filter-status"
          label="상태"
          value={status}
          onChange={setStatus}
          options={[
            { value: "진행중", label: "진행중" },
            { value: "완료", label: "완료" },
          ]}
        />
        <div className="flex items-end">
          <button
            type="button"
            onClick={reset}
            disabled={!hasFilter}
            className="h-11 w-full rounded-md border border-slate-300 bg-white px-4 text-base text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            조건 초기화
          </button>
        </div>
      </form>

      {loading && <StatusMessage kind="loading" />}
      {error && <StatusMessage kind="error" />}
      {data && all.length === 0 && <StatusMessage kind="empty" message="등록된 연구가 없습니다." />}
      {data && all.length > 0 && (
        <>
          <p className="mb-4 text-slate-600" aria-live="polite">
            총 {filtered.length}건
          </p>
          {filtered.length === 0 ? (
            <StatusMessage kind="empty" message="조건에 맞는 연구가 없습니다. 검색어나 필터를 바꿔 보세요." />
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {filtered.map((r) => (
                <ResearchCard key={r.id} research={r} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
