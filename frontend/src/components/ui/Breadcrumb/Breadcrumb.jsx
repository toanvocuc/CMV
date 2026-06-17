import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => (
  <nav className="flex items-center gap-2 text-[12px] text-white/60">
    <Link to="/" className="hover:text-white transition-colors duration-200">
      Trang chủ
    </Link>
    {items.map((item, i) => (
      <span key={i} className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        {item.href && i < items.length - 1 ? (
          <Link to={item.href} className="hover:text-white transition-colors duration-200">
            {item.label}
          </Link>
        ) : (
          <span className="text-white/90">{item.label}</span>
        )}
      </span>
    ))}
  </nav>
);

export default Breadcrumb;
