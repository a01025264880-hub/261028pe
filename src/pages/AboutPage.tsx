// 이 파일이 하는 일: 소개 페이지 (학력, 경력, 연구 관심사, 연락처를 이력서 형태로 표시)
import { profile } from "../data/profile";
import { usePageTitle } from "../lib/usePageTitle";
import PageHeader from "../components/PageHeader";
import Tag from "../components/Tag";

interface Row {
  period: string;
  main: string;
  sub: string;
}

function Timeline({ rows }: { rows: Row[] }) {
  return (
    <ul className="divide-y divide-slate-200 border-y border-slate-200">
      {rows.map((row) => (
        <li key={`${row.period}-${row.main}-${row.sub}`} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]">
          <span className="text-slate-500">{row.period}</span>
          <span>
            <span className="font-semibold text-navy-900">{row.main}</span>
            <span className="block text-slate-600">{row.sub}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function AboutPage() {
  usePageTitle("소개");
  return (
    <>
      <PageHeader title={profile.name} description={`${profile.affiliation} · ${profile.title}`} />

      <div className="space-y-12">
        <section aria-labelledby="about-intro">
          <h2 id="about-intro" className="mb-4 text-2xl font-bold">소개</h2>
          <p className="max-w-3xl text-lg text-slate-700">{profile.introduction}</p>
        </section>

        <section aria-labelledby="about-edu">
          <h2 id="about-edu" className="mb-4 text-2xl font-bold">학력</h2>
          <Timeline rows={profile.education.map((e) => ({ period: e.period, main: e.degree, sub: e.institution }))} />
        </section>

        <section aria-labelledby="about-career">
          <h2 id="about-career" className="mb-4 text-2xl font-bold">경력</h2>
          <Timeline rows={profile.career.map((c) => ({ period: c.period, main: c.position, sub: c.organization }))} />
        </section>

        <section aria-labelledby="about-areas">
          <h2 id="about-areas" className="mb-4 text-2xl font-bold">연구 관심사</h2>
          <ul className="flex flex-wrap gap-2">
            {profile.researchAreas.map((a) => (
              <li key={a}><Tag>{a}</Tag></li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="about-contact">
          <h2 id="about-contact" className="mb-4 text-2xl font-bold">연락처</h2>
          <p className="text-lg">
            이메일:{" "}
            <a href={`mailto:${profile.email}`} className="text-navy-700 underline underline-offset-4">
              {profile.email}
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
