import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchAdminJobs, createJob, updateJob, deleteJob } from "../../api/admin";
import { DeptBadge, JobActiveBadge } from "../../components/admin/ui/Badge";
import ConfirmDialog from "../../components/admin/ui/ConfirmDialog";
import DropdownMenu from "../../components/admin/ui/DropdownMenu";

const DEPARTMENTS = ["Kỹ thuật", "Tài chính", "Môi trường", "Công nghệ", "Kinh doanh", "An toàn", "Nhân sự", "Khác"];
const LEVELS      = ["Thực tập", "Trung cấp", "Cao cấp", "Quản lý"];
const TYPES       = ["Toàn thời gian", "Bán thời gian", "Hợp đồng"];

const EMPTY = { title: "", department: "Kỹ thuật", location: "", type: "Toàn thời gian", level: "Trung cấp", deadline: "", isActive: true };

const Spinner = () => (
  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

// ─── Form drawer ──────────────────────────────────────────────────────────────

const JobDrawer = ({ item, token, onSave, onClose }) => {
  const [form, setForm] = useState(item ?? EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isEdit = !!item;

  const set = (field) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((p) => ({ ...p, [field]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEdit) await updateJob(token, item.id, form);
      else await createJob(token, form);
      onSave();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-3.5 py-2.5 text-[13px] border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all";
  const labelCls = "block text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-end z-50" onClick={onClose}>
      <div className="bg-white h-full w-full max-w-md shadow-2xl overflow-y-auto flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-[15px] font-black text-gray-900">{isEdit ? "Sửa vị trí tuyển dụng" : "Thêm vị trí mới"}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 flex-1">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] rounded-xl px-4 py-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              {error}
            </div>
          )}

          <div>
            <label className={labelCls}>Chức danh *</label>
            <input value={form.title} onChange={set("title")} required placeholder="Kỹ sư Khai thác Mỏ..." className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Phòng ban *</label>
              <select value={form.department} onChange={set("department")} className={`${inputCls} bg-white`}>
                {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Cấp độ</label>
              <select value={form.level} onChange={set("level")} className={`${inputCls} bg-white`}>
                {LEVELS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Địa điểm *</label>
            <input value={form.location} onChange={set("location")} required placeholder="Hà Nội / Quảng Ninh..." className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Loại hình</label>
              <select value={form.type} onChange={set("type")} className={`${inputCls} bg-white`}>
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Hạn nộp</label>
              <input value={form.deadline} onChange={set("deadline")} placeholder="dd/mm/yyyy" className={inputCls} />
            </div>
          </div>

          {/* Active toggle */}
          <label className="flex items-center gap-3 cursor-pointer select-none py-1">
            <div className="relative">
              <input type="checkbox" checked={form.isActive} onChange={set("isActive")} className="sr-only peer" />
              <div className="w-10 h-6 bg-gray-200 peer-checked:bg-emerald-500 rounded-full transition-colors duration-200" />
              <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-4" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-800">Đang tuyển dụng</p>
              <p className="text-[11px] text-gray-400">{form.isActive ? "Hiển thị trên trang tuyển dụng" : "Ẩn khỏi trang tuyển dụng"}</p>
            </div>
          </label>

          <div className="flex gap-3 pt-2 pb-4">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 border border-gray-200 text-gray-600 text-[13px] font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              Huỷ
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-3 bg-gray-900 hover:bg-gray-700 disabled:opacity-60 text-white text-[13px] font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
              {loading && <Spinner />}
              {loading ? "Đang lưu..." : (isEdit ? "Lưu thay đổi" : "Thêm vị trí")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────

const AdminJobs = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => {
    setLoading(true);
    fetchAdminJobs(token)
      .then((r) => setJobs(r.data))
      .catch((err) => { if (err.message === "UNAUTHORIZED") { logout(); navigate("/admin/login"); } })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async () => {
    setDeleting(true);
    try { await deleteJob(token, deleteTarget.id); setDeleteTarget(null); load(); }
    catch (err) { if (err.message === "UNAUTHORIZED") { logout(); navigate("/admin/login"); } }
    finally { setDeleting(false); }
  };

  const getMenuItems = (job) => [
    {
      label: "Chỉnh sửa",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
        </svg>
      ),
      onClick: () => setModal(job),
    },
    "---",
    {
      label: "Xóa vị trí",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      ),
      onClick: () => setDeleteTarget(job),
      danger: true,
    },
  ];

  const activeCount = jobs.filter((j) => j.isActive).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-black text-gray-900">Tuyển dụng</h1>
          <p className="text-[14px] text-gray-500 mt-1">
            {loading ? "Đang tải..." : `${activeCount} vị trí đang tuyển · ${jobs.length} tổng`}
          </p>
        </div>
        <button
          onClick={() => setModal("create")}
          className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-[13px] font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Thêm vị trí
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              {["Chức danh", "Phòng ban", "Địa điểm", "Hạn nộp", "Trạng thái", ""].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider last:w-10">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-5 py-4">
                    <div className="h-4 bg-gray-100 rounded-lg w-36 mb-2 animate-pulse" />
                    <div className="h-3 bg-gray-50 rounded-lg w-24 animate-pulse" />
                  </td>
                  <td className="px-5 py-4"><div className="h-5 bg-gray-100 rounded-full w-16 animate-pulse" /></td>
                  <td className="px-5 py-4"><div className="h-4 bg-gray-100 rounded-lg w-20 animate-pulse" /></td>
                  <td className="px-5 py-4"><div className="h-4 bg-gray-100 rounded-lg w-20 animate-pulse" /></td>
                  <td className="px-5 py-4"><div className="h-5 bg-gray-100 rounded-full w-20 animate-pulse" /></td>
                  <td className="px-5 py-4"><div className="w-6 h-6 bg-gray-100 rounded-lg animate-pulse" /></td>
                </tr>
              ))
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="text-center py-20">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </div>
                    <p className="text-[14px] font-semibold text-gray-500">Chưa có vị trí tuyển dụng</p>
                    <button onClick={() => setModal("create")} className="mt-4 text-[13px] font-semibold text-[#c00000] hover:underline">
                      Thêm vị trí đầu tiên →
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50/60 transition-colors group">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-900 group-hover:text-[#c00000] transition-colors">{job.title}</p>
                    <p className="text-gray-400 text-[11px] mt-0.5">{job.level} · {job.type}</p>
                  </td>
                  <td className="px-5 py-4"><DeptBadge dept={job.department} /></td>
                  <td className="px-5 py-4 text-gray-600">{job.location}</td>
                  <td className="px-5 py-4 text-gray-400 text-[12px]">{job.deadline || "—"}</td>
                  <td className="px-5 py-4"><JobActiveBadge isActive={job.isActive} /></td>
                  <td className="px-5 py-4"><DropdownMenu items={getMenuItems(job)} /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <JobDrawer
          item={modal === "create" ? null : modal}
          token={token}
          onSave={() => { setModal(null); load(); }}
          onClose={() => setModal(null)}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Xóa vị trí tuyển dụng"
          description={`Vị trí "${deleteTarget.title}" sẽ bị xóa vĩnh viễn.`}
          confirmLabel="Xóa vĩnh viễn"
          danger
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default AdminJobs;
