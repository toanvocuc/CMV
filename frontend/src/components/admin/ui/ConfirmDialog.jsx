const ConfirmDialog = ({ title, description, confirmLabel = "Xác nhận", danger = true, loading, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
    <div className="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-sm text-center">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 ${danger ? "bg-red-100" : "bg-amber-100"}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${danger ? "text-red-600" : "text-amber-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <h3 className="text-[17px] font-black text-gray-900 mb-2">{title}</h3>
      <p className="text-[13px] text-gray-500 mb-6 leading-relaxed">{description}</p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={loading}
          className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-[13px] font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Huỷ
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className={`flex-1 py-2.5 text-[13px] font-bold rounded-xl transition-colors disabled:opacity-50 text-white ${
            danger ? "bg-red-600 hover:bg-red-700" : "bg-amber-500 hover:bg-amber-600"
          }`}
        >
          {loading ? "Đang xử lý..." : confirmLabel}
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmDialog;
