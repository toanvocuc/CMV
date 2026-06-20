import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout/Layout";
import Home from "./pages/home/Home";
import NewsPage from "./pages/news/NewsPage";
import NewsDetailPage from "./pages/news/NewsDetailPage";
import AboutPage from "./pages/about/AboutPage";
import ContactPage from "./pages/contact/ContactPage";
import CareersPage from "./pages/careers/CareersPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import LoginPage from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminNews from "./pages/admin/AdminNews";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import WriterLayout from "./components/writer/WriterLayout";
import WriterDashboard from "./pages/writer/WriterDashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public website */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tin-tuc" element={<NewsPage />} />
            <Route path="/tin-tuc/:slug" element={<NewsDetailPage />} />
            <Route path="/gioi-thieu" element={<AboutPage />} />
            <Route path="/lien-he" element={<ContactPage />} />
            <Route path="/tuyen-dung" element={<CareersPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Unified login */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/login" element={<Navigate to="/login" replace />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="contacts" element={<AdminContacts />} />
          </Route>

          {/* Writer portal */}
          <Route
            path="/writer"
            element={
              <ProtectedRoute allowedRoles={["writer"]}>
                <WriterLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<WriterDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
