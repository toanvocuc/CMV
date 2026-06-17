const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function fetchJobs({ search, department } = {}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (department) params.set("department", department);

  const res = await fetch(`${BASE_URL}/jobs?${params}`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}
