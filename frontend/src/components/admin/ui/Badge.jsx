const STATUS_CONFIG = {
  draft:     { label: "Nháp",      dot: "bg-gray-400",    pill: "bg-gray-100 text-gray-600 border-gray-200" },
  pending:   { label: "Chờ duyệt", dot: "bg-amber-400",   pill: "bg-amber-50 text-amber-700 border-amber-200" },
  published: { label: "Đã đăng",   dot: "bg-emerald-500", pill: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  rejected:  { label: "Từ chối",   dot: "bg-red-500",     pill: "bg-red-50 text-red-600 border-red-200" },
};

const CATEGORY_COLORS = {
  "Sản xuất": "bg-blue-50 text-blue-700",
  "Đầu tư":   "bg-amber-50 text-amber-700",
  "Bền vững": "bg-emerald-50 text-emerald-700",
  "Nhân sự":  "bg-violet-50 text-violet-700",
  "Hợp tác":  "bg-sky-50 text-sky-700",
};

const DEPT_COLORS = {
  "Kỹ thuật":  "bg-blue-50 text-blue-700",
  "Tài chính": "bg-amber-50 text-amber-700",
  "Môi trường":"bg-emerald-50 text-emerald-700",
  "Công nghệ": "bg-violet-50 text-violet-700",
  "Kinh doanh":"bg-sky-50 text-sky-700",
  "An toàn":   "bg-orange-50 text-orange-700",
};

export const StatusBadge = ({ status }) => {
  const c = STATUS_CONFIG[status] ?? STATUS_CONFIG.draft;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${c.pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
      {c.label}
    </span>
  );
};

export const CategoryBadge = ({ category }) => (
  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[category] ?? "bg-gray-100 text-gray-600"}`}>
    {category}
  </span>
);

export const DeptBadge = ({ dept }) => (
  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${DEPT_COLORS[dept] ?? "bg-gray-100 text-gray-600"}`}>
    {dept}
  </span>
);

export const JobActiveBadge = ({ isActive }) => (
  <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
    isActive
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-gray-100 text-gray-500 border-gray-200"
  }`}>
    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-gray-400"}`} />
    {isActive ? "Đang tuyển" : "Đóng"}
  </span>
);
