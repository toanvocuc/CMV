import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchAdminStats } from "../../api/admin";

const StatCard = ({ label, value, sub, color, to, highlight }) => {
  const inner = (
    <div className={`bg-white rounded-2xl border p-6 h-full transition-all duration-200 ${
      highlight
        ? "border-amber-200 shadow-md shadow-amber-100/50 hover:shadow-lg hover:shadow-amber-100"
        : "border-gray-100 shadow-sm hover:shadow-md"
    }`}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
        {highlight && value > 0 && (
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Cần xử lý
          </span>
        )}
      </div>
      <p className={`text-[40px] font-black leading-none tracking-tight ${color}`}>{value ?? "—"}</p>
      {sub && <p className="text-[12px] text-gray-400 mt-2.5 font-medium">{sub}</p>}
    </div>
  );

  return to ? (
    <Link to={to} className="block">{inner}</Link>
  ) : (
    inner
  );
};

const StatusBar = ({ label, count, total, barColor }) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-[12px] font-medium text-gray-500 w-[76px] shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[13px] font-bold text-gray-700 w-7 text-right">{count}</span>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
    <div className="h-3 bg-gray-200 rounded w-24 mb-4" />
    <div className="h-10 bg-gray-200 rounded w-16 mb-2" />
    <div className="h-3 bg-gray-100 rounded w-20" />
  </div>
);

const AdminDashboard = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminStats(token)
      .then((r) => setStats(r.data))
      .catch((err) => { if (err.message === "UNAUTHORIZED") { logout(); navigate("/admin/login"); } })
      .finally(() => setLoading(false));
  }, [token, logout, navigate]);

  const sc = stats?.newsStatusCounts ?? {};
  const newsTotal = stats?.newsTotal ?? 0;

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-[24px] font-black text-gray-900">Tổng quan</h1>
        <p className="text-[14px] text-gray-500 mt-1">Thống kê và hoạt động của hệ thống</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            <StatCard
              label="Chờ duyệt"
              value={sc.pending ?? 0}
              sub="bài viết"
              color="text-amber-600"
              to="/admin/news?status=pending"
              highlight
            />
            <StatCard
              label="Đã đăng"
              value={sc.published ?? 0}
              sub="bài viết"
              color="text-emerald-600"
              to="/admin/news?status=published"
            />
            <StatCard
              label="Việc làm"
              value={stats?.jobsCount ?? 0}
              sub="đang tuyển"
              color="text-blue-600"
              to="/admin/jobs"
            />
            <StatCard
              label="Liên hệ mới"
              value={stats?.recentContacts ?? 0}
              sub="7 ngày qua"
              color="text-violet-600"
              to="/admin/contacts"
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Status breakdown */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-[15px] font-bold text-gray-900">Tin tức theo trạng thái</h2>
              <p className="text-[12px] text-gray-400 mt-0.5">{newsTotal} bài viết tổng cộng</p>
            </div>
            <Link
              to="/admin/news"
              className="text-[12px] font-semibold text-[#c00000] hover:underline"
            >
              Xem tất cả →
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-100 rounded-full animate-pulse" />
              ))}
            </div>
          ) : newsTotal === 0 ? (
            <div className="text-center py-8">
              <p className="text-[13px] text-gray-400">Chưa có bài viết nào.</p>
              <Link to="/admin/news" className="text-[13px] font-semibold text-[#c00000] hover:underline mt-2 inline-block">
                Tạo bài viết đầu tiên →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <StatusBar label="Nháp" count={sc.draft ?? 0} total={newsTotal} barColor="bg-gray-400" />
              <StatusBar label="Chờ duyệt" count={sc.pending ?? 0} total={newsTotal} barColor="bg-amber-400" />
              <StatusBar label="Đã đăng" count={sc.published ?? 0} total={newsTotal} barColor="bg-emerald-500" />
              <StatusBar label="Từ chối" count={sc.rejected ?? 0} total={newsTotal} barColor="bg-red-500" />
            </div>
          )}
        </div>

        {/* Quick links + system info */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-[13px] font-bold text-gray-900 mb-3">Truy cập nhanh</h2>
            <nav className="flex flex-col">
              {[
                {
                  label: "Bài viết chờ duyệt",
                  to: "/admin/news?status=pending",
                  badge: (sc.pending > 0) ? sc.pending : null,
                  amber: true,
                },
                { label: "Quản lý tin tức", to: "/admin/news" },
                { label: "Quản lý tuyển dụng", to: "/admin/jobs" },
                { label: "Danh sách liên hệ", to: "/admin/contacts" },
                { label: "Xem trang web công khai", to: "/", external: true },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between py-2.5 px-2.5 -mx-2.5 rounded-xl hover:bg-gray-50 group transition-colors"
                >
                  <span className={`text-[13px] font-medium ${item.amber ? "text-amber-700" : "text-gray-600"} group-hover:text-gray-900 transition-colors`}>
                    {item.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <span className="text-gray-300 group-hover:text-gray-400 text-[12px]">→</span>
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          <div className="bg-[#0f172a] rounded-2xl p-5 flex-1">
            <h2 className="text-[13px] font-bold text-white mb-4">Hệ thống</h2>
            <div className="space-y-2.5 text-[12px]">
              {[
                ["Database",    "SQLite (dev)"],
                ["Token",       "8 giờ / phiên"],
                ["Tổng tin tức",loading ? "..." : `${newsTotal} bài`],
                ["Tổng liên hệ",loading ? "..." : `${stats?.contactsCount ?? 0} mục`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center">
                  <span className="text-white/40 font-medium">{k}</span>
                  <span className="text-white font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
