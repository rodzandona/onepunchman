const API_URL = "http://localhost:5243/api";

export interface ApiFetchOptions extends RequestInit {
  headers?: HeadersInit;
}



export async function apiFetch<T = unknown>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T | null> {

  const token = localStorage.getItem("Token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro na requisição à API");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json() as Promise<T>;
}
