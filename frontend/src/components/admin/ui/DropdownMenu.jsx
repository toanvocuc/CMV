import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const DropdownMenu = ({ items }) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const toggle = (e) => {
    e.stopPropagation();
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 4, right: window.innerWidth - r.right });
    }
    setOpen((o) => !o);
  };

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      // Don't close if the click is inside the menu itself
      if (menuRef.current && menuRef.current.contains(e.target)) return;
      setOpen(false);
    };
    const closeOnScroll = () => setOpen(false);
    document.addEventListener("mousedown", close);
    window.addEventListener("scroll", closeOnScroll, { passive: true, capture: true });
    return () => {
      document.removeEventListener("mousedown", close);
      window.removeEventListener("scroll", closeOnScroll, true);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={toggle}
        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>

      {open && ReactDOM.createPortal(
        <div
          ref={menuRef}
          style={{ position: "fixed", top: pos.top, right: pos.right, zIndex: 9999 }}
          className="w-52 bg-white border border-gray-100 rounded-xl shadow-xl py-1.5"
        >
          {items.map((item, i) =>
            item === "---" ? (
              <div key={i} className="my-1.5 border-t border-gray-100" />
            ) : (
              <button
                key={item.label}
                onClick={() => { setOpen(false); item.onClick(); }}
                disabled={item.disabled}
                className={`w-full text-left flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-medium transition-colors ${
                  item.disabled
                    ? "text-gray-300 cursor-not-allowed"
                    : item.danger
                    ? "text-red-600 hover:bg-red-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.icon && <span className="w-4 h-4 shrink-0">{item.icon}</span>}
                {item.label}
              </button>
            )
          )}
        </div>,
        document.body
      )}
    </>
  );
};

export default DropdownMenu;
