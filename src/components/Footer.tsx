// 이 파일이 하는 일: 모든 페이지 하단의 푸터 (이름, 소속, 연락처)
import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-5xl px-5 py-10 text-slate-600">
        <p className="font-semibold text-navy-900">{profile.name}</p>
        <p>{profile.affiliation}</p>
        <p>
          이메일:{" "}
          <a href={`mailto:${profile.email}`} className="text-navy-700 underline underline-offset-2">
            {profile.email}
          </a>
        </p>
        <p className="mt-4 text-sm text-slate-500">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
