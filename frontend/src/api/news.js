const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function fetchNews({ category, page = 1, limit = 9 } = {}) {
  const params = new URLSearchParams({ page, limit });
  if (category && category !== "Tất cả") params.set("category", category);

  const res = await fetch(`${BASE_URL}/news?${params}`);
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

export async function fetchNewsBySlug(slug) {
  const res = await fetch(`${BASE_URL}/news/${slug}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch article");
  return res.json();
}
