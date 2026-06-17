import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHero from "../../components/ui/PageHero/PageHero";
import { fetchJobs } from "../../api/jobs";

const DEPT_COLORS = {
  "Kỹ thuật":   "bg-blue-50 text-blue-700",
  "Tài chính":  "bg-amber-50 text-amber-700",
  "Môi trường": "bg-emerald-50 text-emerald-700",
  "Công nghệ":  "bg-violet-50 text-violet-700",
  "Kinh doanh": "bg-sky-50 text-sky-700",
  "An toàn":    "bg-orange-50 text-orange-700",
};

const CareersPage = () => {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const timer = setTimeout(() => {
      fetchJobs({ search })
        .then((r) => { if (!cancelled) { setJobs(r.data); setError(null); } })
        .catch((e) => { if (!cancelled) setError(e.message); })
        .finally(() => { if (!cancelled) setLoading(false); });
    }, 300);

    return () => { cancelled = true; clearTimeout(timer); };
  }, [search]);

  return (
    <>
      <PageHero
        title="Cơ hội nghề nghiệp"
        subtitle="Tham gia đội ngũ hơn 100.000 cán bộ công nhân viên tại Vinacomin — nơi bạn có thể phát triển sự nghiệp và đóng góp cho ngành năng lượng Việt Nam."
        breadcrumb={[{ label: "Tuyển dụng" }]}
        image="https://picsum.photos/seed/careers-hero/1200/400"
      />

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Search */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
            <div className="relative max-w-lg">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm vị trí, phòng ban..."
                className="w-full pl-11 pr-4 py-3 text-[14px] border border-gray-200 rounded-xl focus:outline-none focus:border-[#c00000] focus:ring-1 focus:ring-[#c00000]/20 transition-all"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-600 text-[14px] mb-6">
              Không thể tải dữ liệu. Vui lòng kiểm tra kết nối và thử lại.
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                  <div className="flex justify-between items-center">
                    <div className="space-y-2 flex-1">
                      <div className="h-3 bg-gray-200 rounded w-24" />
                      <div className="h-5 bg-gray-200 rounded w-72" />
                      <div className="h-3 bg-gray-200 rounded w-48" />
                    </div>
                    <div className="h-9 w-24 bg-gray-200 rounded-full shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Jobs list */}
          {!loading && !error && (
            <div className="flex flex-col gap-4">
              {jobs.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center text-gray-400 border border-gray-100">
                  <p className="text-[15px]">Không tìm thấy vị trí phù hợp.</p>
                </div>
              ) : jobs.map((job) => (
                <div key={job.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full ${DEPT_COLORS[job.department] ?? "bg-gray-100 text-gray-600"}`}>
                        {job.department}
                      </span>
                      <span className="text-[11px] text-gray-400 border border-gray-200 rounded-full px-2.5 py-0.5">{job.level}</span>
                    </div>
                    <h3 className="text-[16px] font-bold text-gray-900 group-hover:text-[#c00000] transition-colors duration-200">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-[12px] text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        {job.type}
                      </span>
                      <span className="text-[#c00000] font-semibold">Hạn: {job.deadline}</span>
                    </div>
                  </div>
                  <Link
                    to={`/tuyen-dung/${job.id}`}
                    className="shrink-0 inline-flex items-center gap-2 bg-[#c00000] hover:bg-red-700 text-white text-[13px] font-bold px-5 py-2.5 rounded-full shadow-md shadow-red-900/20 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Ứng tuyển
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-12 bg-[#0f172a] rounded-2xl p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-[18px] font-black mb-1">Không tìm thấy vị trí phù hợp?</h3>
              <p className="text-white/50 text-[14px]">Gửi CV của bạn để chúng tôi liên hệ khi có vị trí phù hợp.</p>
            </div>
            <Link to="/lien-he" className="shrink-0 inline-flex items-center gap-2 bg-[#c00000] hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5">
              Gửi CV ứng tuyển
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareersPage;
