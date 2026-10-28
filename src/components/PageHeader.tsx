// 이 파일이 하는 일: 각 페이지 상단의 제목 띠 (네이비 배경 + 영문 소제목 + 제목 + 설명)
import type { ReactNode } from "react";
import Container from "./Container";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <div className="bg-academic-grid relative overflow-hidden bg-navy-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-gold-400/30"
      />
      <Container className="relative py-14 sm:py-20">
        {eyebrow && <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-gold-300">{eyebrow}</p>}
        <h1 className="font-serif text-3xl font-bold text-white sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-navy-100">{description}</p>}
        {children}
      </Container>
    </div>
  );
}
