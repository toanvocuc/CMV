import { useEffect, useRef, useState } from "react";

const STATS = [
  {
    value: 85,
    suffix: "+",
    label: "Năm kinh nghiệm",
    sublabel: "Years of Experience",
    description: "Hình thành và phát triển từ năm 1945",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: 100,
    suffix: "K+",
    label: "Nhân sự",
    sublabel: "Employees Nationwide",
    description: "Lực lượng lao động hùng hậu trên toàn quốc",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    value: 50,
    suffix: "+",
    label: "Đơn vị thành viên",
    sublabel: "Member Companies",
    description: "Mạng lưới công ty thành viên trải rộng toàn quốc",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    value: 20,
    suffix: "+",
    label: "Quốc gia",
    sublabel: "Countries & Markets",
    description: "Hiện diện và hợp tác quốc tế trên toàn thế giới",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

const useCountUp = (target, duration = 1800, triggered) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [triggered, target, duration]);

  return count;
};

const StatCard = ({ stat, index, triggered }) => {
  const count = useCountUp(stat.value, 1800 + index * 100, triggered);

  return (
    <div
      className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/80 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top-left red accent bar */}
      <div className="absolute top-0 left-0 w-[3px] h-0 bg-[#c00000] group-hover:h-full transition-all duration-500 ease-out rounded-l-2xl" />

      <div className="relative flex flex-col gap-5">
        {/* Icon */}
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-red-50 group-hover:border-red-100 group-hover:text-[#c00000] transition-all duration-300">
            {stat.icon}
          </div>
          {/* Decorative dots */}
          <div className="grid grid-cols-3 gap-1 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-gray-400" />
            ))}
          </div>
        </div>

        {/* Number */}
        <div>
          <div className="flex items-end gap-0.5 leading-none mb-2">
            <span className="text-[52px] font-black text-gray-900 tracking-tight tabular-nums group-hover:text-[#c00000] transition-colors duration-300">
              {count}
            </span>
            <span className="text-[28px] font-black text-[#c00000] mb-1.5">
              {stat.suffix}
            </span>
          </div>

          {/* Labels */}
          <p className="text-[16px] font-bold text-gray-800 leading-tight">
            {stat.label}
          </p>
          <p className="text-[11px] font-semibold tracking-[0.12em] text-gray-400 uppercase mt-0.5">
            {stat.sublabel}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 group-hover:bg-red-100 transition-colors duration-300" />

        {/* Description */}
        <p className="text-[13px] text-gray-400 leading-relaxed">
          {stat.description}
        </p>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const [triggered, setTriggered] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-gray-50 py-16 lg:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#c00000]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#c00000] uppercase">
              Thành tựu
            </span>
            <span className="w-8 h-[2px] bg-[#c00000]" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            Con số nói lên
            <span className="text-[#c00000]"> tất cả</span>
          </h2>
          <p className="mt-4 text-[15px] text-gray-500 max-w-xl mx-auto leading-relaxed">
            Hơn 85 năm kiên định xây dựng và phát triển, Vinacomin khẳng định
            vị thế hàng đầu trong ngành công nghiệp khai khoáng Việt Nam.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {STATS.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} triggered={triggered} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 pt-10 border-t border-gray-200">
          <p className="text-[14px] text-gray-500">
            Tìm hiểu thêm về lịch sử hình thành và phát triển của Tập đoàn
          </p>
          <a
            href="/gioi-thieu/lich-su"
            className="group inline-flex items-center gap-2 text-[13px] font-bold text-[#c00000] hover:gap-3 transition-all duration-200"
          >
            Xem lịch sử
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
