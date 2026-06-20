import { useRef, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const UPLOAD_BASE = API_BASE.replace("/api", "");

const FILE_ICONS = {
  pdf:  { color: "text-red-500 bg-red-50",    label: "PDF" },
  doc:  { color: "text-blue-500 bg-blue-50",  label: "DOC" },
  docx: { color: "text-blue-500 bg-blue-50",  label: "DOCX" },
  xls:  { color: "text-green-600 bg-green-50", label: "XLS" },
  xlsx: { color: "text-green-600 bg-green-50", label: "XLSX" },
  ppt:  { color: "text-orange-500 bg-orange-50", label: "PPT" },
  pptx: { color: "text-orange-500 bg-orange-50", label: "PPTX" },
  txt:  { color: "text-gray-500 bg-gray-100",  label: "TXT" },
  csv:  { color: "text-teal-600 bg-teal-50",   label: "CSV" },
};

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function getExt(name) {
  return name.split(".").pop().toLowerCase();
}

// ─── Single file row ──────────────────────────────────────────────────────────

const FileRow = ({ file, onRemove }) => {
  const ext = getExt(file.name);
  const meta = FILE_ICONS[ext] ?? { color: "text-gray-500 bg-gray-100", label: ext.toUpperCase() };

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl group">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-black ${meta.color}`}>
        {meta.label}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-gray-800 truncate">{file.name}</p>
        <p className="text-[11px] text-gray-400">{formatSize(file.size)}</p>
      </div>
      <button
        type="button"
        onClick={() => onRemove(file.url)}
        className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
        title="Xóa file"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const FileAttachments = ({ value = [], onChange, token }) => {
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
      fd.append("file", file);
      const res = await fetch(`${API_BASE}/upload/file`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Upload thất bại");
      onChange([...value, { name: json.name, url: `${UPLOAD_BASE}${json.url}`, size: json.size }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleRemove = (url) => onChange(value.filter((f) => f.url !== url));

  return (
    <div className="space-y-2">
      {value.map((file) => (
        <FileRow key={file.url} file={file} onRemove={handleRemove} />
      ))}

      <button
        type="button"
        onClick={() => !uploading && inputRef.current?.click()}
        disabled={uploading}
        className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 hover:border-gray-400 text-[13px] text-gray-500 hover:text-gray-700 font-medium rounded-xl transition-colors disabled:opacity-50"
      >
        {uploading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Đang tải lên...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Đính kèm file (PDF, Word, Excel...)
          </>
        )}
      </button>

      {error && <p className="text-[12px] text-red-500">{error}</p>}

      <p className="text-[11px] text-gray-300">Tối đa 50MB mỗi file · PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, CSV</p>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
        onChange={handleFile}
        className="sr-only"
      />
    </div>
  );
};

export default FileAttachments;
