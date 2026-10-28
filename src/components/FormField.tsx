// 이 파일이 하는 일: 입력 칸 위에 제목(라벨)과 도움말을 붙여 주는 양식 틀
import type { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}

export const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-800 focus:border-navy-600";

export default function FormField({ id, label, hint, required = false, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-navy-900">
        {label}
        {required && (
          <span className="ml-1 text-red-700" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-slate-500">
          {hint}
        </p>
      )}
    </div>
  );
}
