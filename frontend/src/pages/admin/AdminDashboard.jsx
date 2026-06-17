import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchAdminStats } from "../../api/admin";

const StatCard = ({ label, value, sub, color }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
    <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-3">{label}</p>
    <p className={`text-[36px] font-black leading-none ${color}`}>{value ?? "—"}</p>
    {sub && <p className="text-[12px] text-gray-400 mt-2">{sub}</p>}
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
      .catch((err) => {
        if (err.message === "UNAUTHORIZED") { logout(); navigate("/admin/login"); }
      })
      .finally(() => setLoading(false));
  }, [token, logout, navigate]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-[24px] font-black text-gray-900">Tổng quan</h1>
        <p className="text-[14px] text-gray-500 mt-1">Thống kê nội dung hiện tại của website</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
              <div className="h-3 bg-gray-200 rounded w-24 mb-4" />
              <div className="h-10 bg-gray-200 rounded w-16" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard label="Tin tức" value={stats?.newsCount} color="text-blue-600" />
          <StatCard label="Việc làm" value={stats?.jobsCount} sub="đang tuyển" color="text-emerald-600" />
          <StatCard label="Liên hệ" value={stats?.contactsCount} sub="tổng cộng" color="text-violet-600" />
          <StatCard
            label="Liên hệ mới"
            value={stats?.recentContacts}
            sub="7 ngày qua"
            color="text-[#c00000]"
          />
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-[15px] font-bold text-gray-900 mb-4">Truy cập nhanh</h2>
          <div className="flex flex-col gap-2">
            {[
              { label: "Xem danh sách liên hệ", to: "/admin/contacts" },
              { label: "Xem trang web", to: "/", external: true },
              { label: "Quản lý DB (Prisma Studio)", note: "npx prisma studio" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                <span className="text-[13px] text-gray-700">{item.label}</span>
                {item.to ? (
                  <a
                    href={item.to}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="text-[12px] font-semibold text-[#c00000] hover:underline"
                  >
                    Mở →
                  </a>
                ) : (
                  <code className="text-[11px] bg-gray-100 text-gray-600 px-2 py-1 rounded">{item.note}</code>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0f172a] rounded-2xl p-6">
          <h2 className="text-[15px] font-bold text-white mb-2">Thông tin tài khoản</h2>
          <p className="text-white/40 text-[12px] mb-4">Bước 2.6 sẽ thêm chức năng tạo/sửa/xóa nội dung</p>
          <div className="space-y-2 text-[13px]">
            <div className="flex justify-between">
              <span className="text-white/50">Phiên bản</span>
              <span className="text-white font-semibold">2.5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Database</span>
              <span className="text-white font-semibold">SQLite (dev)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Token hết hạn</span>
              <span className="text-white font-semibold">8 giờ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
