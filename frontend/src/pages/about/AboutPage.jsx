import PageHero from "../../components/ui/PageHero/PageHero";

const TIMELINE = [
  { year: "1945", title: "Thành lập", desc: "Ngành than Việt Nam chính thức được thành lập, đặt nền móng cho sự phát triển công nghiệp khai khoáng quốc gia." },
  { year: "1994", title: "Thành lập Tổng công ty", desc: "Tổng công ty Than Việt Nam được thành lập trên cơ sở sáp nhập các đơn vị khai thác than vùng Quảng Ninh." },
  { year: "2005", title: "Nâng cấp thành Tập đoàn", desc: "Tập đoàn Công nghiệp Than Việt Nam được thành lập theo Quyết định của Thủ tướng Chính phủ." },
  { year: "2010", title: "Vinacomin", desc: "Hợp nhất với khoáng sản, chính thức mang tên Tập đoàn Công nghiệp Than – Khoáng sản Việt Nam (Vinacomin)." },
  { year: "2026", title: "Hiện tại", desc: "Vinacomin là tập đoàn công nghiệp nhà nước hàng đầu với hơn 100.000 nhân sự và 50+ đơn vị thành viên." },
];

const LEADERSHIP = [
  { name: "Nguyễn Văn An", title: "Chủ tịch Hội đồng Thành viên", image: "https://picsum.photos/seed/leader-1/200/200" },
  { name: "Trần Minh Đức", title: "Tổng Giám đốc", image: "https://picsum.photos/seed/leader-2/200/200" },
  { name: "Lê Thị Hương", title: "Phó Tổng Giám đốc", image: "https://picsum.photos/seed/leader-3/200/200" },
  { name: "Phạm Quốc Bảo", title: "Phó Tổng Giám đốc", image: "https://picsum.photos/seed/leader-4/200/200" },
];

const AboutPage = () => (
  <>
    <PageHero
      title="Giới thiệu Tập đoàn"
      subtitle="Hơn 85 năm xây dựng và phát triển, Vinacomin giữ vai trò trụ cột trong ngành công nghiệp khai khoáng và đảm bảo an ninh năng lượng quốc gia."
      breadcrumb={[{ label: "Giới thiệu" }]}
      image="https://picsum.photos/seed/about-hero/1200/400"
    />

    {/* Mission & Vision */}
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-[#c00000]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#c00000] uppercase">Sứ mệnh & Tầm nhìn</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-6">Kiến tạo năng lượng <span className="text-[#c00000]">vì tương lai</span></h2>
            <div className="space-y-4 text-[15px] text-gray-600 leading-relaxed">
              <p><strong className="text-gray-900">Sứ mệnh:</strong> Cung cấp năng lượng và khoáng sản đáp ứng nhu cầu phát triển kinh tế – xã hội của đất nước, góp phần đảm bảo an ninh năng lượng quốc gia.</p>
              <p><strong className="text-gray-900">Tầm nhìn:</strong> Trở thành tập đoàn công nghiệp – năng lượng đa ngành hàng đầu khu vực Đông Nam Á vào năm 2035, hoạt động bền vững và có trách nhiệm với xã hội.</p>
              <p><strong className="text-gray-900">Giá trị cốt lõi:</strong> An toàn – Chất lượng – Hiệu quả – Bền vững – Đoàn kết.</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
            <img src="https://picsum.photos/seed/about-mission/800/600" alt="Mission" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="bg-gray-50 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[2px] bg-[#c00000]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#c00000] uppercase">Lịch sử</span>
            <span className="w-8 h-[2px] bg-[#c00000]" />
          </div>
          <h2 className="text-3xl font-black text-gray-900">Hành trình <span className="text-[#c00000]">85 năm</span></h2>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gray-200 hidden lg:block" />
          <div className="flex flex-col gap-8">
            {TIMELINE.map((item, i) => (
              <div key={i} className={`relative flex items-start gap-6 lg:gap-0 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                <div className={`lg:w-1/2 ${i % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    <span className="text-[11px] font-black tracking-widest text-[#c00000] uppercase">{item.year}</span>
                    <h3 className="text-[16px] font-bold text-gray-900 mt-1 mb-2">{item.title}</h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full bg-[#c00000] border-4 border-white shadow-md z-10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Leadership */}
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[2px] bg-[#c00000]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#c00000] uppercase">Lãnh đạo</span>
            <span className="w-8 h-[2px] bg-[#c00000]" />
          </div>
          <h2 className="text-3xl font-black text-gray-900">Ban lãnh đạo <span className="text-[#c00000]">Tập đoàn</span></h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {LEADERSHIP.map((person, i) => (
            <div key={i} className="group text-center">
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                <img src={person.image} alt={person.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="text-[15px] font-bold text-gray-900">{person.name}</h4>
              <p className="text-[12px] text-gray-500 mt-1 leading-tight">{person.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default AboutPage;
