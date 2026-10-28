// 이 파일이 하는 일: 사이트 로고 (심볼 + 사이트 이름)
import { profile } from "../data/profile";

interface LogoProps {
  inverted?: boolean;
}

export default function Logo({ inverted = false }: LogoProps) {
  return (
    <span className="flex items-center gap-3">
      <svg width="36" height="36" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
        <rect width="32" height="32" rx="7" fill={inverted ? "#ffffff" : "#172440"} />
        <path
          d="M8 22V10M13 22V10l7 12V10"
          stroke={inverted ? "#172440" : "#ffffff"}
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24.5" cy="21.5" r="2" fill="#c9a96e" />
      </svg>
      <span className="flex flex-col leading-tight">
        <span className={`font-serif text-xl font-bold ${inverted ? "text-white" : "text-navy-900"}`}>
          {profile.siteName}
        </span>
        <span className={`hidden text-xs sm:block ${inverted ? "text-navy-200" : "text-slate-500"}`}>
          {profile.name} 연구실
        </span>
      </span>
    </span>
  );
}
