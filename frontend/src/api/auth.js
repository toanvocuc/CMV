const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function loginAdmin({ username, password }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Đăng nhập thất bại");
  return json;
}
