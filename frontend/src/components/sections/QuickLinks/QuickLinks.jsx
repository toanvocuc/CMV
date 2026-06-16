const LINKS = [
  {
    id: 1,
    title: "Energy",
    titleVi: "Năng lượng",
    description: "Cung cấp năng lượng bền vững cho nền kinh tế quốc gia thông qua khai thác và chế biến than.",
    href: "/linh-vuc/nang-luong",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    accent: "from-orange-500 to-red-600",
    bg: "bg-orange-50",
  },
  {
    id: 2,
    title: "Mining",
    titleVi: "Khai khoáng",
    description: "Khai thác khoáng sản đạt tiêu chuẩn quốc tế, đảm bảo an toàn lao động và bảo vệ môi trường.",
    href: "/linh-vuc/khai-khoang",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    accent: "from-stone-500 to-stone-700",
    bg: "bg-stone-50",
  },
  {
    id: 3,
    title: "Investor Relations",
    titleVi: "Quan hệ cổ đông",
    description: "Thông tin tài chính, báo cáo thường niên và cơ hội đầu tư dành cho cổ đông và nhà đầu tư.",
    href: "/quan-he-co-dong",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    accent: "from-blue-500 to-blue-700",
    bg: "bg-blue-50",
  },
  {
    id: 4,
    title: "News Center",
    titleVi: "Tin tức",
    description: "Cập nhật tin tức mới nhất về hoạt động sản xuất kinh doanh, sự kiện và thông báo của tập đoàn.",
    href: "/tin-tuc",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    ),
    accent: "from-violet-500 to-violet-700",
    bg: "bg-violet-50",
  },
  {
    id: 5,
    title: "Careers",
    titleVi: "Tuyển dụng",
    description: "Khám phá cơ hội nghề nghiệp tại tập đoàn hàng đầu ngành công nghiệp khai khoáng Việt Nam.",
    href: "/tuyen-dung",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
    accent: "from-emerald-500 to-emerald-700",
    bg: "bg-emerald-50",
  },
  {
    id: 6,
    title: "Sustainability",
    titleVi: "Phát triển bền vững",
    description: "Cam kết bảo vệ môi trường, phát triển cộng đồng và thực hiện trách nhiệm xã hội doanh nghiệp.",
    href: "/phat-trien-ben-vung",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.249 2.249 0 0017.5 15.08l-.303-.54a1.5 1.5 0 01.448-2.073l.612-.333a2.25 2.25 0 00.744-3.229l-.157-.216a2.25 2.25 0 00-1.927-.97H16.5" />
      </svg>
    ),
    accent: "from-teal-500 to-cyan-700",
    bg: "bg-teal-50",
  },
];

const QuickLinkCard = ({ item }) => (
  <a
    href={item.href}
    className="group relative flex flex-col bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/80 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
  >
    {/* Hover background sweep */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    {/* Red corner accent on hover */}
    <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[48px] border-r-[48px] border-t-transparent border-r-[#c00000]/10" />
    </div>

    {/* Content */}
    <div className="relative flex flex-col gap-4">
      {/* Icon */}
      <div className={`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center text-gray-500 group-hover:scale-110 group-hover:text-[#c00000] transition-all duration-300`}>
        {item.icon}
      </div>

      {/* Titles */}
      <div>
        <p className="text-[11px] font-bold tracking-[0.15em] text-[#c00000] uppercase mb-1">
          {item.title}
        </p>
        <h3 className="text-[17px] font-bold text-gray-900 leading-snug group-hover:text-[#c00000] transition-colors duration-300">
          {item.titleVi}
        </h3>
      </div>

      {/* Description */}
      <p className="text-[13px] text-gray-500 leading-relaxed">
        {item.description}
      </p>

      {/* CTA */}
      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-400 group-hover:text-[#c00000] transition-colors duration-300 mt-auto pt-2">
        <span>Xem thêm</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>

    {/* Bottom accent line */}
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c00000] to-red-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
  </a>
);

const QuickLinks = () => (
  <section className="bg-gray-50 py-16 lg:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-[#c00000]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#c00000] uppercase">
              Lĩnh vực
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
            Khám phá các lĩnh vực
            <br className="hidden sm:block" />
            <span className="text-[#c00000]"> hoạt động</span>
          </h2>
        </div>
        <a
          href="/linh-vuc-hoat-dong"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#c00000] transition-colors duration-200 shrink-0"
        >
          Xem tất cả
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {LINKS.map((item) => (
          <QuickLinkCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  </section>
);

export default QuickLinks;
