// 이 파일이 하는 일: 연구 상태(진행중/완료)를 배지로 표시
import type { ResearchStatus } from "../types";

export default function StatusBadge({ status }: { status: ResearchStatus }) {
  const ongoing = status === "진행중";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-sm font-semibold ${
        ongoing ? "bg-gold-100 text-gold-700" : "bg-slate-100 text-slate-600"
      }`}
    >
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${ongoing ? "bg-gold-400" : "bg-slate-400"}`} />
      {status}
    </span>
  );
}
