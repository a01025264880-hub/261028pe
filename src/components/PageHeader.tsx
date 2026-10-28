// 이 파일이 하는 일: 각 페이지 상단의 제목과 설명 영역
interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-10 border-b border-slate-200 pb-6">
      <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
      {description && <p className="mt-3 text-lg text-slate-600">{description}</p>}
    </div>
  );
}
