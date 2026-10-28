// 이 파일이 하는 일: 연구 상세 (요약, 공동연구자, 키워드, 외부 링크)
import { Link, useParams } from "react-router-dom";
import { getResearch } from "../services/researchService";
import { useAsync } from "../lib/useAsync";
import { usePageTitle } from "../lib/usePageTitle";
import ExternalLinkList from "../components/ExternalLinkList";
import StatusBadge from "../components/StatusBadge";
import StatusMessage from "../components/StatusMessage";
import Tag from "../components/Tag";

export default function ResearchDetailPage() {
  const { id = "" } = useParams();
  const { data: research, loading, error } = useAsync(() => getResearch(id), [id]);
  usePageTitle(research?.title ?? "연구 상세");

  const backLink = (
    <Link to="/research" className="mb-8 inline-block text-base text-navy-700 underline underline-offset-4">
      ← 연구 목록으로
    </Link>
  );

  if (loading) return <StatusMessage kind="loading" />;
  if (error || !research)
    return (
      <>
        {backLink}
        <h1 className="mb-6 text-3xl font-bold">연구 상세</h1>
        {error ? (
          <StatusMessage kind="error" />
        ) : (
          <StatusMessage kind="empty" message="해당 연구를 찾을 수 없습니다. 주소를 확인해 주세요." />
        )}
      </>
    );

  return (
    <article>
      {backLink}
      <div className="mb-3 flex items-center gap-2 text-slate-500">
        <span>{research.year}년</span>
        <StatusBadge status={research.status} />
      </div>
      <h1 className="text-3xl font-bold sm:text-4xl">{research.title}</h1>

      <dl className="mt-10 space-y-8">
        <div>
          <dt className="mb-2 text-xl font-semibold text-navy-900">요약</dt>
          <dd className="text-lg text-slate-700">{research.summary}</dd>
        </div>
        <div>
          <dt className="mb-2 text-xl font-semibold text-navy-900">공동연구자</dt>
          <dd className="text-slate-700">
            {research.collaborators.length > 0 ? research.collaborators.join(", ") : "단독 연구"}
          </dd>
        </div>
        <div>
          <dt className="mb-2 text-xl font-semibold text-navy-900">키워드</dt>
          <dd className="flex flex-wrap gap-2">
            {research.tags.length > 0 ? (
              research.tags.map((t) => <Tag key={t}>{t}</Tag>)
            ) : (
              <span className="text-slate-500">없음</span>
            )}
          </dd>
        </div>
        <div>
          <dt className="mb-2 text-xl font-semibold text-navy-900">관련 링크</dt>
          <dd>
            <ExternalLinkList links={research.links} />
          </dd>
        </div>
      </dl>
    </article>
  );
}
