import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const environment = { apiUrl: "http://localhost:5243/api" };

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }

    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  async function login(username: string, password: string) {
    const res = await fetch(`${environment.apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Username: username,
        Password: password,
      }),
    });

    const text = await res.text();
    const responseData = text ? JSON.parse(text) : {};
    console.log("LOGIN RAW RESPONSE:", responseData);


    if (!res.ok) {
      throw new Error(responseData.message || "Erro ao fazer login");
    }

    const { token, ...userPayload } = responseData.data;
    // API retorna { token, id, username, email }

    setUser(userPayload);
    setToken(token);

    localStorage.setItem("user", JSON.stringify(userPayload));
    localStorage.setItem("token", token);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
