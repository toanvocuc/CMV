import { useState, useEffect, useRef } from "react";

const Header = () => {
  const [lang, setLang] = useState("VI");
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (searchExpanded) searchRef.current?.focus();
  }, [searchExpanded]);

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSearchExpanded(false);
        setSearchValue("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="bg-white relative z-40">
      {/* Brand accent line */}
      <div className="h-[3px] bg-gradient-to-r from-[#c00000] via-[#e53e3e] to-[#c00000]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] gap-6">

          {/* Logo */}
          <a href="/" className="flex items-center gap-4 shrink-0 group">
            <div className="relative w-11 h-11 shrink-0">
              <div className="absolute inset-0 rounded-xl bg-[#c00000] shadow-md shadow-red-200 group-hover:scale-[1.06] group-hover:shadow-red-300 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-black text-xl tracking-tight select-none">V</span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col justify-center leading-tight">
              <span className="text-[#c00000] font-bold text-[15px] tracking-[0.06em] uppercase">
                Vinacomin
              </span>
              <span className="text-gray-400 text-[11px] tracking-wide font-medium mt-px">
                Vietnam National Coal – Mineral Industries Group
              </span>
            </div>
          </a>

          {/* Center: Expandable search */}
          <div ref={wrapperRef} className="flex-1 hidden md:flex items-center justify-center">
            <div
              className={`relative flex items-center transition-all duration-400 ease-in-out ${
                searchExpanded ? "w-full max-w-sm" : "w-9"
              }`}
            >
              <input
                ref={searchRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && setSearchExpanded(false)}
                placeholder="Tìm kiếm thông tin..."
                className={`w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent border-b-2 py-1.5 pr-9 focus:outline-none transition-all duration-400 ${
                  searchExpanded
                    ? "border-[#c00000] opacity-100 pl-0 pointer-events-auto"
                    : "border-transparent opacity-0 pl-0 pointer-events-none"
                }`}
              />
              <button
                onClick={() => setSearchExpanded((p) => !p)}
                className={`absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 ${
                  searchExpanded
                    ? "text-[#c00000] bg-red-50"
                    : "text-gray-400 hover:text-[#c00000] hover:bg-gray-50"
                }`}
                aria-label="Tìm kiếm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-[17px] h-[17px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: Social + divider + Lang */}
          <div className="flex items-center gap-3 shrink-0">

            {/* Social icons */}
            <div className="hidden lg:flex items-center gap-1.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.9v-2.89h2.538V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-5 bg-gray-200" />

            {/* Language pill */}
            <div className="flex items-center bg-gray-100 rounded-full p-[3px] gap-[2px]">
              {["VI", "EN"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 text-[11px] font-bold rounded-full tracking-wide transition-all duration-200 ${
                    lang === l
                      ? "bg-[#c00000] text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom shadow */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </header>
  );
};

export default Header;
