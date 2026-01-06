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
  console.log("Token usado no apiFetch:", token);
  if (!token) return null;

  if (isTokenExpired(token)) {
    localStorage.removeItem("Token"); 
    return null;
  }

  return token;
}


export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
  timeoutMs: number = 1000 
): Promise<Response> {
  const token = getValidToken();


  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };


  if (options.body && !(options.body instanceof FormData)) {
    Object.assign(headers, { "Content-Type": "application/json" });
  }

 
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
   
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

 
    if (response.status === 401) {
      localStorage.removeItem("Token");
      throw new Error("Sessão expirada. Faça login novamente.");
    }

    console.log("Fetching:", endpoint, "Token:", token);
    return response; 
  } catch (err) {

    if ((err as any).name === "AbortError") {
      throw new Error(`Tempo de espera da requisição ultrapassou ${timeoutMs}ms`);
    }
    throw err; 
  } finally {
    clearTimeout(timeout);
  }
}
