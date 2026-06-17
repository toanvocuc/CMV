import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchAdminContacts } from "../../api/admin";

const AdminContacts = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchAdminContacts(token)
      .then((r) => setContacts(r.data))
      .catch((err) => {
        if (err.message === "UNAUTHORIZED") { logout(); navigate("/admin/login"); }
      })
      .finally(() => setLoading(false));
  }, [token, logout, navigate]);

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-black text-gray-900">Liên hệ</h1>
          <p className="text-[14px] text-gray-500 mt-1">{contacts.length} tin nhắn đã nhận</p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-5 animate-pulse flex gap-4">
              <div className="h-4 bg-gray-200 rounded w-32" />
              <div className="h-4 bg-gray-200 rounded w-48" />
              <div className="h-4 bg-gray-200 rounded flex-1" />
            </div>
          ))}
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center text-gray-400">
          <p className="text-[15px]">Chưa có liên hệ nào.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-[13px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Họ tên", "Email", "Chủ đề", "Nội dung", "Thời gian"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {contacts.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                >
                  <td className="px-5 py-4 font-semibold text-gray-900 whitespace-nowrap">{c.name}</td>
                  <td className="px-5 py-4 text-gray-600">{c.email}</td>
                  <td className="px-5 py-4">
                    {c.subject ? (
                      <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{c.subject}</span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-gray-500 max-w-xs truncate">{c.message}</td>
                  <td className="px-5 py-4 text-gray-400 whitespace-nowrap">{formatDate(c.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-7" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <h2 className="text-[18px] font-black text-gray-900">Chi tiết liên hệ</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <dl className="space-y-3 text-[14px]">
              {[
                ["Họ tên", selected.name],
                ["Email", selected.email],
                ["Điện thoại", selected.phone || "—"],
                ["Chủ đề", selected.subject || "—"],
                ["Thời gian", formatDate(selected.createdAt)],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <dt className="w-28 shrink-0 text-gray-500 font-medium">{k}</dt>
                  <dd className="text-gray-900 font-semibold">{v}</dd>
                </div>
              ))}
              <div className="pt-3 border-t border-gray-100">
                <dt className="text-gray-500 font-medium mb-2">Nội dung</dt>
                <dd className="text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4">{selected.message}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
