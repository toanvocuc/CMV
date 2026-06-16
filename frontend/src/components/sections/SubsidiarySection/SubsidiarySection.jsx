const COMPANIES = [
  { id: 1,  abbr: "HH",  name: "Công ty Than Hà Lầm",           field: "Khai thác than" },
  { id: 2,  abbr: "VK",  name: "Công ty Than Vàng Danh",         field: "Khai thác than" },
  { id: 3,  abbr: "MK",  name: "Công ty Than Mạo Khê",           field: "Khai thác than" },
  { id: 4,  abbr: "QN",  name: "Công ty Than Quang Hanh",        field: "Khai thác than" },
  { id: 5,  abbr: "TK",  name: "Công ty Than Thống Nhất",        field: "Khai thác than" },
  { id: 6,  abbr: "KC",  name: "Công ty Than Khe Chàm",          field: "Khai thác than" },
  { id: 7,  abbr: "DK",  name: "Công ty Khoáng sản Vinacomin",   field: "Khoáng sản"     },
  { id: 8,  abbr: "VC",  name: "Công ty Điện lực Vinacomin",     field: "Điện lực"       },
  { id: 9,  abbr: "VT",  name: "Công ty Vật tư – Tổng hợp",      field: "Thương mại"     },
  { id: 10, abbr: "VX",  name: "Công ty Xây dựng Vinacomin",     field: "Xây dựng"       },
  { id: 11, abbr: "VE",  name: "Công ty Môi trường Vinacomin",   field: "Môi trường"     },
  { id: 12, abbr: "VF",  name: "Công ty Tài chính Vinacomin",    field: "Tài chính"      },
];

const FIELD_COLORS = {
  "Khai thác than": { dot: "bg-amber-500",   text: "text-amber-600"   },
  "Khoáng sản":     { dot: "bg-stone-500",   text: "text-stone-600"   },
  "Điện lực":       { dot: "bg-blue-500",    text: "text-blue-600"    },
  "Thương mại":     { dot: "bg-violet-500",  text: "text-violet-600"  },
  "Xây dựng":       { dot: "bg-orange-500",  text: "text-orange-600"  },
  "Môi trường":     { dot: "bg-emerald-500", text: "text-emerald-600" },
  "Tài chính":      { dot: "bg-sky-500",     text: "text-sky-600"     },
};

const SubsidiaryCard = ({ company }) => {
  const colors = FIELD_COLORS[company.field] ?? { dot: "bg-gray-400", text: "text-gray-500" };

  return (
    <a
      href={`/don-vi-thanh-vien/${company.id}`}
      className="group flex flex-col items-center gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-gray-200/70 hover:-translate-y-1 hover:border-gray-200 transition-all duration-300"
    >
      {/* Logo placeholder */}
      <div className="relative w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-red-50 group-hover:border-red-100 transition-all duration-300">
        <span className="text-[17px] font-black text-gray-400 tracking-tight group-hover:text-[#c00000] transition-colors duration-300">
          {company.abbr}
        </span>
        {/* Corner dot */}
        <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${colors.dot}`} />
      </div>

      {/* Name */}
      <div className="text-center space-y-1">
        <p className="text-[13px] font-semibold text-gray-800 leading-snug group-hover:text-[#c00000] transition-colors duration-200 line-clamp-2">
          {company.name}
        </p>
        <div className="flex items-center justify-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${colors.dot}`} />
          <span className={`text-[10px] font-semibold tracking-wide ${colors.text}`}>
            {company.field}
          </span>
        </div>
      </div>

      {/* Arrow — visible on hover */}
      <div className="flex items-center gap-1 text-[11px] font-bold text-[#c00000] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        Xem thêm
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </a>
  );
};

const SubsidiarySection = () => (
  <section className="bg-white py-16 lg:py-24 border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-[#c00000]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#c00000] uppercase">
              Hệ sinh thái
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
            Đơn vị <span className="text-[#c00000]">thành viên</span>
          </h2>
          <p className="mt-2 text-[14px] text-gray-500 max-w-md">
            Mạng lưới hơn 50 đơn vị thành viên trải rộng trên toàn quốc và quốc tế.
          </p>
        </div>
        <a
          href="/don-vi-thanh-vien"
          className="group inline-flex items-center gap-2 text-[13px] font-semibold text-gray-500 hover:text-[#c00000] transition-colors duration-200 shrink-0"
        >
          Xem tất cả đơn vị
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {COMPANIES.map((company) => (
          <SubsidiaryCard key={company.id} company={company} />
        ))}
      </div>

      {/* Bottom strip */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[13px] text-gray-400 text-center sm:text-left">
          Đang hiển thị <span className="font-semibold text-gray-700">12</span> trong tổng số{" "}
          <span className="font-semibold text-gray-700">50+</span> đơn vị thành viên
        </p>
        <a
          href="/don-vi-thanh-vien"
          className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#c00000] text-[13px] font-semibold text-gray-600 hover:text-[#c00000] px-5 py-2.5 rounded-full transition-all duration-200"
        >
          Xem toàn bộ danh sách
        </a>
      </div>
    </div>
  </section>
);

export default SubsidiarySection;
