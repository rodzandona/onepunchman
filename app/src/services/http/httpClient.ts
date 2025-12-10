import { environment } from "@/environments/environment";


const API_URL = environment.apiUrl

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getHeaders() {
    return {
      "Content-Type": "application/json"
    };
  }

  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "GET",
      headers: this.getHeaders()
    });

    if (!res.ok) throw new Error(`GET ${path} failed`);
    return res.json();
  }

  async post<T>(path: string, body: any): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error(`POST ${path} failed`);
    return res.json();
  }

  async put<T>(path: string, body: any): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error(`PUT ${path} failed`);
    return res.json();
  }

  async delete<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "DELETE",
      headers: this.getHeaders()
    });

    if (!res.ok) throw new Error(`DELETE ${path} failed`);
    return res.json();
  }
}

// Instância global
export const api = new HttpClient(API_URL);
