// 이 파일이 하는 일: Vite 빌드 도구 설정 (React, Tailwind CSS 플러그인 연결, 큰 라이브러리 파일 분리)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/@firebase/firestore") || id.includes("node_modules/firebase/firestore"))
            return "firebase-firestore";
          if (id.includes("node_modules/@firebase/") || id.includes("node_modules/firebase/")) return "firebase-core";
          if (id.includes("node_modules/react") || id.includes("node_modules/scheduler")) return "react";
        },
      },
    },
  },
});
