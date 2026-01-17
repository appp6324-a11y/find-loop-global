const BASE_URL = "";

export async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    credentials: "include"
  });
  if (!res.ok) throw new Error("API error");
  return res.json();
}

export async function apiPost<T>(url: string, body: any): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer demo-token"
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error("API error");
  return res.json();
}
