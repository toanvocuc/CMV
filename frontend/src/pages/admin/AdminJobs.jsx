import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchAdminJobs, createJob, updateJob, deleteJob } from "../../api/admin";

const DEPARTMENTS = ["Kỹ thuật", "Tài chính", "Môi trường", "Công nghệ", "Kinh doanh", "An toàn", "Nhân sự", "Khác"];
const LEVELS = ["Thực tập", "Trung cấp", "Cao cấp", "Quản lý"];
const TYPES = ["Toàn thời gian", "Bán thời gian", "Hợp đồng"];

const EMPTY = { title: "", department: "Kỹ thuật", location: "", type: "Toàn thời gian", level: "Trung cấp", deadline: "", isActive: true };

const JobModal = ({ item, token, onSave, onClose }) => {
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-end z-50" onClick={onClose}>
      <div className="bg-white h-full w-full max-w-md shadow-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-[16px] font-black text-gray-900">{isEdit ? "Sửa vị trí" : "Thêm vị trí"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] rounded-xl px-4 py-3">{error}</div>}

          <div>
            <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Chức danh *</label>
            <input value={form.title} onChange={set("title")} required placeholder="Kỹ sư Khai thác Mỏ..."
              className="w-full px-4 py-2.5 text-[14px] border border-gray-200 rounded-xl focus:outline-none focus:border-[#c00000] focus:ring-1 focus:ring-[#c00000]/20 transition-all" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Phòng ban *</label>
              <select value={form.department} onChange={set("department")}
                className="w-full px-4 py-2.5 text-[14px] border border-gray-200 rounded-xl focus:outline-none focus:border-[#c00000] bg-white transition-all">
                {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Cấp độ</label>
              <select value={form.level} onChange={set("level")}
                className="w-full px-4 py-2.5 text-[14px] border border-gray-200 rounded-xl focus:outline-none focus:border-[#c00000] bg-white transition-all">
                {LEVELS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Địa điểm *</label>
            <input value={form.location} onChange={set("location")} required placeholder="Hà Nội / Quảng Ninh..."
              className="w-full px-4 py-2.5 text-[14px] border border-gray-200 rounded-xl focus:outline-none focus:border-[#c00000] focus:ring-1 focus:ring-[#c00000]/20 transition-all" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Loại hình</label>
              <select value={form.type} onChange={set("type")}
                className="w-full px-4 py-2.5 text-[14px] border border-gray-200 rounded-xl focus:outline-none focus:border-[#c00000] bg-white transition-all">
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Hạn nộp</label>
              <input value={form.deadline} onChange={set("deadline")} placeholder="dd/mm/yyyy"
                className="w-full px-4 py-2.5 text-[14px] border border-gray-200 rounded-xl focus:outline-none focus:border-[#c00000] focus:ring-1 focus:ring-[#c00000]/20 transition-all" />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div className="relative">
              <input type="checkbox" checked={form.isActive} onChange={set("isActive")} className="sr-only peer" />
              <div className="w-10 h-6 bg-gray-200 peer-checked:bg-[#c00000] rounded-full transition-colors" />
              <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
            </div>
            <span className="text-[13px] font-semibold text-gray-700">Đang tuyển dụng</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Huỷ</button>
            <button type="submit" disabled={loading}
              className="flex-1 py-3 bg-[#c00000] hover:bg-red-700 disabled:opacity-60 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
              {loading && <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
              {loading ? "Đang lưu..." : (isEdit ? "Cập nhật" : "Thêm mới")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminJobs = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
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
    try { await deleteJob(token, deleteId); setDeleteId(null); load(); }
    catch (err) { if (err.message === "UNAUTHORIZED") { logout(); navigate("/admin/login"); } }
    finally { setDeleting(false); }
  };

  const DEPT_COLORS = { "Kỹ thuật": "bg-blue-50 text-blue-700", "Tài chính": "bg-amber-50 text-amber-700", "Môi trường": "bg-emerald-50 text-emerald-700", "Công nghệ": "bg-violet-50 text-violet-700", "Kinh doanh": "bg-sky-50 text-sky-700", "An toàn": "bg-orange-50 text-orange-700" };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-black text-gray-900">Tuyển dụng</h1>
          <p className="text-[14px] text-gray-500 mt-1">{jobs.length} vị trí</p>
        </div>
        <button onClick={() => setModal("create")}
          className="inline-flex items-center gap-2 bg-[#c00000] hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-full shadow-md shadow-red-900/20 transition-all hover:-translate-y-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Thêm vị trí
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-5 animate-pulse flex gap-4 items-center">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-[13px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Chức danh", "Phòng ban", "Địa điểm", "Hạn nộp", "Trạng thái", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-900">{job.title}</p>
                    <p className="text-gray-400 text-[11px]">{job.level} · {job.type}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${DEPT_COLORS[job.department] ?? "bg-gray-100 text-gray-600"}`}>
                      {job.department}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{job.location}</td>
                  <td className="px-5 py-4 text-gray-500">{job.deadline || "—"}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${job.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {job.isActive ? "Đang tuyển" : "Đóng"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => setModal(job)} className="text-[12px] font-semibold text-blue-600 hover:text-blue-800 transition-colors">Sửa</button>
                      <button onClick={() => setDeleteId(job.id)} className="text-[12px] font-semibold text-red-500 hover:text-red-700 transition-colors">Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <JobModal
          item={modal === "create" ? null : modal}
          token={token}
          onSave={() => { setModal(null); load(); }}
          onClose={() => setModal(null)}
        />
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-sm text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
            </div>
            <h3 className="text-[17px] font-black text-gray-900 mb-2">Xác nhận xóa</h3>
            <p className="text-[13px] text-gray-500 mb-6">Vị trí này sẽ bị xóa vĩnh viễn.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Huỷ</button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold rounded-xl transition-colors">
                {deleting ? "Đang xóa..." : "Xóa"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobs;
