import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PageHero from "../../components/ui/PageHero/PageHero";
import { fetchNewsBySlug, fetchNews } from "../../api/news";

const NewsDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchNewsBySlug(slug).then((result) => {
      if (cancelled) return;
      if (!result) { navigate("/not-found", { replace: true }); return; }
      setArticle(result.data);
      setLoading(false);
    });

    fetchNews({ limit: 3 }).then((result) => {
      if (!cancelled) setRelated(result.data.filter((n) => n.slug !== slug).slice(0, 3));
    });

    return () => { cancelled = true; };
  }, [slug, navigate]);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#c00000] border-t-transparent rounded-full animate-spin" />
        <p className="text-[13px] text-gray-400">Đang tải bài viết...</p>
      </div>
    </div>
  );

  if (!article) return null;

  return (
    <>
      <PageHero
        title={article.title}
        breadcrumb={[
          { label: "Tin tức", href: "/tin-tuc" },
          { label: "Chi tiết bài viết" },
        ]}
      />

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">

            {/* Main content */}
            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full aspect-[16/7] object-cover"
              />
              <div className="p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-[12px] text-gray-400">{article.date}</span>
                  <span className="text-[12px] text-gray-400">· 5 phút đọc</span>
                </div>

                <div className="text-[15px] leading-relaxed text-gray-700 space-y-5 whitespace-pre-line">
                  {article.content}
                </div>

                {/* Tags */}
                <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
                  {[article.category, "Vinacomin", "2026"].map((tag) => (
                    <span key={tag} className="text-[11px] font-medium text-gray-500 border border-gray-200 rounded-full px-3 py-1 hover:border-[#c00000] hover:text-[#c00000] cursor-pointer transition-colors duration-200">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Share */}
                <div className="mt-6 flex items-center gap-4">
                  <span className="text-[13px] text-gray-500 font-medium">Chia sẻ:</span>
                  {["Facebook", "LinkedIn", "Twitter"].map((s) => (
                    <button key={s} className="text-[12px] font-semibold text-gray-500 hover:text-[#c00000] transition-colors duration-200">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="flex flex-col gap-6">
              {related.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="text-[14px] font-bold text-gray-900 mb-5 flex items-center gap-2">
                    <span className="w-4 h-[2px] bg-[#c00000]" />
                    Tin tức liên quan
                  </h3>
                  <div className="flex flex-col gap-5">
                    {related.map((item) => (
                      <Link key={item.slug} to={`/tin-tuc/${item.slug}`} className="group flex gap-3">
                        <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-gray-800 group-hover:text-[#c00000] leading-snug line-clamp-2 transition-colors duration-200">{item.title}</p>
                          <p className="text-[11px] text-gray-400 mt-1">{item.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-[#0f172a] rounded-2xl p-6">
                <p className="text-white font-bold text-[15px] mb-2">Đăng ký nhận tin</p>
                <p className="text-white/50 text-[12px] mb-4 leading-relaxed">Nhận bản tin hàng tuần về hoạt động của Tập đoàn.</p>
                <input type="email" placeholder="Email của bạn" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-white placeholder-slate-600 focus:outline-none focus:border-[#c00000] transition-colors mb-3" />
                <button className="w-full bg-[#c00000] hover:bg-red-700 text-white text-[13px] font-bold py-2.5 rounded-lg transition-colors duration-200">
                  Đăng ký
                </button>
              </div>
            </aside>
          </div>

          <div className="mt-8">
            <Link to="/tin-tuc" className="inline-flex items-center gap-2 text-[13px] font-semibold text-gray-500 hover:text-[#c00000] transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Quay lại danh sách tin tức
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsDetailPage;
