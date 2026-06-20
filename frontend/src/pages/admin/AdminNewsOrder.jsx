import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchAdminNews, reorderNews } from "../../api/admin";

const AdminNewsOrder = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const [dirty, setDirty]       = useState(false);

  const dragIndex = useRef(null);
  const [dragOver, setDragOver] = useState(null);

  const handleUnauth = useCallback(
    (err) => { if (err.message === "UNAUTHORIZED") { logout(); navigate("/login"); } },
    [logout, navigate]
  );

  useEffect(() => {
    setLoading(true);
    // Fetch all published articles, sort server-side by sortOrder desc then createdAt desc
    fetchAdminNews(token, { status: "published", limit: 100 })
      .then((r) => setArticles(r.data))
      .catch(handleUnauth)
      .finally(() => setLoading(false));
  }, [token, handleUnauth]);

  // ─── Drag handlers ──────────────────────────────────────────────────────────

  const handleDragStart = (e, index) => {
    dragIndex.current = index;
    e.dataTransfer.effectAllowed = "move";
    // Transparent ghost (native ghost is fine)
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragIndex.current !== index) setDragOver(index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (dragIndex.current === null || dragIndex.current === index) return;
    const next = [...articles];
    const [moved] = next.splice(dragIndex.current, 1);
    next.splice(index, 0, moved);
    dragIndex.current = null;
    setDragOver(null);
    setArticles(next);
    setDirty(true);
  };

  const handleDragEnd = () => {
    dragIndex.current = null;
    setDragOver(null);
  };

  // ─── Move buttons (alternative to drag) ─────────────────────────────────────

  const move = (from, to) => {
    if (to < 0 || to >= articles.length) return;
    const next = [...articles];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setArticles(next);
    setDirty(true);
  };

  // ─── Save ────────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    setSaving(true);
    try {
      // sortOrder: highest number = first position
      const total = articles.length;
      const orders = articles.map((a, i) => ({ id: a.id, sortOrder: total - i }));
      await reorderNews(token, orders);
      setDirty(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      handleUnauth(err);
    } finally {
      setSaving(false);
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-black text-gray-900">Sắp xếp bài viết</h1>
          <p className="text-[14px] text-gray-500 mt-1">
            Kéo thả để sắp xếp thứ tự hiển thị trên trang web. Bài ở trên cùng sẽ xuất hiện đầu tiên.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={!dirty || saving}
          className={`shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
            saved
              ? "bg-green-500 text-white"
              : dirty
              ? "bg-gray-900 hover:bg-gray-700 text-white shadow-sm"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {saving ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Đang lưu...
            </>
          ) : saved ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Đã lưu
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
              Lưu thứ tự
            </>
          )}
        </button>
      </div>

      {/* Hint */}
      <div className="mb-5 bg-blue-50 border border-blue-100 rounded-2xl px-5 py-3.5 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
        </svg>
        <p className="text-[13px] text-blue-700">
          Kéo thả từng bài hoặc dùng nút <strong>↑ ↓</strong> để di chuyển. Nhấn <strong>Lưu thứ tự</strong> để áp dụng.
        </p>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="divide-y divide-gray-50">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <div className="w-5 h-8 bg-gray-100 rounded animate-pulse" />
                <div className="w-14 h-11 bg-gray-100 rounded-xl animate-pulse shrink-0" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-100 rounded w-3/4 mb-2 animate-pulse" />
                  <div className="h-3 bg-gray-50 rounded w-1/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[14px] font-semibold text-gray-400">Chưa có bài viết đã đăng</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {articles.map((article, index) => (
              <div
                key={article.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-4 px-5 py-4 transition-all cursor-grab active:cursor-grabbing select-none ${
                  dragOver === index
                    ? "bg-blue-50 border-t-2 border-blue-400"
                    : "hover:bg-gray-50/60"
                }`}
              >
                {/* Drag handle */}
                <div className="text-gray-300 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="9"  cy="5"  r="1.5" />
                    <circle cx="15" cy="5"  r="1.5" />
                    <circle cx="9"  cy="12" r="1.5" />
                    <circle cx="15" cy="12" r="1.5" />
                    <circle cx="9"  cy="19" r="1.5" />
                    <circle cx="15" cy="19" r="1.5" />
                  </svg>
                </div>

                {/* Position badge */}
                <span className="w-7 h-7 rounded-lg bg-gray-100 text-gray-500 text-[11px] font-black flex items-center justify-center shrink-0">
                  {index + 1}
                </span>

                {/* Thumbnail */}
                <div className="w-14 h-11 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  {article.image && (
                    <img src={article.image} alt="" className="w-full h-full object-cover" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-[13px] line-clamp-1">{article.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{article.category} · {article.date}</p>
                </div>

                {/* Up / Down buttons */}
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button
                    onClick={() => move(index, index - 1)}
                    disabled={index === 0}
                    className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                    title="Lên trên"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                  </button>
                  <button
                    onClick={() => move(index, index + 1)}
                    disabled={index === articles.length - 1}
                    className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                    title="Xuống dưới"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {dirty && (
        <p className="text-[12px] text-amber-600 mt-3 font-medium">
          Thứ tự đã thay đổi. Nhấn "Lưu thứ tự" để áp dụng.
        </p>
      )}
    </div>
  );
};

export default AdminNewsOrder;
