// 이 파일이 하는 일: 관리자 화면 (관리자 계정만 연구·수업 자료를 추가·수정·삭제)
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePageTitle } from "../lib/usePageTitle";
import AdminMaterialPanel from "../components/AdminMaterialPanel";
import AdminResearchPanel from "../components/AdminResearchPanel";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import StatusMessage from "../components/StatusMessage";

type Tab = "research" | "teaching";

const tabs: { key: Tab; label: string }[] = [
  { key: "research", label: "연구" },
  { key: "teaching", label: "수업 자료" },
];

export default function AdminPage() {
  usePageTitle("관리");
  const { user, loading, isAdmin } = useAuth();
  const [tab, setTab] = useState<Tab>("research");

  return (
    <>
      <PageHeader eyebrow="ADMIN" title="관리" description="연구와 수업 자료를 추가·수정·삭제합니다. 저장하면 사이트에 바로 반영됩니다." />
      <Container className="py-12">
        {loading && <StatusMessage kind="loading" message="로그인 상태를 확인하는 중입니다..." />}
        {!loading && !user && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
            <p className="text-lg text-slate-700">관리 화면은 로그인 후 이용할 수 있습니다.</p>
            <Link
              to="/login"
              className="mt-5 inline-block rounded-full bg-navy-900 px-6 py-3 font-semibold text-white hover:bg-navy-700"
            >
              로그인하러 가기
            </Link>
          </div>
        )}
        {!loading && user && !isAdmin && (
          <StatusMessage kind="error" message={`${user.email ?? "이 계정"}은(는) 관리자 권한이 없습니다.`} />
        )}
        {!loading && user && isAdmin && (
          <>
            <div role="tablist" aria-label="관리 항목" className="mb-8 flex gap-2 border-b border-slate-200">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  id={`tab-${t.key}`}
                  aria-selected={tab === t.key}
                  aria-controls={`panel-${t.key}`}
                  onClick={() => setTab(t.key)}
                  className={`-mb-px border-b-2 px-5 py-3 text-base font-semibold ${
                    tab === t.key ? "border-gold-400 text-navy-900" : "border-transparent text-slate-500 hover:text-navy-900"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
              {tab === "research" ? <AdminResearchPanel /> : <AdminMaterialPanel />}
            </div>
          </>
        )}
      </Container>
    </>
  );
}
