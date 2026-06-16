import { useState } from "react";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.9v-2.89h2.538V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
    hover: "hover:text-[#1877f2]",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    hover: "hover:text-[#0a66c2]",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    hover: "hover:text-[#ff0000]",
  },
];

const TopBar = () => {
  const [lang, setLang] = useState("VI");

  return (
    <div className="w-full h-10 bg-[#1f2937] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">

        {/* Left — contact info */}
        <div className="flex items-center gap-5 overflow-x-auto scrollbar-none">

          {/* Hotline */}
          <a
            href="tel:02438255017"
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors duration-200 shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-[#c00000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <span className="text-[11px] font-medium">(024) 3825 5017</span>
          </a>

          {/* Divider */}
          <span className="hidden sm:block w-px h-3.5 bg-white/10 shrink-0" />

          {/* Email */}
          <a
            href="mailto:vinacomin@vinacomin.vn"
            className="hidden sm:flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors duration-200 shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-[#c00000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span className="text-[11px] font-medium">vinacomin@vinacomin.vn</span>
          </a>

          {/* Divider */}
          <span className="hidden lg:block w-px h-3.5 bg-white/10 shrink-0" />

          {/* Location */}
          <div className="hidden lg:flex items-center gap-1.5 text-slate-400 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-[#c00000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="text-[11px] font-medium">226 Lê Duẩn, Đống Đa, Hà Nội</span>
          </div>
        </div>

        {/* Right — socials + language */}
        <div className="flex items-center gap-3 shrink-0">

          {/* Social icons */}
          <div className="flex items-center gap-0.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`w-7 h-7 flex items-center justify-center rounded text-slate-500 ${s.hover} transition-colors duration-200`}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Divider */}
          <span className="w-px h-3.5 bg-white/10" />

          {/* Language switcher */}
          <div className="flex items-center bg-white/5 rounded overflow-hidden">
            {["VI", "EN"].map((l, i) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 text-[10px] font-bold tracking-wide transition-all duration-200 ${
                  lang === l
                    ? "bg-[#c00000] text-white"
                    : "text-slate-500 hover:text-slate-300"
                } ${i === 0 ? "border-r border-white/10" : ""}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
