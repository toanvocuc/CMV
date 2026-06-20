import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchAdminNews, deleteNews, moderateNews, reorderNews } from "../../api/admin";
import { CategoryBadge, StatusBadge } from "../../components/admin/ui/Badge";
import ConfirmDialog from "../../components/admin/ui/ConfirmDialog";
import DropdownMenu from "../../components/admin/ui/DropdownMenu";

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_TABS = [
  { key: "", label: "Tất cả" },
  { key: "pending", label: "Chờ duyệt" },
  { key: "published", label: "Đã đăng" },
  { key: "rejected", label: "Từ chối" },
];

const CONFIRM_CONFIG = {
  delete:  { title: "Xóa bài viết",     description: "Bài viết sẽ bị xóa vĩnh viễn và không thể phục hồi.",        confirmLabel: "Xóa vĩnh viễn", danger: true  },
  approve: { title: "Phê duyệt & Đăng", description: "Bài viết sẽ được đăng công khai lên trang web ngay lập tức.", confirmLabel: "Phê duyệt",      danger: false },
  reject:  { title: "Từ chối bài viết", description: "Bài viết sẽ bị từ chối và trả lại cho người viết.",           confirmLabel: "Từ chối",        danger: true  },
};

const PAGE_SIZE = 15;

// ─── Icons ────────────────────────────────────────────────────────────────────

const Icon = ({ d }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const Spinner = ({ size = "3.5" }) => (
  <svg className={`w-${size} h-${size} animate-spin shrink-0`} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

// ─── Article detail viewer (read-only drawer) ─────────────────────────────────

const ArticleViewer = ({ item, onClose }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-end z-50" onClick={onClose}>
    <div className="bg-white h-full w-full max-w-xl shadow-2xl overflow-y-auto flex flex-col" onClick={(e) => e.stopPropagation()}>
      <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
        <div>
          <h2 className="text-[15px] font-black text-gray-900">Chi tiết bài viết</h2>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {item.authorName ? `Tác giả: ${item.authorName}` : "Chưa có tác giả"}
            {item.approvedBy ? ` · Duyệt bởi: ${item.approvedBy}` : ""}
          </p>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-6 space-y-5">
        {item.image && <img src={item.image} alt="" className="w-full h-52 object-cover rounded-2xl" />}
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge status={item.status} />
          <CategoryBadge category={item.category} />
          {item.date && <span className="text-[12px] text-gray-400">{item.date}</span>}
        </div>
        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tiêu đề</p>
          <p className="text-[16px] font-black text-gray-900">{item.title}</p>
          <p className="font-mono text-[11px] text-gray-400 mt-1">{item.slug}</p>
        </div>
        {item.excerpt && (
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tóm tắt</p>
            <p className="text-[13px] text-gray-600 leading-relaxed">{item.excerpt}</p>
          </div>
        )}
        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Nội dung</p>
          <div className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap border border-gray-100 rounded-xl p-4 bg-gray-50/50">
            {item.content}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Reorder view (drag-and-drop, shown inside AdminNews when tab = published) ─

const ReorderView = ({ token, onExit, handleUnauth }) => {
  const [list, setList]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [dirty, setDirty]     = useState(false);
  const [dragOver, setDragOver] = useState(null);
  const dragIndex = useRef(null);

  useEffect(() => {
    fetchAdminNews(token, { status: "published", limit: 100 })
      .then((r) => setList(r.data))
      .catch(handleUnauth)
      .finally(() => setLoading(false));
  }, [token, handleUnauth]);

  const handleDragStart = (e, i) => {
    dragIndex.current = i;
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragOver = (e, i) => {
    e.preventDefault();
    if (dragIndex.current !== i) setDragOver(i);
  };
  const handleDrop = (e, i) => {
    e.preventDefault();
    if (dragIndex.current === null || dragIndex.current === i) { setDragOver(null); return; }
    const next = [...list];
    const [moved] = next.splice(dragIndex.current, 1);
    next.splice(i, 0, moved);
    dragIndex.current = null;
    setDragOver(null);
    setList(next);
    setDirty(true);
  };
  const handleDragEnd = () => { dragIndex.current = null; setDragOver(null); };

  const move = (from, to) => {
    if (to < 0 || to >= list.length) return;
    const next = [...list];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setList(next);
    setDirty(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const total = list.length;
      const orders = list.map((a, i) => ({ id: a.id, sortOrder: total - i }));
      await reorderNews(token, orders);
      setDirty(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) { handleUnauth(err); }
    finally { setSaving(false); }
  };

  return (
    <div>
      {/* Reorder toolbar */}
      <div className="flex items-center justify-between mb-5 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
          <p className="text-[13px] text-amber-800 font-semibold">
            Chế độ sắp xếp — Kéo thả hoặc dùng nút ↑↓ để thay đổi vị trí
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={!dirty || saving}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold transition-all ${
              saved
                ? "bg-green-500 text-white"
                : dirty
                ? "bg-gray-900 hover:bg-gray-700 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {saving ? <Spinner /> : saved ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : null}
            {saving ? "Đang lưu..." : saved ? "Đã lưu" : "Lưu thứ tự"}
          </button>
          <button
            onClick={onExit}
            className="px-4 py-2 rounded-xl text-[13px] font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Xong
          </button>
        </div>
      </div>

      {/* Drag list */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="divide-y divide-gray-50">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <div className="w-5 h-8 bg-gray-100 rounded animate-pulse" />
                <div className="w-7 h-7 bg-gray-100 rounded-lg animate-pulse" />
                <div className="w-14 h-11 bg-gray-100 rounded-xl animate-pulse shrink-0" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-100 rounded w-3/4 mb-2 animate-pulse" />
                  <div className="h-3 bg-gray-50 rounded w-1/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : list.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[14px] text-gray-400 font-semibold">Chưa có bài viết đã đăng</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {list.map((article, index) => (
              <div
                key={article.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-4 px-5 py-3.5 transition-all cursor-grab active:cursor-grabbing select-none ${
                  dragOver === index
                    ? "bg-blue-50 border-l-4 border-blue-400"
                    : "hover:bg-gray-50/60"
                }`}
              >
                {/* Drag handle */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-300 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="9"  cy="5"  r="1.5" /><circle cx="15" cy="5"  r="1.5" />
                  <circle cx="9"  cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
                  <circle cx="9"  cy="19" r="1.5" /><circle cx="15" cy="19" r="1.5" />
                </svg>

                {/* Position */}
                <span className="w-7 h-7 rounded-lg bg-gray-100 text-gray-500 text-[11px] font-black flex items-center justify-center shrink-0">
                  {index + 1}
                </span>

                {/* Thumbnail */}
                <div className="w-14 h-10 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  {article.image && <img src={article.image} alt="" className="w-full h-full object-cover" />}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-[13px] line-clamp-1">{article.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{article.category} · {article.date}</p>
                </div>

                {/* Up / Down */}
                <div className="flex gap-0.5 shrink-0">
                  <button onClick={() => move(index, index - 1)} disabled={index === 0}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                  </button>
                  <button onClick={() => move(index, index + 1)} disabled={index === list.length - 1}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
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
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────

const AdminNews = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [statusFilter, setStatusFilter] = useState(
    () => new URLSearchParams(location.search).get("status") || ""
  );
  const [searchInput, setSearchInput]   = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [page, setPage]                 = useState(1);
  const [reorderMode, setReorderMode]   = useState(false);

  const [news, setNews]       = useState([]);
  const [total, setTotal]     = useState(0);
  const [pages, setPages]     = useState(1);
  const [loading, setLoading] = useState(true);

  const [viewer, setViewer]               = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [moderatingId, setModeratingId]   = useState(null);

  const handleUnauth = useCallback(
    (err) => { if (err.message === "UNAUTHORIZED") { logout(); navigate("/login"); } },
    [logout, navigate]
  );

  const load = useCallback(() => {
    setLoading(true);
    fetchAdminNews(token, { status: statusFilter, search: activeSearch, page, limit: PAGE_SIZE })
      .then((r) => { setNews(r.data); setTotal(r.total); setPages(r.pages); })
      .catch(handleUnauth)
      .finally(() => setLoading(false));
  }, [token, statusFilter, activeSearch, page, handleUnauth]);

  useEffect(() => { load(); }, [load]);

  const changeFilter = (key) => {
    setStatusFilter(key);
    setPage(1);
    setReorderMode(false); // exit reorder when switching tabs
  };
  const triggerSearch = () => { setActiveSearch(searchInput); setPage(1); };
  const clearSearch = () => { setSearchInput(""); setActiveSearch(""); setPage(1); };

  const executeModerate = async (id, action) => {
    setModeratingId(id);
    try { await moderateNews(token, id, action); load(); }
    catch (err) { handleUnauth(err); }
    finally { setModeratingId(null); }
  };

  const handleConfirm = async () => {
    if (!pendingAction) return;
    setActionLoading(true);
    try {
      if (pendingAction.type === "delete") await deleteNews(token, pendingAction.id);
      else await moderateNews(token, pendingAction.id, pendingAction.type);
      setPendingAction(null);
      load();
    } catch (err) { handleUnauth(err); }
    finally { setActionLoading(false); }
  };

  const getMenuItems = (item) => {
    const busy = moderatingId === item.id;
    const ico = (d) => <Icon d={d} />;
    const items = [];

    items.push({
      label: "Xem chi tiết",
      icon: ico("M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z"),
      onClick: () => setViewer(item),
    });

    if (item.status === "pending") {
      items.push("---");
      items.push({
        label: "Phê duyệt & Đăng",
        icon: ico("M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"),
        onClick: () => setPendingAction({ type: "approve", id: item.id }),
        disabled: busy,
      });
      items.push({
        label: "Từ chối",
        icon: ico("M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"),
        onClick: () => setPendingAction({ type: "reject", id: item.id }),
        danger: true,
        disabled: busy,
      });
    }

    if (item.status === "published") {
      items.push("---");
      items.push({
        label: "Thu hồi về nháp",
        icon: ico("M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"),
        onClick: () => executeModerate(item.id, "retract"),
        disabled: busy,
      });
    }

    if (item.status === "rejected") {
      items.push("---");
      items.push({
        label: "Đặt lại nháp",
        icon: ico("M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"),
        onClick: () => executeModerate(item.id, "redraft"),
        disabled: busy,
      });
    }

    items.push("---");
    items.push({
      label: "Xóa bài viết",
      icon: ico("M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"),
      onClick: () => setPendingAction({ type: "delete", id: item.id }),
      danger: true,
    });

    return items;
  };

  const hasFilter = statusFilter || activeSearch;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-black text-gray-900">Tin tức</h1>
          <p className="text-[14px] text-gray-500 mt-1">Xét duyệt và quản lý bài viết từ người biên tập</p>
        </div>

        {/* Sắp xếp button — only visible on "Đã đăng" tab */}
        {statusFilter === "published" && !reorderMode && (
          <button
            onClick={() => setReorderMode(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
            Sắp xếp bài
          </button>
        )}
      </div>

      {/* Status filter tabs */}
      <div className="flex items-center gap-0.5 mb-5 border-b border-gray-100">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => changeFilter(tab.key)}
            className={`relative px-4 py-2.5 text-[13px] font-semibold transition-colors -mb-px ${
              statusFilter === tab.key
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Reorder mode ── */}
      {reorderMode && statusFilter === "published" ? (
        <ReorderView
          token={token}
          handleUnauth={handleUnauth}
          onExit={() => { setReorderMode(false); load(); }}
        />
      ) : (
        <>
          {/* Search bar */}
          <div className="flex gap-2 mb-5">
            <div className="relative flex-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && triggerSearch()}
                placeholder="Tìm kiếm theo tiêu đề hoặc danh mục..."
                className="w-full pl-10 pr-4 py-2.5 text-[13px] border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
              />
            </div>
            <button onClick={triggerSearch}
              className="px-4 py-2.5 text-[13px] font-semibold bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-colors">
              Tìm
            </button>
            {activeSearch && (
              <button onClick={clearSearch}
                className="px-3 py-2.5 text-[13px] font-medium text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                Xóa
              </button>
            )}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-14">Hình</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tiêu đề</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Tác giả</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Danh mục</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-5 py-3.5 w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i}>
                      <td className="px-5 py-4"><div className="w-12 h-10 bg-gray-100 rounded-xl animate-pulse" /></td>
                      <td className="px-5 py-4">
                        <div className="h-4 bg-gray-100 rounded-lg w-3/4 mb-2 animate-pulse" />
                        <div className="h-3 bg-gray-50 rounded-lg w-1/2 animate-pulse" />
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell"><div className="h-4 bg-gray-100 rounded-lg w-20 animate-pulse" /></td>
                      <td className="px-5 py-4 hidden md:table-cell"><div className="h-5 bg-gray-100 rounded-full w-16 animate-pulse" /></td>
                      <td className="px-5 py-4"><div className="h-5 bg-gray-100 rounded-full w-20 animate-pulse" /></td>
                      <td className="px-5 py-4"><div className="w-6 h-6 bg-gray-100 rounded-lg animate-pulse" /></td>
                    </tr>
                  ))
                ) : news.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <div className="text-center py-20">
                        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                        </div>
                        <p className="text-[14px] font-semibold text-gray-500">
                          {hasFilter ? "Không tìm thấy bài viết nào" : "Chưa có bài viết nào"}
                        </p>
                        <p className="text-[12px] text-gray-400 mt-1">
                          {hasFilter ? "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm." : "Bài viết sẽ xuất hiện khi người biên tập gửi duyệt."}
                        </p>
                        {hasFilter && (
                          <button onClick={() => { changeFilter(""); clearSearch(); }}
                            className="mt-4 text-[13px] font-semibold text-gray-500 hover:text-gray-700 underline">
                            Xóa bộ lọc
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  news.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/60 transition-colors group">
                      <td className="px-5 py-4">
                        <div className="w-12 h-10 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                          {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900 line-clamp-1 group-hover:text-[#c00000] transition-colors">{item.title}</p>
                        <p className="text-gray-400 text-[11px] mt-0.5 font-mono">{item.slug}</p>
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-[12px] hidden md:table-cell">
                        {item.authorName || <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <CategoryBadge category={item.category} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <StatusBadge status={item.status} />
                          {moderatingId === item.id && <Spinner />}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <DropdownMenu items={getMenuItems(item)} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && pages > 1 && (
            <div className="flex items-center justify-between mt-4 px-1">
              <p className="text-[12px] text-gray-400">{total} bài viết · Trang {page} / {pages}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage((p) => p - 1)} disabled={page <= 1}
                  className="px-3.5 py-2 text-[12px] font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  ← Trước
                </button>
                <button onClick={() => setPage((p) => p + 1)} disabled={page >= pages}
                  className="px-3.5 py-2 text-[12px] font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  Sau →
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Article viewer */}
      {viewer && <ArticleViewer item={viewer} onClose={() => setViewer(null)} />}

      {/* Confirm dialogs */}
      {pendingAction && (
        <ConfirmDialog
          {...CONFIRM_CONFIG[pendingAction.type]}
          loading={actionLoading}
          onConfirm={handleConfirm}
          onCancel={() => setPendingAction(null)}
        />
      )}
    </div>
  );
};

export default AdminNews;
