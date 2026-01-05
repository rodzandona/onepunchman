const API_URL = "http://localhost:5243/api";

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem("Token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  // 🔐 Token inválido ou expirado
  if (response.status === 401) {
    localStorage.removeItem("Token");
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  return response;
}
