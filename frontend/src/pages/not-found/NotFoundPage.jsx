import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-gray-50">
    <div className="text-center max-w-md">
      <p className="text-[100px] font-black text-[#c00000] leading-none mb-4">404</p>
      <h1 className="text-[24px] font-black text-gray-900 mb-3">Trang không tồn tại</h1>
      <p className="text-[14px] text-gray-500 mb-8 leading-relaxed">
        Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-[#c00000] hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-red-900/20 transition-all duration-200 hover:-translate-y-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Về trang chủ
        </Link>
        <Link
          to="/lien-he"
          className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-bold px-6 py-3 rounded-full border border-gray-200 transition-all duration-200"
        >
          Liên hệ hỗ trợ
        </Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
