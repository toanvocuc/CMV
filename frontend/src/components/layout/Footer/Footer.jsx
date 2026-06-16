const QUICK_LINKS = [
  { label: "Trang chủ",            href: "/" },
  { label: "Giới thiệu",           href: "/gioi-thieu" },
  { label: "Tin tức & Sự kiện",    href: "/tin-tuc" },
  { label: "Lĩnh vực hoạt động",   href: "/linh-vuc-hoat-dong" },
  { label: "Đơn vị thành viên",    href: "/don-vi-thanh-vien" },
  { label: "Quan hệ cổ đông",      href: "/quan-he-co-dong" },
  { label: "Tuyển dụng",           href: "/tuyen-dung" },
  { label: "Liên hệ",              href: "/lien-he" },
];

const CONTACTS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    text: "226 Lê Duẩn, Đống Đa, Hà Nội, Việt Nam",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    text: "(024) 3825 5017",
    href: "tel:02438255017",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    text: "vinacomin@vinacomin.vn",
    href: "mailto:vinacomin@vinacomin.vn",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
      </svg>
    ),
    text: "www.vinacomin.vn",
    href: "https://vinacomin.vn",
  },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    bg: "hover:bg-[#1877f2]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.9v-2.89h2.538V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    bg: "hover:bg-[#ff0000]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    bg: "hover:bg-[#0a66c2]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Zalo",
    href: "https://zalo.me",
    bg: "hover:bg-[#0068ff]",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.016 16.585c-.139.32-.48.537-.843.537H7.827a.91.91 0 01-.91-.91V14.94l3.182-3.636-3.182-1.273V8.758c0-.503.408-.91.91-.91h8.346c.503 0 .91.407.91.91v1.272l-3.182 1.274 3.182 3.636v1.273a.91.91 0 01-.067.372z" />
      </svg>
    ),
  },
];

const Footer = () => (
  <footer className="bg-[#0f172a]">
    {/* Top red accent */}
    <div className="h-[3px] bg-gradient-to-r from-[#c00000] via-red-500 to-[#c00000]" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Main grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14 lg:py-16">

        {/* Col 1 — Brand */}
        <div className="flex flex-col gap-5 lg:col-span-1">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-[#c00000] flex items-center justify-center shadow-lg shadow-red-900/40 group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-black text-xl">V</span>
            </div>
            <div className="leading-tight">
              <p className="text-white font-bold text-[14px] tracking-wide uppercase">Vinacomin</p>
              <p className="text-slate-500 text-[10px] tracking-wide mt-px">Est. 1945</p>
            </div>
          </a>

          <p className="text-slate-400 text-[13px] leading-relaxed">
            Tập đoàn Công nghiệp Than – Khoáng sản Việt Nam — trụ cột ngành
            năng lượng quốc gia với hơn 85 năm xây dựng và phát triển.
          </p>

          {/* Cert badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {["ISO 9001", "ISO 14001", "OHSAS 18001"].map((cert) => (
              <span key={cert} className="text-[10px] font-bold text-slate-500 border border-slate-700 rounded px-2 py-0.5 tracking-wide">
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Col 2 — Quick links */}
        <div>
          <h4 className="text-white text-[12px] font-bold tracking-[0.15em] uppercase mb-5 flex items-center gap-2">
            <span className="w-4 h-[2px] bg-[#c00000]" />
            Liên kết nhanh
          </h4>
          <ul className="space-y-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group flex items-center gap-2 text-slate-400 hover:text-white text-[13px] transition-colors duration-200"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-[#c00000] transition-colors duration-200 shrink-0" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Contact */}
        <div>
          <h4 className="text-white text-[12px] font-bold tracking-[0.15em] uppercase mb-5 flex items-center gap-2">
            <span className="w-4 h-[2px] bg-[#c00000]" />
            Liên hệ
          </h4>
          <ul className="space-y-4">
            {CONTACTS.map((item, i) => (
              <li key={i}>
                {item.href ? (
                  <a
                    href={item.href}
                    className="flex items-start gap-3 text-slate-400 hover:text-white text-[13px] leading-relaxed transition-colors duration-200 group"
                  >
                    <span className="text-[#c00000] group-hover:text-red-400 transition-colors duration-200 mt-px">
                      {item.icon}
                    </span>
                    {item.text}
                  </a>
                ) : (
                  <div className="flex items-start gap-3 text-slate-400 text-[13px] leading-relaxed">
                    <span className="text-[#c00000] mt-px">{item.icon}</span>
                    {item.text}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Social */}
        <div>
          <h4 className="text-white text-[12px] font-bold tracking-[0.15em] uppercase mb-5 flex items-center gap-2">
            <span className="w-4 h-[2px] bg-[#c00000]" />
            Mạng xã hội
          </h4>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-transparent transition-all duration-300 ${s.bg}`}
              >
                {s.icon}
                <span className="text-[12px] font-medium">{s.label}</span>
              </a>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-slate-400 text-[12px] mb-3">Đăng ký nhận tin tức mới nhất</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[12px] text-white placeholder-slate-600 focus:outline-none focus:border-[#c00000] transition-colors duration-200"
              />
              <button className="shrink-0 bg-[#c00000] hover:bg-red-700 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition-colors duration-200">
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/5" />

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-[12px] text-slate-600">
        <p>© 2026 Tập đoàn Công nghiệp Than – Khoáng sản Việt Nam. Bảo lưu mọi quyền.</p>
        <div className="flex items-center gap-4">
          {["Chính sách bảo mật", "Điều khoản sử dụng", "Sitemap"].map((item, i) => (
            <a key={i} href="#" className="hover:text-slate-400 transition-colors duration-200">
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
