// 이 파일이 하는 일: 숫자 하나와 설명을 보여 주는 작은 통계 카드 (홈 화면 상단)
interface StatCardProps {
  value: number | string;
  label: string;
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur-sm">
      <p className="font-serif text-3xl font-bold text-white">{value}</p>
      <p className="mt-1 text-sm text-navy-200">{label}</p>
    </div>
  );
}
