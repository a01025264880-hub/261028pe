// 이 파일이 하는 일: 상단 네비게이션 (모바일에서는 햄버거 메뉴)
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { profile } from "../data/profile";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/", label: "홈", end: true },
  { to: "/research", label: "연구", end: false },
  { to: "/teaching", label: "수업 자료", end: false },
  { to: "/about", label: "소개", end: false },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-md px-3 py-2 text-base font-medium transition-colors ${
    isActive ? "bg-navy-50 text-navy-900" : "text-slate-600 hover:bg-slate-100 hover:text-navy-900"
  }`;

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Link to="/" className="text-lg font-bold text-navy-900">
          {profile.name}
          <span className="ml-2 hidden text-sm font-normal text-slate-500 sm:inline">
            {profile.affiliation}
          </span>
        </Link>

        <nav aria-label="주요 메뉴" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="ml-2">
              <Link
                to="/login"
                className="rounded-md border border-navy-800 px-4 py-2 text-base font-medium text-navy-800 transition-colors hover:bg-navy-800 hover:text-white"
              >
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
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="모바일 메뉴" className="border-t border-slate-200 md:hidden">
          <ul className="mx-auto max-w-5xl space-y-1 px-5 py-3">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/login"
                className="block rounded-md bg-navy-800 px-3 py-2 text-center text-base font-medium text-white hover:bg-navy-900"
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
