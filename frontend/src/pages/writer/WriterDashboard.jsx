import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  fetchMyArticles, createMyArticle, updateMyArticle, submitMyArticle, deleteMyArticle,
} from "../../api/writer";
import { StatusBadge, CategoryBadge } from "../../components/admin/ui/Badge";
import ConfirmDialog from "../../components/admin/ui/ConfirmDialog";
import ImageUpload from "../../components/admin/ui/ImageUpload";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = ["Sản xuất", "Đầu tư", "Bền vững", "Nhân sự", "Hợp tác", "Khác"];

const STATUS_TABS = [
  { key: "", label: "Tất cả" },
  { key: "draft", label: "Nháp" },
  { key: "pending", label: "Chờ duyệt" },
  { key: "published", label: "Đã đăng" },
  { key: "rejected", label: "Bị từ chối" },
];

const EMPTY = { title: "", slug: "", excerpt: "", content: "", category: "Sản xuất", image: "" };

function toSlug(str) {
  return str.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d").replace(/[^a-z0-9\s-]/g, "")
    .trim().replace(/\s+/g, "-");
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const Spinner = ({ size = 4 }) => (
  <svg className={`w-${size} h-${size} animate-spin shrink-0`} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

// Status-to-user-friendly message
const STATUS_MESSAGE = {
  draft:     "Bài nháp — có thể chỉnh sửa và gửi duyệt",
  pending:   "Đang chờ admin xét duyệt",
  published: "Đã được đăng lên trang web",
  rejected:  "Bị từ chối — hãy chỉnh sửa và lưu lại để gửi duyệt lần nữa",
};

// ─── Article form drawer ──────────────────────────────────────────────────────

const ArticleDrawer = ({ item, token, onSave, onClose }) => {
  const [form, setForm] = useState(item ?? EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isEdit = !!item;
  const canEdit = !isEdit || ["draft", "rejected"].includes(item.status);

  const set = (field) => (e) => {
    const val = e.target.value;
    setForm((p) => {
      const next = { ...p, [field]: val };
      if (field === "title" && !isEdit) next.slug = toSlug(val);
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canEdit) return;
    setLoading(true);
    setError(null);
    try {
      if (isEdit) await updateMyArticle(token, item.id, form);
      else await createMyArticle(token, form);
      onSave();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputCls = `w-full px-3.5 py-2.5 text-[13px] border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all ${!canEdit ? "bg-gray-50 text-gray-500 cursor-not-allowed" : ""}`;
  const labelCls = "block text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-end z-50" onClick={onClose}>
      <div className="bg-white h-full w-full max-w-xl shadow-2xl overflow-y-auto flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-[15px] font-black text-gray-900">
              {isEdit ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
            </h2>
            {isEdit && (
              <p className="text-[11px] text-gray-400 mt-0.5">{STATUS_MESSAGE[item.status]}</p>
            )}
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Read-only banner for non-editable status */}
        {isEdit && !canEdit && (
          <div className="mx-6 mt-5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-[13px] text-amber-700 font-medium">
            Bài viết này đang ở trạng thái <strong>{item.status === "pending" ? "chờ duyệt" : "đã đăng"}</strong> và không thể chỉnh sửa.
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-5 flex-1">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {/* Image upload */}
          <div>
            <label className={labelCls}>Ảnh bìa</label>
            <ImageUpload
              value={form.image}
              onChange={(url) => setForm((p) => ({ ...p, image: url }))}
              token={token}
            />
          </div>

          <div>
            <label className={labelCls}>Tiêu đề *</label>
            <input
              value={form.title}
              onChange={set("title")}
              required
              disabled={!canEdit}
              placeholder="Nhập tiêu đề bài viết..."
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Slug *</label>
            <input
              value={form.slug}
              onChange={set("slug")}
              required
              disabled={!canEdit}
              placeholder="tu-dong-tao-tu-tieu-de"
              className={`${inputCls} font-mono text-[12px]`}
            />
          </div>

          <div>
            <label className={labelCls}>Danh mục</label>
            <select value={form.category} onChange={set("category")} disabled={!canEdit} className={`${inputCls} bg-white`}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className={labelCls}>Tóm tắt</label>
            <textarea
              value={form.excerpt}
              onChange={set("excerpt")}
              rows={3}
              disabled={!canEdit}
              placeholder="Mô tả ngắn gọn về bài viết..."
              className={`${inputCls} resize-none`}
            />
          </div>

          <div>
            <label className={labelCls}>Nội dung *</label>
            <textarea
              value={form.content}
              onChange={set("content")}
              rows={12}
              required
              disabled={!canEdit}
              placeholder="Nội dung bài viết..."
              className={`${inputCls} resize-y`}
            />
          </div>

          {canEdit && (
            <div className="flex gap-3 pt-2 pb-4">
              <button type="button" onClick={onClose}
                className="flex-1 py-3 border border-gray-200 text-gray-600 text-[13px] font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                Huỷ
              </button>
              <button type="submit" disabled={loading}
                className="flex-1 py-3 bg-gray-900 hover:bg-gray-700 disabled:opacity-60 text-white text-[13px] font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                {loading && <Spinner />}
                {loading ? "Đang lưu..." : (isEdit ? "Lưu thay đổi" : "Tạo bài viết")}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────

const WriterDashboard = () => {
  const { token, name, logout } = useAuth();
  const navigate = useNavigate();

  const [articles, setArticles]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [statusFilter, setFilter] = useState("");

  const [modal, setModal]               = useState(null); // null | "create" | article
  const [submitTarget, setSubmitTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [submittingId, setSubmittingId] = useState(null);

  const handleUnauth = useCallback(
    (err) => { if (err.message === "UNAUTHORIZED") { logout(); navigate("/login"); } },
    [logout, navigate]
  );

  const load = useCallback(() => {
    setLoading(true);
    fetchMyArticles(token, statusFilter ? { status: statusFilter } : {})
      .then((r) => setArticles(r.data))
      .catch(handleUnauth)
      .finally(() => setLoading(false));
  }, [token, statusFilter, handleUnauth]);

  useEffect(() => { load(); }, [load]);

  const handleSubmitArticle = async () => {
    if (!submitTarget) return;
    setActionLoading(true);
    try { await submitMyArticle(token, submitTarget.id); setSubmitTarget(null); load(); }
    catch (err) { handleUnauth(err); }
    finally { setActionLoading(false); }
  };

  const handleDeleteArticle = async () => {
    if (!deleteTarget) return;
    setActionLoading(true);
    try { await deleteMyArticle(token, deleteTarget.id); setDeleteTarget(null); load(); }
    catch (err) { handleUnauth(err); }
    finally { setActionLoading(false); }
  };

  const canEdit   = (a) => ["draft", "rejected"].includes(a.status);
  const canSubmit = (a) => a.status === "draft";
  const canDelete = (a) => ["draft", "rejected"].includes(a.status);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-black text-gray-900">Bài viết của tôi</h1>
          <p className="text-[14px] text-gray-500 mt-1">
            Xin chào, <span className="font-semibold text-gray-700">{name}</span>
          </p>
        </div>
        <button
          onClick={() => setModal("create")}
          className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-[13px] font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Tạo bài mới
        </button>
      </div>

      {/* Workflow info banner */}
      <div className="mb-6 bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <div>
          <p className="text-[13px] font-semibold text-blue-800">Quy trình đăng bài</p>
          <p className="text-[12px] text-blue-600 mt-0.5">
            Tạo bài → Gửi duyệt → Admin xét duyệt → Đăng lên trang web
          </p>
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex items-center gap-0.5 mb-5 border-b border-gray-100">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2.5 text-[13px] font-semibold transition-colors -mb-px relative ${
              statusFilter === tab.key
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className="text-left px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-14">Ảnh</th>
              <th className="text-left px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tiêu đề</th>
              <th className="text-left px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Danh mục</th>
              <th className="text-left px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Trạng thái</th>
              <th className="text-left px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Ngày</th>
              <th className="px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-5 py-4"><div className="w-12 h-10 bg-gray-100 rounded-xl animate-pulse" /></td>
                  <td className="px-5 py-4">
                    <div className="h-4 bg-gray-100 rounded-lg w-3/4 mb-2 animate-pulse" />
                    <div className="h-3 bg-gray-50 rounded-lg w-1/2 animate-pulse" />
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell"><div className="h-5 bg-gray-100 rounded-full w-16 animate-pulse" /></td>
                  <td className="px-5 py-4"><div className="h-5 bg-gray-100 rounded-full w-20 animate-pulse" /></td>
                  <td className="px-5 py-4 hidden lg:table-cell"><div className="h-4 bg-gray-100 rounded-lg w-20 animate-pulse" /></td>
                  <td className="px-5 py-4"><div className="h-8 bg-gray-100 rounded-lg w-24 ml-auto animate-pulse" /></td>
                </tr>
              ))
            ) : articles.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="text-center py-20">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <p className="text-[14px] font-semibold text-gray-500">
                      {statusFilter ? "Không có bài viết nào" : "Chưa có bài viết nào"}
                    </p>
                    {!statusFilter && (
                      <button
                        onClick={() => setModal("create")}
                        className="mt-4 text-[13px] font-semibold text-[#c00000] hover:underline"
                      >
                        Tạo bài viết đầu tiên →
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="w-12 h-10 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      {article.image && <img src={article.image} alt="" className="w-full h-full object-cover" />}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-900 line-clamp-1">{article.title}</p>
                    <p className="text-gray-400 text-[11px] mt-0.5 font-mono">{article.slug}</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <CategoryBadge category={article.category} />
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={article.status} />
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-[12px] hidden lg:table-cell">
                    {article.date || "—"}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      {/* View button (always available) */}
                      <button
                        onClick={() => setModal(article)}
                        className="px-3 py-1.5 text-[12px] font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {canEdit(article) ? "Sửa" : "Xem"}
                      </button>

                      {/* Submit for review */}
                      {canSubmit(article) && (
                        <button
                          onClick={() => setSubmitTarget(article)}
                          disabled={submittingId === article.id}
                          className="px-3 py-1.5 text-[12px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                        >
                          {submittingId === article.id ? <Spinner size={3} /> : null}
                          Gửi duyệt
                        </button>
                      )}

                      {/* Delete */}
                      {canDelete(article) && (
                        <button
                          onClick={() => setDeleteTarget(article)}
                          className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                          title="Xóa bài viết"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {modal && (
        <ArticleDrawer
          item={modal === "create" ? null : modal}
          token={token}
          onSave={() => { setModal(null); load(); }}
          onClose={() => setModal(null)}
        />
      )}

      {submitTarget && (
        <ConfirmDialog
          title="Gửi bài để duyệt"
          description={`"${submitTarget.title}" sẽ được gửi cho admin xét duyệt. Bạn sẽ không thể chỉnh sửa bài trong lúc chờ duyệt.`}
          confirmLabel="Gửi duyệt"
          danger={false}
          loading={actionLoading}
          onConfirm={handleSubmitArticle}
          onCancel={() => setSubmitTarget(null)}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Xóa bài viết"
          description={`"${deleteTarget.title}" sẽ bị xóa vĩnh viễn.`}
          confirmLabel="Xóa"
          danger
          loading={actionLoading}
          onConfirm={handleDeleteArticle}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default WriterDashboard;
