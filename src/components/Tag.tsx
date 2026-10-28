// 이 파일이 하는 일: 키워드·태그를 작은 라벨 모양으로 표시
interface TagProps {
  children: string;
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="inline-block rounded-full bg-navy-50 px-3 py-0.5 text-sm font-medium text-navy-700">
      {children}
    </span>
  );
}
