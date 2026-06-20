const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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

// Stats & Contacts
export const fetchAdminStats    = (t) => request(`${BASE_URL}/admin/stats`, t);
export const fetchAdminContacts = (t) => request(`${BASE_URL}/admin/contacts`, t);

// News
export const fetchAdminNews = (t, params = {}) => {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== "" && v != null)
  ).toString();
  return request(`${BASE_URL}/admin/news${qs ? `?${qs}` : ""}`, t);
};
export const createNews    = (t, data)     => request(`${BASE_URL}/admin/news`, t, { method: "POST", body: JSON.stringify(data) });
export const updateNews    = (t, id, data) => request(`${BASE_URL}/admin/news/${id}`, t, { method: "PUT", body: JSON.stringify(data) });
export const deleteNews    = (t, id)       => request(`${BASE_URL}/admin/news/${id}`, t, { method: "DELETE" });
export const moderateNews  = (t, id, action) =>
  request(`${BASE_URL}/admin/news/${id}/status`, t, { method: "PATCH", body: JSON.stringify({ action }) });
export const reorderNews   = (t, orders) =>
  request(`${BASE_URL}/admin/news/reorder`, t, { method: "PUT", body: JSON.stringify({ orders }) });

// Jobs
export const fetchAdminJobs = (t)          => request(`${BASE_URL}/admin/jobs`, t);
export const createJob      = (t, data)    => request(`${BASE_URL}/admin/jobs`, t, { method: "POST", body: JSON.stringify(data) });
export const updateJob      = (t, id, data) => request(`${BASE_URL}/admin/jobs/${id}`, t, { method: "PUT", body: JSON.stringify(data) });
export const deleteJob      = (t, id)      => request(`${BASE_URL}/admin/jobs/${id}`, t, { method: "DELETE" });
