const NEWS = [
  {
    id: 1,
    category: "Sản xuất",
    title: "Vinacomin vượt kế hoạch sản lượng than quý I năm 2026, đạt 12,5 triệu tấn",
    excerpt:
      "Tập đoàn Công nghiệp Than – Khoáng sản Việt Nam công bố kết quả sản xuất quý I/2026 với sản lượng than đạt 12,5 triệu tấn, vượt 8% so với kế hoạch đề ra.",
    date: "15/06/2026",
    image: "https://picsum.photos/seed/news-featured/800/500",
    featured: true,
  },
  {
    id: 2,
    category: "Đầu tư",
    title: "Vinacomin khởi công dự án khai thác mỏ than Khe Chàm IV với tổng vốn 4.200 tỷ đồng",
    date: "12/06/2026",
    image: "https://picsum.photos/seed/news-2/400/260",
  },
  {
    id: 3,
    category: "Bền vững",
    title: "Tập đoàn triển khai chương trình trồng rừng phủ xanh 1.500 ha vùng khai thác",
    date: "10/06/2026",
    image: "https://picsum.photos/seed/news-3/400/260",
  },
  {
    id: 4,
    category: "Nhân sự",
    title: "Vinacomin tổ chức hội nghị biểu dương 500 chiến sĩ thi đua toàn quốc năm 2026",
    date: "08/06/2026",
    image: "https://picsum.photos/seed/news-4/400/260",
  },
  {
    id: 5,
    category: "Hợp tác",
    title: "Ký kết hợp tác chiến lược với tập đoàn năng lượng Hàn Quốc POSCO Energy",
    date: "05/06/2026",
    image: "https://picsum.photos/seed/news-5/400/260",
  },
];

const CATEGORY_COLORS = {
  "Sản xuất": "bg-blue-50 text-blue-700",
  "Đầu tư":   "bg-amber-50 text-amber-700",
  "Bền vững": "bg-emerald-50 text-emerald-700",
  "Nhân sự":  "bg-violet-50 text-violet-700",
  "Hợp tác":  "bg-sky-50 text-sky-700",
};

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const Badge = ({ category }) => (
  <span className={`inline-block text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full ${CATEGORY_COLORS[category] ?? "bg-gray-100 text-gray-600"}`}>
    {category}
  </span>
);

/* ── Featured card (left) ── */
const FeaturedCard = ({ article }) => (
  <a href={`/tin-tuc/${article.id}`} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/70 hover:-translate-y-1 transition-all duration-300">
    {/* Image */}
    <div className="relative overflow-hidden aspect-[16/10] shrink-0">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      {/* Badge on image */}
      <div className="absolute top-4 left-4">
        <Badge category={article.category} />
      </div>

      {/* Featured label */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#c00000] text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
        Nổi bật
      </div>
    </div>

    {/* Body */}
    <div className="flex flex-col flex-1 p-6 gap-3">
      <div className="flex items-center gap-1.5 text-[12px] text-gray-400">
        <CalendarIcon />
        <span>{article.date}</span>
      </div>

      <h3 className="text-[18px] font-bold text-gray-900 leading-snug group-hover:text-[#c00000] transition-colors duration-200 line-clamp-2">
        {article.title}
      </h3>

      <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-3 flex-1">
        {article.excerpt}
      </p>

      <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#c00000] mt-auto pt-2 border-t border-gray-100">
        Đọc tiếp
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  </a>
);

/* ── Small card (right list) ── */
const SmallCard = ({ article }) => (
  <a
    href={`/tin-tuc/${article.id}`}
    className="group flex gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:shadow-gray-200/60 hover:-translate-y-0.5 transition-all duration-300"
  >
    {/* Thumbnail */}
    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    </div>

    {/* Content */}
    <div className="flex flex-col justify-between gap-1.5 min-w-0">
      <Badge category={article.category} />

      <h4 className="text-[13px] font-semibold text-gray-800 leading-snug group-hover:text-[#c00000] transition-colors duration-200 line-clamp-2">
        {article.title}
      </h4>

      <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
        <CalendarIcon />
        <span>{article.date}</span>
      </div>
    </div>
  </a>
);

/* ── Main section ── */
const NewsSection = () => {
  const featured = NEWS[0];
  const rest = NEWS.slice(1);

  return (
    <section className="bg-gray-50 py-16 lg:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[#c00000]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#c00000] uppercase">
                Tin tức
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
              Tin tức <span className="text-[#c00000]">nổi bật</span>
            </h2>
          </div>
          <a
            href="/tin-tuc"
            className="group inline-flex items-center gap-2 text-[13px] font-semibold text-gray-500 hover:text-[#c00000] transition-colors duration-200 shrink-0"
          >
            Xem tất cả tin tức
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-5 lg:gap-6">
          {/* Featured */}
          <FeaturedCard article={featured} />

          {/* Small articles */}
          <div className="flex flex-col gap-3">
            {rest.map((article) => (
              <SmallCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
