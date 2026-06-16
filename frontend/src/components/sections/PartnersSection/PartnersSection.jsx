const PARTNERS = [
  {
    id: 1,
    name: "POSCO Energy",
    country: "Hàn Quốc",
    image: "https://picsum.photos/seed/partner-1/200/80",
  },
  {
    id: 2,
    name: "Marubeni Corporation",
    country: "Nhật Bản",
    image: "https://picsum.photos/seed/partner-2/200/80",
  },
  {
    id: 3,
    name: "Glencore",
    country: "Thụy Sĩ",
    image: "https://picsum.photos/seed/partner-3/200/80",
  },
  {
    id: 4,
    name: "Vale S.A.",
    country: "Brazil",
    image: "https://picsum.photos/seed/partner-4/200/80",
  },
  {
    id: 5,
    name: "China Energy",
    country: "Trung Quốc",
    image: "https://picsum.photos/seed/partner-5/200/80",
  },
  {
    id: 6,
    name: "Sumitomo Group",
    country: "Nhật Bản",
    image: "https://picsum.photos/seed/partner-6/200/80",
  },
  {
    id: 7,
    name: "BHP Group",
    country: "Úc",
    image: "https://picsum.photos/seed/partner-7/200/80",
  },
  {
    id: 8,
    name: "Rio Tinto",
    country: "Anh / Úc",
    image: "https://picsum.photos/seed/partner-8/200/80",
  },
];

const PartnerCard = ({ partner }) => (
  <div className="group flex flex-col items-center justify-center gap-3 p-6 bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md hover:shadow-gray-200/60 transition-all duration-300">
    {/* Logo */}
    <div className="w-full h-14 flex items-center justify-center overflow-hidden">
      <img
        src={partner.image}
        alt={partner.name}
        className="max-h-12 w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
      />
    </div>

    {/* Name + country */}
    <div className="text-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
      <p className="text-[12px] font-semibold text-gray-700 leading-tight">{partner.name}</p>
      <p className="text-[10px] text-gray-400 mt-0.5">{partner.country}</p>
    </div>
  </div>
);

const PartnersSection = () => (
  <section className="bg-white py-16 lg:py-20 border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="w-8 h-[2px] bg-[#c00000]" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#c00000] uppercase">
            Đối tác
          </span>
          <span className="w-8 h-[2px] bg-[#c00000]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
          Đối tác <span className="text-[#c00000]">chiến lược</span>
        </h2>
        <p className="mt-3 text-[14px] text-gray-500 max-w-md mx-auto">
          Hợp tác với các tập đoàn năng lượng và khai khoáng hàng đầu thế giới.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {PARTNERS.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>

      {/* Divider + bottom note */}
      <div className="mt-12 pt-8 border-t border-gray-100 text-center">
        <p className="text-[13px] text-gray-400">
          Cùng hợp tác với{" "}
          <span className="font-semibold text-gray-600">20+ quốc gia</span> và{" "}
          <span className="font-semibold text-gray-600">50+ đối tác quốc tế</span> trên toàn thế giới.
        </p>
      </div>
    </div>
  </section>
);

export default PartnersSection;
