import { useRef, useState } from "react";

const UPLOAD_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace("/api", "");

const VideoUpload = ({ value, onChange, token }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState(null);
  const inputRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("video", file);
      const res = await fetch(
        `${(import.meta.env.VITE_API_URL || "http://localhost:5000/api")}/upload/video`,
        { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: fd }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Upload thất bại");
      onChange(`${UPLOAD_BASE}${json.url}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleRemove = () => { onChange(""); setError(null); };

  return (
    <div>
      {value ? (
        <div className="relative rounded-xl overflow-hidden bg-black">
          <video
            src={value}
            controls
            className="w-full max-h-64 object-contain"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-lg p-1.5 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          className="w-full h-36 border-2 border-dashed border-gray-200 hover:border-gray-400 rounded-xl cursor-pointer flex flex-col items-center justify-center gap-2 transition-colors"
        >
          {uploading ? (
            <>
              <svg className="w-5 h-5 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p className="text-[13px] text-gray-500 font-medium">Đang tải lên...</p>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <p className="text-[13px] text-gray-500 font-medium">Nhấn để tải video từ máy tính</p>
              <p className="text-[11px] text-gray-300">MP4, WebM, MOV · Tối đa 200MB</p>
            </>
          )}
        </div>
      )}

      {error && <p className="text-[12px] text-red-500 mt-1.5">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime,video/avi,video/x-matroska,.mov,.mp4,.webm,.avi,.mkv"
        onChange={handleFile}
        className="sr-only"
      />
    </div>
  );
};

export default VideoUpload;
