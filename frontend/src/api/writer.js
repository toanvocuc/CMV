const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const UPLOAD_BASE = BASE_URL.replace("/api", "");

function authHeaders(token) {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

async function request(url, token, options = {}) {
  const res = await fetch(url, { ...options, headers: authHeaders(token) });
  const json = await res.json();
  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) throw new Error(json.message || "Request failed");
  return json;
}

export const fetchMyArticles  = (t, params = {}) => {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== "" && v != null)
  ).toString();
  return request(`${BASE_URL}/writer/articles${qs ? `?${qs}` : ""}`, t);
};
export const createMyArticle  = (t, data)     => request(`${BASE_URL}/writer/articles`, t, { method: "POST", body: JSON.stringify(data) });
export const updateMyArticle  = (t, id, data) => request(`${BASE_URL}/writer/articles/${id}`, t, { method: "PUT", body: JSON.stringify(data) });
export const submitMyArticle  = (t, id)       => request(`${BASE_URL}/writer/articles/${id}/submit`, t, { method: "PATCH", body: JSON.stringify({}) });
export const deleteMyArticle  = (t, id)       => request(`${BASE_URL}/writer/articles/${id}`, t, { method: "DELETE" });

export async function uploadImage(token, file) {
  const fd = new FormData();
  fd.append("image", file);
  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: fd,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Upload thất bại");
  return `${UPLOAD_BASE}${json.url}`;
}
