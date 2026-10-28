// 이 파일이 하는 일: 연구 상세 (요약, 공동연구자, 키워드, 외부 링크)
import { Link, useParams } from "react-router-dom";
import { getResearch } from "../services/researchService";
import { useAsync } from "../lib/useAsync";
import { usePageTitle } from "../lib/usePageTitle";
import Container from "../components/Container";
import ExternalLinkList from "../components/ExternalLinkList";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import StatusMessage from "../components/StatusMessage";
import Tag from "../components/Tag";

const backLinkClass =
  "inline-flex items-center gap-1 text-base font-medium text-navy-200 hover:text-white hover:underline hover:underline-offset-4";

export default function ResearchDetailPage() {
  const { id = "" } = useParams();
  const { data: research, loading, error } = useAsync(() => getResearch(id), [id]);
  usePageTitle(research?.title ?? "연구 상세");

  const backLink = (
    <Link to="/research" className={backLinkClass}>
      <span aria-hidden="true">←</span> 연구 목록으로
    </Link>
  );

  if (loading)
    return (
      <Container className="py-16">
        <StatusMessage kind="loading" />
      </Container>
    );

  if (error || !research)
    return (
      <>
        <PageHeader eyebrow="RESEARCH" title="연구 상세">
          <div className="mt-6">{backLink}</div>
        </PageHeader>
        <Container className="py-12">
          {error ? (
            <StatusMessage kind="error" />
          ) : (
            <StatusMessage kind="empty" message="해당 연구를 찾을 수 없습니다. 주소를 확인해 주세요." />
          )}
        </Container>
      </>
    );

  return (
    <article>
      <PageHeader eyebrow={`RESEARCH · ${research.year}`} title={research.title}>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <StatusBadge status={research.status} />
          {backLink}
        </div>
      </PageHeader>

      <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_20rem]">
        <section aria-labelledby="summary-title">
          <h2 id="summary-title" className="mb-4 flex items-center gap-3 font-serif text-2xl font-bold">
            <span aria-hidden="true" className="h-6 w-1 rounded-full bg-gold-400" />
            연구 요약
          </h2>
          <p className="text-lg text-slate-700">{research.summary}</p>

          <h2 id="links-title" className="mb-4 mt-12 flex items-center gap-3 font-serif text-2xl font-bold">
            <span aria-hidden="true" className="h-6 w-1 rounded-full bg-gold-400" />
            관련 링크
          </h2>
          <ExternalLinkList links={research.links} />
        </section>

        <aside aria-label="연구 정보" className="h-fit rounded-xl border border-slate-200 bg-slate-50 p-6">
          <dl className="space-y-6">
            <div>
              <dt className="text-sm font-semibold tracking-wide text-gold-700">연도</dt>
              <dd className="mt-1 text-lg font-semibold text-navy-900">{research.year}년</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold tracking-wide text-gold-700">공동연구자</dt>
              <dd className="mt-1 text-slate-700">
                {research.collaborators.length > 0 ? (
                  <ul className="space-y-1">
                    {research.collaborators.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                ) : (
                  "단독 연구"
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold tracking-wide text-gold-700">키워드</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {research.tags.length > 0 ? (
                  research.tags.map((t) => <Tag key={t}>{t}</Tag>)
                ) : (
                  <span className="text-slate-500">없음</span>
                )}
              </dd>
            </div>
          </dl>
        </aside>
      </Container>
    </article>
  );
}
