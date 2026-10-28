// 이 파일이 하는 일: 로딩 중 / 오류 / 빈 목록 상태를 안내하는 공통 메시지
interface StatusMessageProps {
  kind: "loading" | "error" | "empty";
  message?: string;
}

const defaults = {
  loading: "불러오는 중입니다...",
  error: "자료를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
  empty: "표시할 항목이 없습니다.",
};

export default function StatusMessage({ kind, message }: StatusMessageProps) {
  const isError = kind === "error";
  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live="polite"
      className={`rounded-lg border px-5 py-8 text-center ${
        isError ? "border-red-200 bg-red-50 text-red-800" : "border-slate-200 bg-slate-50 text-slate-600"
      }`}
    >
      {message ?? defaults[kind]}
    </div>
  );
}
