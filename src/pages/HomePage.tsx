// 이 파일이 하는 일: 홈 화면 (교수 소개 요약, 연구 분야, 대표 연구 3건, 최근 수업 자료 3건)
import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { listFeaturedResearches } from "../services/researchService";
import { listMaterials } from "../services/teachingService";
import { useAsync } from "../lib/useAsync";
import { usePageTitle } from "../lib/usePageTitle";
import ResearchCard from "../components/ResearchCard";
import MaterialItem from "../components/MaterialItem";
import StatusMessage from "../components/StatusMessage";
import Tag from "../components/Tag";
import SectionTitle from "../components/SectionTitle";

export default function HomePage() {
  usePageTitle();
  const research = useAsync(() => listFeaturedResearches(3), []);
  const teaching = useAsync(() => listMaterials().then((list) => list.slice(0, 3)), []);

  return (
    <div className="space-y-16">
      <section aria-labelledby="intro-title" className="rounded-xl bg-navy-900 px-6 py-10 text-white sm:px-10 sm:py-14">
        <p className="text-base text-navy-200">
          {profile.affiliation} · {profile.title}
        </p>
        <h1 id="intro-title" className="mt-2 text-3xl font-bold text-white sm:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-navy-100">{profile.introduction}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/research" className="rounded-md bg-white px-5 py-2.5 font-semibold text-navy-900 hover:bg-navy-50">
            연구 보기
          </Link>
          <Link
            to="/about"
            className="rounded-md border border-white/60 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
          >
            소개 보기
          </Link>
        </div>
      </section>

      <section aria-labelledby="areas-title">
        <h2 id="areas-title" className="mb-4 text-2xl font-bold">
          연구 분야
        </h2>
        <ul className="flex flex-wrap gap-2">
          {profile.researchAreas.map((area) => (
            <li key={area}>
              <Tag>{area}</Tag>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="featured-title">
        <SectionTitle id="featured-title" title="대표 연구" to="/research" linkLabel="전체 연구 보기" />
        {research.loading && <StatusMessage kind="loading" />}
        {research.error && <StatusMessage kind="error" />}
        {research.data && research.data.length === 0 && <StatusMessage kind="empty" message="등록된 연구가 없습니다." />}
        {research.data && research.data.length > 0 && (
          <div className="grid gap-5 md:grid-cols-3">
            {research.data.map((r) => (
              <ResearchCard key={r.id} research={r} />
            ))}
          </div>
        )}
      </section>

      <section aria-labelledby="recent-title">
        <SectionTitle id="recent-title" title="최근 수업 자료" to="/teaching" linkLabel="전체 수업 자료 보기" />
        {teaching.loading && <StatusMessage kind="loading" />}
        {teaching.error && <StatusMessage kind="error" />}
        {teaching.data && teaching.data.length === 0 && (
          <StatusMessage kind="empty" message="등록된 수업 자료가 없습니다." />
        )}
        {teaching.data && teaching.data.length > 0 && (
          <div className="grid gap-5 md:grid-cols-3">
            {teaching.data.map((m) => (
              <MaterialItem key={m.id} material={m} showCourse />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
