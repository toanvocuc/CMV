import { useState, useEffect } from "react";

const STATS = [
  { value: "85+", label: "Năm hoạt động", sub: "Years of Excellence" },
  { value: "100K+", label: "Nhân sự", sub: "Employees Nationwide" },
  { value: "50+", label: "Đơn vị thành viên", sub: "Member Companies" },
];

const HeroBanner = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full h-[350px] sm:h-[450px] lg:h-[650px] overflow-hidden">

      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80"
        alt="Vinacomin hero"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-[8000ms] ease-out"
        style={{ transform: mounted ? "scale(1)" : "scale(1.05)" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Red accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#c00000] to-transparent" />

      {/* Content wrapper */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">

        {/* Left — main content */}
        <div
          className={`flex-1 max-w-2xl transition-all duration-1000 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <span className="w-6 h-px bg-[#c00000]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-red-400 uppercase">
              Tập đoàn Công nghiệp Than – Khoáng sản Việt Nam
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4 sm:mb-6">
            Kiến tạo{" "}
            <span className="relative inline-block">
              <span className="text-[#c00000]">Năng lượng</span>
            </span>
            <br />
            Vì tương lai Việt Nam
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed max-w-lg mb-6 sm:mb-10">
            Hơn 85 năm hình thành và phát triển, Vinacomin là trụ cột ngành
            công nghiệp khai khoáng quốc gia, đảm bảo an ninh năng lượng bền vững.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="/gioi-thieu"
              className="group inline-flex items-center gap-2 bg-[#c00000] hover:bg-red-700 text-white text-sm font-semibold px-6 py-3 rounded-full shadow-lg shadow-red-900/40 transition-all duration-300 hover:shadow-red-900/60 hover:-translate-y-0.5"
            >
              Khám phá thêm
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/tin-tuc"
              className="inline-flex items-center gap-2 border border-white/40 hover:border-white/80 text-white text-sm font-semibold px-6 py-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
            >
              Xem tin tức
            </a>
          </div>
        </div>

        {/* Right — floating stats card */}
        <div
          className={`hidden lg:flex flex-col gap-px w-72 transition-all duration-1000 delay-300 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Glassmorphism card */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">

            {/* Card header */}
            <div className="bg-[#c00000]/90 backdrop-blur-md px-6 py-4">
              <p className="text-xs font-semibold tracking-widest text-red-200 uppercase">
                Thành tựu nổi bật
              </p>
            </div>

            {/* Stats */}
            <div className="bg-white/10 backdrop-blur-md divide-y divide-white/10">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 px-6 py-5 group hover:bg-white/10 transition-all duration-300 ${
                    mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                  }`}
                  style={{ transitionDelay: `${400 + i * 100}ms` }}
                >
                  <div className="w-1 h-10 rounded-full bg-gradient-to-b from-[#c00000] to-red-400 shrink-0" />
                  <div>
                    <p className="text-3xl font-black text-white leading-none tracking-tight group-hover:text-red-300 transition-colors duration-300">
                      {stat.value}
                    </p>
                    <p className="text-sm font-semibold text-white/90 mt-0.5">
                      {stat.label}
                    </p>
                    <p className="text-xs text-white/50 mt-0.5">
                      {stat.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Card footer */}
            <div className="bg-black/30 backdrop-blur-md px-6 py-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-white/60">Cập nhật 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/5 to-transparent" />

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-all duration-1000 delay-700 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-xs text-white/40 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default HeroBanner;
