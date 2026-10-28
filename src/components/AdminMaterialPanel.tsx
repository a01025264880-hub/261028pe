// 이 파일이 하는 일: (관리자) 수업 자료 목록 보기·추가·수정·삭제·샘플 넣기
import { useMemo, useState } from "react";
import {
  createMaterial,
  deleteMaterial,
  listMaterials,
  seedSampleMaterials,
  updateMaterial,
  type MaterialInput,
} from "../services/teachingService";
import { useAsync } from "../lib/useAsync";
import { toKoreanError } from "../lib/firebaseErrors";
import { formatSemester } from "../lib/format";
import type { TeachingMaterial } from "../types";
import MaterialForm from "./MaterialForm";
import Notice from "./Notice";
import StatusMessage from "./StatusMessage";

type Editing = { mode: "new" } | { mode: "edit"; item: TeachingMaterial } | null;

export default function AdminMaterialPanel() {
  const { data, loading, error, reload } = useAsync(listMaterials, []);
  const [editing, setEditing] = useState<Editing>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ kind: "success" | "error"; message: string } | null>(null);
  const courses = useMemo(() => [...new Set((data ?? []).map((m) => m.course))].sort(), [data]);

  const run = async (task: () => Promise<string>) => {
    setSaving(true);
    setNotice(null);
    try {
      const message = await task();
      setNotice({ kind: "success", message });
      setEditing(null);
      reload();
    } catch (err) {
      setNotice({ kind: "error", message: toKoreanError(err) });
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = (input: MaterialInput) =>
    run(async () => {
      if (editing?.mode === "edit") {
        await updateMaterial(editing.item.id, input);
        return "수업 자료를 수정했습니다.";
      }
      await createMaterial(input);
      return "새 수업 자료를 추가했습니다.";
    });

  const handleDelete = (item: TeachingMaterial) => {
    if (!window.confirm(`"${item.title}" 자료를 삭제할까요? 삭제하면 되돌릴 수 없습니다.`)) return;
    void run(async () => {
      await deleteMaterial(item.id);
      return "수업 자료를 삭제했습니다.";
    });
  };

  const handleSeed = () =>
    run(async () => {
      const n = await seedSampleMaterials();
      return n > 0 ? `샘플 수업 자료 ${n}건을 넣었습니다.` : "이미 자료가 있어 샘플을 넣지 않았습니다.";
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-slate-600">
          총 <strong className="text-navy-900">{data?.length ?? 0}</strong>건
        </p>
        {!editing && (
          <button
            type="button"
            onClick={() => setEditing({ mode: "new" })}
            className="rounded-full bg-navy-900 px-5 py-2.5 font-semibold text-white hover:bg-navy-700"
          >
            + 새 수업 자료 추가
          </button>
        )}
      </div>

      {notice && <Notice kind={notice.kind} message={notice.message} />}

      {editing && (
        <MaterialForm
          key={editing.mode === "edit" ? editing.item.id : "new"}
          initial={editing.mode === "edit" ? editing.item : undefined}
          courses={courses}
          saving={saving}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
        />
      )}

      {loading && !data && <StatusMessage kind="loading" />}
      {error && <StatusMessage kind="error" message={`불러오기 실패: ${error}`} />}
      {data && data.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
          <p className="text-slate-600">아직 등록된 수업 자료가 없습니다.</p>
          <button
            type="button"
            onClick={handleSeed}
            disabled={saving}
            className="mt-4 rounded-full border border-navy-200 px-5 py-2.5 font-medium text-navy-700 hover:bg-navy-50 disabled:opacity-60"
          >
            샘플 수업 자료 6건 넣기
          </button>
        </div>
      )}
      {data && data.length > 0 && (
        <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
          {data.map((m) => (
            <li key={m.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="mb-1 text-sm text-slate-500">
                  {m.course} · {formatSemester(m.semester)} · {m.type}
                </p>
                <p className="font-semibold text-navy-900">{m.title}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setNotice(null);
                    setEditing({ mode: "edit", item: m });
                    window.scrollTo({ top: 0 });
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  수정
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(m)}
                  disabled={saving}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-50 disabled:opacity-60"
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
