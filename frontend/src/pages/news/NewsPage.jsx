import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHero from "../../components/ui/PageHero/PageHero";
import { fetchNews } from "../../api/news";

const CATEGORIES = ["Tất cả", "Sản xuất", "Đầu tư", "Bền vững", "Nhân sự", "Hợp tác"];

const CATEGORY_COLORS = {
  "Sản xuất": "bg-blue-50 text-blue-700",
  "Đầu tư":   "bg-amber-50 text-amber-700",
  "Bền vững": "bg-emerald-50 text-emerald-700",
  "Nhân sự":  "bg-violet-50 text-violet-700",
  "Hợp tác":  "bg-sky-50 text-sky-700",
};

const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchNews({ category: activeCategory, page, limit: 6 })
      .then((result) => { if (!cancelled) { setData(result); setError(null); } })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [activeCategory, page]);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setPage(1);
  };

  const articles = data?.data ?? [];
  const pagination = data?.pagination;

  return (
    <>
      <PageHero
        title="Tin tức & Sự kiện"
        subtitle="Cập nhật thông tin mới nhất về hoạt động sản xuất kinh doanh, sự kiện và thông báo của Tập đoàn."
        breadcrumb={[{ label: "Tin tức" }]}
        image="https://picsum.photos/seed/news-hero/1200/400"
      />

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#c00000] text-white shadow-md shadow-red-200"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#c00000] hover:text-[#c00000]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-600 text-[14px] mb-6">
              Không thể tải dữ liệu. Vui lòng kiểm tra kết nối và thử lại.
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                  <div className="aspect-[16/9] bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-4/5" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* News grid */}
          {!loading && !error && (
            <>
              {articles.length === 0 ? (
                <div className="bg-white rounded-2xl p-16 text-center text-gray-400 border border-gray-100">
                  <p className="text-[15px]">Không có bài viết nào trong danh mục này.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <Link
                      key={article.id}
                      to={`/tin-tuc/${article.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/70 hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="overflow-hidden aspect-[16/9]">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full ${CATEGORY_COLORS[article.category] ?? "bg-gray-100 text-gray-600"}`}>
                            {article.category}
                          </span>
                          <span className="text-[11px] text-gray-400">{article.date}</span>
                        </div>
                        <h3 className="text-[15px] font-bold text-gray-900 leading-snug group-hover:text-[#c00000] transition-colors duration-200 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#c00000] mt-1">
                          Đọc tiếp
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                        p === page ? "bg-[#c00000] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[#c00000] hover:text-[#c00000]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default NewsPage;
