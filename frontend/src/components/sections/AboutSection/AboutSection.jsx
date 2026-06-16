const HIGHLIGHTS = [
  { value: "1945", label: "Năm thành lập" },
  { value: "#1", label: "Khai thác than VN" },
  { value: "ISO", label: "9001 : 2015" },
];

const AboutSection = () => (
  <section className="bg-white py-16 lg:py-28 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left — Image block */}
        <div className="relative">
          {/* Decorative background shape */}
          <div className="absolute -top-6 -left-6 w-64 h-64 bg-gray-50 rounded-3xl -z-10" />
          <div className="absolute -bottom-6 -right-6 w-40 h-40 border-2 border-[#c00000]/15 rounded-3xl -z-10" />

          {/* Main image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-300/50 aspect-[4/3]">
            <img
              src="https://picsum.photos/seed/vinacomin-main/900/675"
              alt="Vinacomin operations"
              className="w-full h-full object-cover"
            />
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* Floating highlight cards */}
          <div className="absolute -bottom-5 left-6 right-6 sm:left-8 sm:right-8">
            <div className="bg-white rounded-xl shadow-xl shadow-gray-200/80 border border-gray-100 p-4 flex items-center justify-between gap-2">
              {HIGHLIGHTS.map((h, i) => (
                <div key={i} className={`flex-1 text-center ${i !== HIGHLIGHTS.length - 1 ? "border-r border-gray-100" : ""}`}>
                  <p className="text-[18px] font-black text-gray-900 leading-none">{h.value}</p>
                  <p className="text-[10px] text-gray-400 font-medium mt-1 leading-tight">{h.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Small accent image */}
          <div className="absolute -top-4 -right-4 w-28 h-28 rounded-xl overflow-hidden shadow-lg border-2 border-white hidden sm:block">
            <img
              src="https://picsum.photos/seed/vinacomin-accent/300/300"
              alt="Mining operations"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right — Content block */}
        <div className="lg:pl-4 mt-8 lg:mt-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-[2px] bg-[#c00000]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#c00000] uppercase">
              Giới thiệu tập đoàn
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-6">
            Trụ cột ngành{" "}
            <span className="text-[#c00000]">công nghiệp</span>
            <br />
            khai khoáng Việt Nam
          </h2>

          {/* Paragraphs */}
          <div className="space-y-4 mb-8">
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Tập đoàn Công nghiệp Than – Khoáng sản Việt Nam (Vinacomin) là doanh nghiệp
              nhà nước hàng đầu, giữ vai trò chủ đạo trong việc đảm bảo an ninh năng lượng
              quốc gia. Với hơn 85 năm hình thành và phát triển, chúng tôi đã xây dựng
              một hệ sinh thái công nghiệp toàn diện từ khai thác, chế biến đến phân phối.
            </p>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Vinacomin không ngừng đổi mới công nghệ, nâng cao năng suất lao động và
              thực hiện trách nhiệm xã hội doanh nghiệp. Chúng tôi cam kết phát triển
              bền vững, bảo vệ môi trường và đóng góp tích cực vào sự phát triển kinh tế
              – xã hội của đất nước.
            </p>
          </div>

          {/* Key points */}
          <ul className="space-y-3 mb-10">
            {[
              "Khai thác và chế biến than, khoáng sản đạt tiêu chuẩn quốc tế",
              "Hệ thống quản lý chất lượng ISO 9001:2015 toàn diện",
              "Đầu tư mạnh vào năng lượng tái tạo và công nghệ xanh",
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-[14px] text-gray-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#c00000] shrink-0" />
                {point}
              </li>
            ))}
          </ul>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/gioi-thieu"
              className="group inline-flex items-center gap-2 bg-[#c00000] hover:bg-red-800 text-white text-[13px] font-bold px-7 py-3.5 rounded-full shadow-lg shadow-red-900/25 hover:shadow-red-900/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Tìm hiểu thêm
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/gioi-thieu/lich-su"
              className="group inline-flex items-center gap-2 text-[13px] font-bold text-gray-600 hover:text-[#c00000] transition-colors duration-200"
            >
              Lịch sử hình thành
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
