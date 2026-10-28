// 이 파일이 하는 일: 저장 성공·실패 같은 짧은 안내 문구를 색깔 상자로 표시
interface NoticeProps {
  kind: "success" | "error";
  message: string;
}

export default function Notice({ kind, message }: NoticeProps) {
  return (
    <p
      role={kind === "error" ? "alert" : "status"}
      className={`rounded-lg border px-4 py-3 ${
        kind === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"
      }`}
    >
      {message}
    </p>
  );
}
