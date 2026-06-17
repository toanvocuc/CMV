const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function submitContact(data) {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Gửi thất bại");
  return json;
}
