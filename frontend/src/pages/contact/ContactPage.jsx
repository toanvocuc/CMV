import { useState } from "react";
import PageHero from "../../components/ui/PageHero/PageHero";
import { submitContact } from "../../api/contact";

const OFFICES = [
  { name: "Trụ sở chính", address: "226 Lê Duẩn, Đống Đa, Hà Nội", phone: "(024) 3825 5017", email: "vinacomin@vinacomin.vn" },
  { name: "Văn phòng Quảng Ninh", address: "Phường Hồng Hải, TP. Hạ Long, Quảng Ninh", phone: "(0203) 384 6781", email: "qninh@vinacomin.vn" },
];

const EMPTY_FORM = { name: "", email: "", phone: "", subject: "", message: "" };

const ContactPage = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerError(null);

    try {
      await submitContact(form);
      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        title="Liên hệ với chúng tôi"
        subtitle="Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy để lại thông tin và chúng tôi sẽ phản hồi trong vòng 24 giờ."
        breadcrumb={[{ label: "Liên hệ" }]}
      />

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-10">
              <h2 className="text-[22px] font-black text-gray-900 mb-2">Gửi tin nhắn</h2>
              <p className="text-[14px] text-gray-500 mb-8">Điền vào biểu mẫu bên dưới và chúng tôi sẽ liên hệ lại với bạn.</p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-[18px] font-bold text-gray-900">Gửi thành công!</h3>
                  <p className="text-[14px] text-gray-500">Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong vòng 24 giờ.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-2 text-[13px] font-semibold text-[#c00000] hover:underline">
                    Gửi tin nhắn khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {serverError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] rounded-xl px-4 py-3">
                      {serverError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Họ và tên *</label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-2.5 text-[14px] border border-gray-200 rounded-xl focus:outline-none focus:border-[#c00000] focus:ring-1 focus:ring-[#c00000]/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Email *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="example@email.com"
                        className="w-full px-4 py-2.5 text-[14px] border border-gray-200 rounded-xl focus:outline-none focus:border-[#c00000] focus:ring-1 focus:ring-[#c00000]/20 transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Số điện thoại</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="0xxx xxx xxx"
                        className="w-full px-4 py-2.5 text-[14px] border border-gray-200 rounded-xl focus:outline-none focus:border-[#c00000] focus:ring-1 focus:ring-[#c00000]/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Chủ đề</label>
                      <select name="subject" value={form.subject} onChange={handleChange}
                        className="w-full px-4 py-2.5 text-[14px] border border-gray-200 rounded-xl focus:outline-none focus:border-[#c00000] focus:ring-1 focus:ring-[#c00000]/20 transition-all bg-white">
                        <option value="">Chọn chủ đề</option>
                        <option>Hợp tác kinh doanh</option>
                        <option>Tuyển dụng</option>
                        <option>Quan hệ nhà đầu tư</option>
                        <option>Hỗ trợ kỹ thuật</option>
                        <option>Khác</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Nội dung *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Nội dung tin nhắn của bạn..."
                      className="w-full px-4 py-2.5 text-[14px] border border-gray-200 rounded-xl focus:outline-none focus:border-[#c00000] focus:ring-1 focus:ring-[#c00000]/20 transition-all resize-none" />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#c00000] hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-900/25 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {loading && (
                      <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    )}
                    {loading ? "Đang gửi..." : "Gửi tin nhắn"}
                  </button>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <div className="flex flex-col gap-5">
              {OFFICES.map((office, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#c00000]" />
                    {office.name}
                  </h3>
                  <div className="space-y-3 text-[13px] text-gray-600">
                    <p className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#c00000] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      {office.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#c00000] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      {office.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#c00000] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      {office.email}
                    </p>
                  </div>
                </div>
              ))}

              <div className="bg-gray-200 rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mx-auto mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                  </svg>
                  <p className="text-[13px]">Google Maps</p>
                  <p className="text-[11px] opacity-60">226 Lê Duẩn, Đống Đa, HN</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
