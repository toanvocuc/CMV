import Breadcrumb from "../Breadcrumb/Breadcrumb";

const PageHero = ({ title, subtitle, breadcrumb, image }) => (
  <section className="relative bg-[#0f172a] overflow-hidden">
    {/* Background image */}
    {image && (
      <>
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent" />
      </>
    )}

    {/* Red left accent */}
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#c00000] to-transparent" />

    {/* Decorative dots */}
    <div className="absolute right-10 top-1/2 -translate-y-1/2 grid grid-cols-5 gap-2 opacity-10 hidden lg:grid">
      {Array.from({ length: 25 }).map((_, i) => (
        <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
      ))}
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      {breadcrumb && (
        <div className="mb-5">
          <Breadcrumb items={breadcrumb} />
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-[3px] bg-[#c00000] rounded-full" />
        <span className="text-[11px] font-bold tracking-[0.2em] text-[#c00000] uppercase">
          Vinacomin
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight max-w-2xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-[15px] text-white/50 max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  </section>
);

export default PageHero;
