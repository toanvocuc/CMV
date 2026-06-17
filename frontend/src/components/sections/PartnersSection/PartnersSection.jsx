const PARTNERS = [
  {
    id: 1,
    abbr: "PE",
    name: "POSCO Energy",
    country: "Hàn Quốc",
    field: "Năng lượng",
    color: "from-blue-600 to-blue-800",
  },
  {
    id: 2,
    abbr: "MC",
    name: "Marubeni Corporation",
    country: "Nhật Bản",
    field: "Thương mại",
    color: "from-red-600 to-red-800",
  },
  {
    id: 3,
    abbr: "GL",
    name: "Glencore",
    country: "Thụy Sĩ",
    field: "Khoáng sản",
    color: "from-slate-600 to-slate-800",
  },
  {
    id: 4,
    abbr: "VA",
    name: "Vale S.A.",
    country: "Brazil",
    field: "Khai khoáng",
    color: "from-green-600 to-green-800",
  },
  {
    id: 5,
    abbr: "CE",
    name: "China Energy",
    country: "Trung Quốc",
    field: "Điện lực",
    color: "from-yellow-600 to-orange-700",
  },
  {
    id: 6,
    abbr: "SG",
    name: "Sumitomo Group",
    country: "Nhật Bản",
    field: "Công nghiệp",
    color: "from-purple-600 to-purple-800",
  },
  {
    id: 7,
    abbr: "BH",
    name: "BHP Group",
    country: "Úc",
    field: "Khai khoáng",
    color: "from-orange-600 to-red-700",
  },
  {
    id: 8,
    abbr: "RT",
    name: "Rio Tinto",
    country: "Anh / Úc",
    field: "Khoáng sản",
    color: "from-teal-600 to-teal-800",
  },
];

const PartnerCard = ({ partner }) => (
  <div className="group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden">

    {/* Hover red corner glow */}
    <div className="absolute top-0 right-0 w-24 h-24 bg-[#c00000]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />

    {/* Top row: monogram + field badge */}
    <div className="flex items-start justify-between mb-5">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${partner.color} flex items-center justify-center shadow-lg`}>
        <span className="text-white font-black text-[14px] tracking-tight">{partner.abbr}</span>
      </div>
      <span className="text-[10px] font-bold tracking-wide text-white/30 uppercase border border-white/10 rounded-full px-2.5 py-1 group-hover:text-white/50 group-hover:border-white/20 transition-all duration-300">
        {partner.field}
      </span>
    </div>

    {/* Company info */}
    <div className="flex-1">
      <h4 className="text-[14px] font-bold text-white/80 group-hover:text-white leading-snug transition-colors duration-300 mb-1">
        {partner.name}
      </h4>
      <div className="flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-[#c00000]" />
        <p className="text-[11px] text-white/40 group-hover:text-white/60 transition-colors duration-300">
          {partner.country}
        </p>
      </div>
    </div>

    {/* Bottom accent line */}
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c00000] to-red-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
  </div>
);

const PartnersSection = () => (
  <section className="bg-[#0f172a] py-16 lg:py-24 relative overflow-hidden">

    {/* Background decorative elements */}
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c00000]/5 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-[#c00000]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#c00000] uppercase">
              Hợp tác quốc tế
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            Đối tác <span className="text-[#c00000]">chiến lược</span>
          </h2>
          <p className="mt-2 text-[14px] text-white/40 max-w-md leading-relaxed">
            Hợp tác cùng các tập đoàn năng lượng và khai khoáng hàng đầu thế giới
            tại hơn 20 quốc gia.
          </p>
        </div>

        {/* Global stats */}
        <div className="flex items-center gap-6 shrink-0">
          {[
            { value: "20+", label: "Quốc gia" },
            { value: "50+", label: "Đối tác" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-black text-white leading-none">{s.value}</p>
              <p className="text-[11px] text-white/40 mt-1 tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {PARTNERS.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[13px] text-white/30">
          Quan tâm hợp tác với Vinacomin?
        </p>
        <a
          href="/lien-he"
          className="group inline-flex items-center gap-2 bg-[#c00000] hover:bg-red-700 text-white text-[13px] font-bold px-6 py-2.5 rounded-full shadow-lg shadow-red-900/30 hover:-translate-y-0.5 transition-all duration-300"
        >
          Liên hệ hợp tác
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  </section>
);

export default PartnersSection;
