// 이 파일이 하는 일: 서비스 함수를 호출하고 로딩/에러/결과 상태를 관리하는 공통 도구
import { useCallback, useEffect, useState } from "react";

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  /** 데이터를 다시 불러옴 (추가·수정·삭제 후 사용) */
  reload: () => void;
}

export function useAsync<T>(fn: () => Promise<T>, deps: readonly unknown[]): AsyncState<T> {
  const [state, setState] = useState<Omit<AsyncState<T>, "reload">>({ data: null, loading: true, error: null });
  const [version, setVersion] = useState(0);
  const reload = useCallback(() => setVersion((v) => v + 1), []);

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ data: prev.data, loading: true, error: null }));
    fn()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "알 수 없는 오류";
          console.error(err);
          setState({ data: null, loading: false, error: message });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [...deps, version]);

  return { ...state, reload };
}
