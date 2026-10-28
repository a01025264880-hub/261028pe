// 이 파일이 하는 일: 상단 네비게이션 (모바일에서는 햄버거 메뉴)
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "./Container";
import Logo from "./Logo";

const navItems = [
  { to: "/", label: "홈", end: true },
  { to: "/research", label: "연구", end: false },
  { to: "/teaching", label: "수업 자료", end: false },
  { to: "/about", label: "소개", end: false },
];

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative px-3 py-2 text-base font-medium transition-colors after:absolute after:inset-x-3 after:-bottom-[1px] after:h-0.5 after:rounded-full after:transition-colors ${
    isActive
      ? "text-navy-900 after:bg-gold-400"
      : "text-slate-600 after:bg-transparent hover:text-navy-900"
  }`;

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-md px-4 py-3 text-base font-medium ${
    isActive ? "bg-navy-50 text-navy-900" : "text-slate-700 hover:bg-slate-100"
  }`;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? "border-slate-200 shadow-sm" : "border-transparent"
      }`}
    >
      <Container className="flex h-18 items-center justify-between">
        <Link to="/" aria-label="홈으로" className="rounded-md">
          <Logo />
        </Link>

        <nav aria-label="주요 메뉴" className="hidden md:block">
          <ul className="flex items-center gap-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={desktopLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="ml-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2 text-base font-medium text-white transition-colors hover:bg-navy-700"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                {user ? "내 계정" : "로그인"}
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-navy-900 hover:bg-slate-100 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <nav id="mobile-menu" aria-label="모바일 메뉴" className="border-t border-slate-200 bg-white shadow-lg md:hidden">
          <ul className="space-y-1 px-5 py-4">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={mobileLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-3">
              <Link
                to="/login"
                className="block rounded-full bg-navy-900 px-4 py-3 text-center text-base font-medium text-white hover:bg-navy-700"
              >
                {user ? "내 계정" : "로그인"}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
