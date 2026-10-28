// 이 파일이 하는 일: 소개 페이지 (학력, 경력, 연구 관심사, 연락처를 이력서 형태로 표시)
import { profile } from "../data/profile";
import { usePageTitle } from "../lib/usePageTitle";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import Tag from "../components/Tag";
import Timeline from "../components/Timeline";

function initialOf(name: string): string {
  const cleaned = name.replace(/[[\]]/g, "").trim();
  return cleaned.charAt(0) || "?";
}

export default function AboutPage() {
  usePageTitle("소개");
  return (
    <>
      <PageHeader eyebrow="ABOUT" title="소개" description={profile.siteTagline} />

      <Container className="grid gap-12 py-14 lg:grid-cols-[18rem_1fr]">
        <aside aria-label="프로필 요약" className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div
              aria-hidden="true"
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-navy-900 font-serif text-4xl font-bold text-gold-300 ring-4 ring-gold-100"
            >
              {initialOf(profile.name)}
            </div>
            <p className="mt-4 font-serif text-2xl font-bold text-navy-900">{profile.name}</p>
            <p className="text-slate-600">{profile.affiliation}</p>
            <p className="text-slate-600">{profile.title}</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-4 py-2.5 font-medium text-white hover:bg-navy-700"
            >
              이메일 보내기
            </a>
            <p className="mt-2 break-all text-sm text-slate-500">{profile.email}</p>
          </div>
        </aside>

        <div className="space-y-14">
          <section aria-labelledby="about-intro">
            <h2 id="about-intro" className="mb-4 font-serif text-2xl font-bold">인사말</h2>
            <p className="text-lg text-slate-700">{profile.introduction}</p>
          </section>

          <div className="grid gap-12 md:grid-cols-2">
            <section aria-labelledby="about-edu">
              <h2 id="about-edu" className="mb-6 font-serif text-2xl font-bold">학력</h2>
              <Timeline
                rows={profile.education.map((e) => ({ period: e.period, main: e.degree, sub: e.institution }))}
              />
            </section>

            <section aria-labelledby="about-career">
              <h2 id="about-career" className="mb-6 font-serif text-2xl font-bold">경력</h2>
              <Timeline
                rows={profile.career.map((c) => ({ period: c.period, main: c.position, sub: c.organization }))}
              />
            </section>
          </div>

          <section aria-labelledby="about-areas">
            <h2 id="about-areas" className="mb-4 font-serif text-2xl font-bold">연구 관심사</h2>
            <ul className="flex flex-wrap gap-2">
              {profile.researchAreas.map((a) => (
                <li key={a}>
                  <Tag>{a}</Tag>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>
    </>
  );
}
