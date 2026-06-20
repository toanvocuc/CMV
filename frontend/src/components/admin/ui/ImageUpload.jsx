import { useRef, useState } from "react";
import { uploadImage } from "../../../api/writer";

const ImageUpload = ({ value, onChange, token }) => {
  const [preview, setPreview] = useState(value || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setError(null);
    try {
      const url = await uploadImage(token, file);
      setPreview(url);
      onChange(url);
    } catch (err) {
      setError(err.message);
      setPreview(value || "");
    } finally {
      setUploading(false);
      // reset input so the same file can be re-selected if needed
      e.target.value = "";
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview("");
    onChange("");
    setError(null);
  };

  return (
    <div>
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className={`relative w-full rounded-xl overflow-hidden transition-all ${
          preview
            ? "cursor-pointer group"
            : "border-2 border-dashed border-gray-200 hover:border-gray-400 cursor-pointer h-40"
        }`}
      >
        {preview ? (
          <>
            <img src={preview} alt="" className="w-full h-44 object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <span className="text-white text-[13px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                Đổi ảnh
              </span>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-2 py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <p className="text-[13px] text-gray-500 font-medium">Nhấn để tải ảnh từ máy tính</p>
            <p className="text-[11px] text-gray-300">JPG, PNG, WebP · Tối đa 5MB</p>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-white/85 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin text-gray-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-[13px] text-gray-600 font-medium">Đang tải lên...</span>
          </div>
        )}
      </div>

      {error && <p className="text-[12px] text-red-500 mt-1.5">{error}</p>}

      {preview && !uploading && (
        <button
          type="button"
          onClick={handleRemove}
          className="mt-1.5 text-[12px] text-gray-400 hover:text-red-500 transition-colors"
        >
          Xóa ảnh
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFile}
        className="sr-only"
      />
    </div>
  );
};

export default ImageUpload;
