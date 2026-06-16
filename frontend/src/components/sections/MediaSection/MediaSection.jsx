import { useState } from "react";

const MEDIA = [
  {
    id: 1,
    title: "Vinacomin – Hành trình 85 năm xây dựng và phát triển ngành than Việt Nam",
    duration: "12:45",
    views: "128K",
    date: "10/06/2026",
    image: "https://picsum.photos/seed/media-featured/1200/675",
    featured: true,
  },
  {
    id: 2,
    title: "Công nghệ khai thác than hiện đại tại mỏ Hà Lầm – Quảng Ninh",
    duration: "08:22",
    views: "64K",
    date: "05/06/2026",
    image: "https://picsum.photos/seed/media-2/600/340",
  },
  {
    id: 3,
    title: "Vinacomin triển khai chương trình phát triển bền vững 2026–2030",
    duration: "06:18",
    views: "42K",
    date: "01/06/2026",
    image: "https://picsum.photos/seed/media-3/600/340",
  },
  {
    id: 4,
    title: "Lễ ký kết hợp tác chiến lược giữa Vinacomin và POSCO Energy",
    duration: "04:55",
    views: "31K",
    date: "28/05/2026",
    image: "https://picsum.photos/seed/media-4/600/340",
  },
  {
    id: 5,
    title: "Hội nghị biểu dương chiến sĩ thi đua ngành than khoáng sản 2026",
    duration: "09:10",
    views: "27K",
    date: "20/05/2026",
    image: "https://picsum.photos/seed/media-5/600/340",
  },
];

const PlayButton = ({ size = "md" }) => {
  const sizes = {
    lg: "w-16 h-16",
    md: "w-11 h-11",
  };
  return (
    <div className={`${sizes[size]} rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-[#c00000] group-hover:border-[#c00000] group-hover:scale-110 transition-all duration-300`}>
      <svg xmlns="http://www.w3.org/2000/svg" className={size === "lg" ? "w-7 h-7 ml-1" : "w-4 h-4 ml-0.5"} viewBox="0 0 24 24" fill="white">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
};

const FeaturedCard = ({ item, onPlay }) => (
  <button
    onClick={() => onPlay(item)}
    className="group relative w-full rounded-2xl overflow-hidden shadow-lg aspect-video bg-gray-900 text-left"
  >
    <img
      src={item.image}
      alt={item.title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
    />

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-300" />

    {/* Featured badge */}
    <div className="absolute top-5 left-5 flex items-center gap-2 bg-[#c00000] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      Video nổi bật
    </div>

    {/* Duration */}
    <div className="absolute top-5 right-5 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
      {item.duration}
    </div>

    {/* Center play */}
    <div className="absolute inset-0 flex items-center justify-center">
      <PlayButton size="lg" />
    </div>

    {/* Bottom info */}
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <h3 className="text-white text-[16px] sm:text-[18px] font-bold leading-snug line-clamp-2 mb-3">
        {item.title}
      </h3>
      <div className="flex items-center gap-4 text-white/60 text-[12px]">
        <span className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {item.views} lượt xem
        </span>
        <span className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
          </svg>
          {item.date}
        </span>
      </div>
    </div>
  </button>
);

const MediaCard = ({ item, onPlay }) => (
  <button
    onClick={() => onPlay(item)}
    className="group flex flex-col sm:flex-row lg:flex-col gap-4 text-left w-full"
  >
    {/* Thumbnail */}
    <div className="relative rounded-xl overflow-hidden aspect-video sm:w-44 sm:shrink-0 lg:w-full bg-gray-900">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />

      {/* Play */}
      <div className="absolute inset-0 flex items-center justify-center">
        <PlayButton size="md" />
      </div>

      {/* Duration */}
      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
        {item.duration}
      </div>
    </div>

    {/* Info */}
    <div className="flex flex-col gap-2 justify-center min-w-0">
      <h4 className="text-[13px] font-semibold text-gray-800 group-hover:text-[#c00000] leading-snug line-clamp-2 transition-colors duration-200">
        {item.title}
      </h4>
      <div className="flex items-center gap-3 text-[11px] text-gray-400">
        <span>{item.views} lượt xem</span>
        <span className="w-1 h-1 rounded-full bg-gray-300" />
        <span>{item.date}</span>
      </div>
    </div>
  </button>
);

/* Modal */
const VideoModal = ({ item, onClose }) => {
  if (!item) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video placeholder */}
        <div className="aspect-video bg-gray-900 flex flex-col items-center justify-center gap-4">
          <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[#c00000] flex items-center justify-center shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 ml-1" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-white/60 text-[12px]">Video player placeholder</p>
          </div>
        </div>

        <div className="p-5 bg-gray-950">
          <p className="text-white text-[14px] font-semibold leading-snug">{item.title}</p>
          <p className="text-gray-500 text-[12px] mt-1">{item.views} lượt xem · {item.date}</p>
        </div>
      </div>
    </div>
  );
};

const MediaSection = () => {
  const [playing, setPlaying] = useState(null);
  const featured = MEDIA[0];
  const rest = MEDIA.slice(1);

  return (
    <>
      <section className="bg-gray-50 py-16 lg:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[2px] bg-[#c00000]" />
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#c00000] uppercase">
                  Truyền thông
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                Trung tâm <span className="text-[#c00000]">Media</span>
              </h2>
            </div>
            <a
              href="/truyen-thong"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold text-gray-500 hover:text-[#c00000] transition-colors duration-200 shrink-0"
            >
              Xem tất cả
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Featured */}
          <div className="mb-6">
            <FeaturedCard item={featured} onPlay={setPlaying} />
          </div>

          {/* 4 media cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-6 border-t border-gray-200">
            {rest.map((item) => (
              <MediaCard key={item.id} item={item} onPlay={setPlaying} />
            ))}
          </div>
        </div>
      </section>

      <VideoModal item={playing} onClose={() => setPlaying(null)} />
    </>
  );
};

export default MediaSection;
