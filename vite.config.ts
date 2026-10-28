// 이 파일이 하는 일: Vite 빌드 도구 설정 (React, Tailwind CSS 플러그인 연결)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
