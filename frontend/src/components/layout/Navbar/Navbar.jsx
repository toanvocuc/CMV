import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Giới thiệu",
    href: "/gioi-thieu",
    children: [
      { label: "Lịch sử hình thành", href: "/gioi-thieu/lich-su" },
      { label: "Tầm nhìn & Sứ mệnh", href: "/gioi-thieu/tam-nhin" },
      { label: "Cơ cấu tổ chức", href: "/gioi-thieu/co-cau" },
      { label: "Ban lãnh đạo", href: "/gioi-thieu/lanh-dao" },
    ],
  },
  { label: "Tin tức", href: "/tin-tuc" },
  {
    label: "Lĩnh vực hoạt động",
    href: "/linh-vuc-hoat-dong",
    children: [
      { label: "Khai thác than", href: "/linh-vuc/than" },
      { label: "Khoáng sản", href: "/linh-vuc/khoang-san" },
      { label: "Điện lực", href: "/linh-vuc/dien-luc" },
      { label: "Công nghiệp phụ trợ", href: "/linh-vuc/phu-tro" },
    ],
  },
  { label: "Đơn vị thành viên", href: "/don-vi-thanh-vien" },
  { label: "Quan hệ cổ đông", href: "/quan-he-co-dong" },
  { label: "Liên hệ", href: "/lien-he" },
];

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 ml-1 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [activeItem, setActiveItem] = useState("/");
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 75);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleMouseEnter = (href) => {
    clearTimeout(closeTimer.current);
    setOpenDropdown(href);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  return (
    <div className={`w-full z-50 transition-all duration-300 ${isSticky ? "fixed top-0 left-0 shadow-2xl shadow-black/20" : "relative"}`}>
      <nav className="bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[52px]">

            {/* Desktop menu */}
            <ul className="hidden lg:flex items-center h-full">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.href}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => item.children && handleMouseEnter(item.href)}
                  onMouseLeave={() => item.children && handleMouseLeave()}
                >
                  <a
                    href={item.href}
                    onClick={() => setActiveItem(item.href)}
                    className={`group relative flex items-center h-full px-4 xl:px-5 text-[13px] font-medium tracking-wide whitespace-nowrap transition-colors duration-200 ${
                      activeItem === item.href
                        ? "text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {item.children && <ChevronDown />}

                    {/* Underline indicator */}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#c00000] transition-all duration-300 ease-out ${
                        activeItem === item.href
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>

                  {/* Dropdown */}
                  {item.children && (
                    <div
                      className={`absolute top-full left-0 mt-0 w-56 bg-white rounded-b-xl shadow-xl shadow-black/15 border border-gray-100 overflow-hidden transition-all duration-200 origin-top ${
                        openDropdown === item.href
                          ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
                      }`}
                      onMouseEnter={() => handleMouseEnter(item.href)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Dropdown top accent */}
                      <div className="h-[2px] bg-[#c00000]" />
                      <ul className="py-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <a
                              href={child.href}
                              onClick={() => setActiveItem(item.href)}
                              className="group flex items-center gap-3 px-5 py-2.5 text-[13px] text-gray-600 hover:text-[#c00000] hover:bg-red-50 transition-all duration-150"
                            >
                              <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#c00000] transition-colors duration-150 shrink-0" />
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Right: Hotline + mobile button */}
            <div className="flex items-center gap-3">
              <a
                href="tel:02438255017"
                className="hidden lg:flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 text-[13px]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-[#c00000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-semibold text-white">024 3825 5017</span>
              </a>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-md hover:bg-white/10 transition"
                onClick={() => setMobileOpen((p) => !p)}
                aria-label="Toggle menu"
              >
                <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
                <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
                <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-white/10 ${
            mobileOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <ul className="bg-[#0f172a] py-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileExpanded((p) => (p === item.href ? null : item.href))
                      }
                      className="w-full flex items-center justify-between px-6 py-3 text-[13px] font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-150"
                    >
                      {item.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
                          mobileExpanded === item.href ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        mobileExpanded === item.href ? "max-h-60" : "max-h-0"
                      }`}
                    >
                      <ul className="bg-[#080f1d] py-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <a
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 pl-10 pr-6 py-2.5 text-[12px] text-slate-400 hover:text-[#c00000] hover:bg-white/5 transition-colors duration-150"
                            >
                              <span className="w-1 h-1 rounded-full bg-[#c00000] shrink-0" />
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    onClick={() => {
                      setActiveItem(item.href);
                      setMobileOpen(false);
                    }}
                    className={`flex items-center px-6 py-3 text-[13px] font-medium transition-colors duration-150 ${
                      activeItem === item.href
                        ? "text-white border-l-2 border-[#c00000] bg-white/5"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}

            {/* Mobile hotline */}
            <li className="flex items-center gap-2 px-6 py-4 mt-1 border-t border-white/10 text-slate-400 text-[13px]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#c00000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-semibold text-white">024 3825 5017</span>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
