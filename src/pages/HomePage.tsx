// 이 파일이 하는 일: 홈 화면 (사이트 소개, 통계, 연구 분야, 대표 연구 3건, 최근 수업 자료 3건)
import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { listFeaturedResearches, listResearches } from "../services/researchService";
import { listMaterials } from "../services/teachingService";
import { useAsync } from "../lib/useAsync";
import { usePageTitle } from "../lib/usePageTitle";
import Container from "../components/Container";
import ResearchCard from "../components/ResearchCard";
import MaterialItem from "../components/MaterialItem";
import SectionTitle from "../components/SectionTitle";
import StatCard from "../components/StatCard";
import StatusMessage from "../components/StatusMessage";

export default function HomePage() {
  usePageTitle();
  const featured = useAsync(() => listFeaturedResearches(3), []);
  const allResearch = useAsync(listResearches, []);
  const allMaterials = useAsync(listMaterials, []);

  const researchList = allResearch.data ?? [];
  const materialList = allMaterials.data ?? [];
  const recent = materialList.slice(0, 3);
  const stats = [
    { value: researchList.length, label: "전체 연구" },
    { value: researchList.filter((r) => r.status === "진행중").length, label: "진행 중인 연구" },
    { value: new Set(materialList.map((m) => m.course)).size, label: "담당 과목" },
    { value: materialList.length, label: "수업 자료" },
  ];

  return (
    <>
      {/* 첫 화면 소개 */}
      <section aria-labelledby="intro-title" className="bg-academic-grid relative overflow-hidden bg-navy-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full border border-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-navy-600/20 blur-3xl"
        />
        <Container className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-400/40 px-4 py-1 text-sm font-medium text-gold-300">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              {profile.siteTagline}
            </p>
            <h1 id="intro-title" className="font-serif text-4xl font-bold leading-tight text-white sm:text-6xl">
              {profile.siteName}
            </h1>
            <p className="mt-4 text-lg font-medium text-navy-100">
              {profile.name} · {profile.affiliation} {profile.title}
            </p>
            <p className="mt-6 max-w-2xl text-lg text-navy-200">{profile.introduction}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/research"
                className="rounded-full bg-gold-400 px-6 py-3 font-semibold text-navy-950 transition-colors hover:bg-gold-300"
              >
                연구 둘러보기
              </Link>
              <Link
                to="/teaching"
                className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                수업 자료 보기
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <StatCard key={s.label} value={allResearch.loading || allMaterials.loading ? "-" : s.value} label={s.label} />
            ))}
          </div>
        </Container>
      </section>

      {/* 연구 분야 */}
      <section aria-labelledby="areas-title" className="border-b border-slate-200 bg-slate-50">
        <Container className="py-16">
          <SectionTitle id="areas-title" eyebrow="RESEARCH AREAS" title="연구 분야" />
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
            {profile.researchAreas.map((area, i) => (
              <li
                key={area}
                className="rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-gold-400"
              >
                <span className="font-serif text-lg font-bold text-gold-700">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-lg font-semibold text-navy-900">{area}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 대표 연구 */}
      <section aria-labelledby="featured-title">
        <Container className="py-20">
          <SectionTitle
            id="featured-title"
            eyebrow="FEATURED RESEARCH"
            title="대표 연구"
            to="/research"
            linkLabel="전체 연구 보기"
          />
          {featured.loading && <StatusMessage kind="loading" />}
          {featured.error && <StatusMessage kind="error" />}
          {featured.data && featured.data.length === 0 && (
            <StatusMessage kind="empty" message="등록된 연구가 없습니다." />
          )}
          {featured.data && featured.data.length > 0 && (
            <div className="grid gap-6 md:grid-cols-3">
              {featured.data.map((r) => (
                <ResearchCard key={r.id} research={r} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* 최근 수업 자료 */}
      <section aria-labelledby="recent-title" className="bg-navy-50/60">
        <Container className="py-20">
          <SectionTitle
            id="recent-title"
            eyebrow="TEACHING"
            title="최근 수업 자료"
            to="/teaching"
            linkLabel="전체 수업 자료 보기"
          />
          {allMaterials.loading && <StatusMessage kind="loading" />}
          {allMaterials.error && <StatusMessage kind="error" />}
          {allMaterials.data && recent.length === 0 && (
            <StatusMessage kind="empty" message="등록된 수업 자료가 없습니다." />
          )}
          {recent.length > 0 && (
            <div className="grid gap-6 md:grid-cols-3">
              {recent.map((m) => (
                <MaterialItem key={m.id} material={m} showCourse />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* 공동연구자 안내 */}
      <section aria-labelledby="collab-title">
        <Container className="pt-20">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 p-8 sm:flex-row sm:items-center sm:p-12">
            <div>
              <h2 id="collab-title" className="font-serif text-2xl font-bold text-white sm:text-3xl">
                공동연구자 자료실
              </h2>
              <p className="mt-2 text-lg text-navy-100">
                공동연구자 전용 자료 열람 공간을 준비하고 있습니다. 문의는 이메일로 부탁드립니다.
              </p>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="shrink-0 rounded-full bg-white px-6 py-3 font-semibold text-navy-900 transition-colors hover:bg-gold-100"
            >
              이메일 문의
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
