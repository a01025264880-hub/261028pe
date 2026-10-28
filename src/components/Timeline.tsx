// 이 파일이 하는 일: 학력·경력을 세로 타임라인(점과 선) 형태의 이력서 목록으로 표시
export interface TimelineRow {
  period: string;
  main: string;
  sub: string;
}

export default function Timeline({ rows }: { rows: TimelineRow[] }) {
  return (
    <ol className="relative ml-2 border-l-2 border-navy-100">
      {rows.map((row) => (
        <li key={`${row.period}-${row.main}-${row.sub}`} className="relative pb-8 pl-8 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-[3px] border-white bg-gold-400 ring-2 ring-navy-100"
          />
          <p className="text-sm font-semibold tracking-wide text-gold-700">{row.period}</p>
          <p className="mt-1 text-lg font-semibold text-navy-900">{row.main}</p>
          <p className="text-slate-600">{row.sub}</p>
        </li>
      ))}
    </ol>
  );
}
