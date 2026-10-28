// 이 파일이 하는 일: 주소(URL)별로 어떤 페이지를 보여 줄지 정하는 길잡이
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ResearchListPage from "./pages/ResearchListPage";
import ResearchDetailPage from "./pages/ResearchDetailPage";
import TeachingPage from "./pages/TeachingPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import StatusMessage from "./components/StatusMessage";

// 관리 화면은 관리자만 쓰므로 필요할 때 따로 불러옴
const AdminPage = lazy(() => import("./pages/AdminPage"));
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="research" element={<ResearchListPage />} />
        <Route path="research/:id" element={<ResearchDetailPage />} />
        <Route path="teaching" element={<TeachingPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="admin"
          element={
            <Suspense fallback={<StatusMessage kind="loading" />}>
              <AdminPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
