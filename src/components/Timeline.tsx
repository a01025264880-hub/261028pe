// 이 파일이 하는 일: 학력·경력을 "기간 | 내용" 형태의 이력서 목록으로 표시
export interface TimelineRow {
  period: string;
  main: string;
  sub: string;
}

export default function Timeline({ rows }: { rows: TimelineRow[] }) {
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
