// 이 파일이 하는 일: 모든 페이지 하단의 푸터 (사이트 소개, 바로가기, 연락처)
import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import Container from "./Container";
import Logo from "./Logo";

const links = [
  { to: "/research", label: "연구" },
  { to: "/teaching", label: "수업 자료" },
  { to: "/about", label: "소개" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-navy-950 text-navy-200">
      <Container className="grid gap-10 py-14 md:grid-cols-[2fr_1fr_1.5fr]">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-sm text-navy-200">{profile.siteTagline}</p>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold tracking-widest text-gold-300">바로가기</h2>
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-navy-100 hover:text-white hover:underline hover:underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold tracking-widest text-gold-300">연락처</h2>
          <p className="text-navy-100">{profile.name}</p>
          <p>{profile.affiliation}</p>
          <a href={`mailto:${profile.email}`} className="text-navy-100 underline underline-offset-4 hover:text-white">
            {profile.email}
          </a>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-5 text-sm text-navy-300">
          © {new Date().getFullYear()} {profile.siteName}. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}
