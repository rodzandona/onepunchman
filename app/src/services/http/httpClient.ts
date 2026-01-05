import { apiFetch } from "@/services/http/apiFetch";

export class HttpClient {
  async get<T>(path: string): Promise<T> {
    const res = await apiFetch(path, { method: "GET" });

    if (!res.ok) throw new Error(`GET ${path} failed`);
    return res.json();
  }

  async post<T>(path: string, body?: any): Promise<T> {
    const res = await apiFetch(path, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) throw new Error(`POST ${path} failed`);
    return res.json();
  }

  async put<T>(path: string, body?: any): Promise<T> {
    const res = await apiFetch(path, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) throw new Error(`PUT ${path} failed`);
    return res.json();
  }

  async delete<T>(path: string): Promise<T> {
    const res = await apiFetch(path, { method: "DELETE" });

    if (!res.ok) throw new Error(`DELETE ${path} failed`);
    return res.json();
  }
}

// Instância global
export const api = new HttpClient();
