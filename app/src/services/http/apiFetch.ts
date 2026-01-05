const API_URL = "http://localhost:5243/api";

function isTokenExpired(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

function getValidToken() {
  const token = localStorage.getItem("Token");
  if (!token) return null;

  if (isTokenExpired(token)) {
    localStorage.removeItem("Token");
    return null;
  }

  return token;
}

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getValidToken();

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Só adiciona JSON header se fizer sentido
  if (options.body && !(options.body instanceof FormData)) {
    Object.assign(headers, {
      "Content-Type": "application/json",
    });
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem("Token");
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  return response;
}
