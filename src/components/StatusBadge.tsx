// 이 파일이 하는 일: 연구 상태(진행중/완료)를 배지로 표시
import type { ResearchStatus } from "../types";

export default function StatusBadge({ status }: { status: ResearchStatus }) {
  const ongoing = status === "진행중";
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-sm font-semibold ${
        ongoing ? "bg-amber-100 text-amber-900" : "bg-slate-200 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}
