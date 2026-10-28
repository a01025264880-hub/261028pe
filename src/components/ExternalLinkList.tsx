// 이 파일이 하는 일: 외부 링크 목록을 새 창으로 열리는 링크로 표시
import type { ExternalLink } from "../types";

interface ExternalLinkListProps {
  links: ExternalLink[];
  emptyText?: string;
}

export default function ExternalLinkList({ links, emptyText = "등록된 링크가 없습니다." }: ExternalLinkListProps) {
  if (links.length === 0) return <p className="text-slate-500">{emptyText}</p>;
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((link) => (
        <li key={`${link.label}-${link.url}`}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-4 py-1.5 text-base font-medium text-navy-700 transition-colors hover:border-navy-900 hover:bg-navy-900 hover:text-white"
          >
            {link.label}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="sr-only">(새 창에서 열림)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
