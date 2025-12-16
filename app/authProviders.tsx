import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const environment = { apiUrl: "http://localhost:5243/api" };

interface User {
  id: number;
  username: string;
  email: string;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      localStorage.removeItem("user");
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
  console.log("Resposta da API:", text);

  const responseData = text ? JSON.parse(text) : {};

  if (!res.ok) {
    throw new Error(responseData.message || "Erro ao fazer login");
  }

  const userPayload = responseData.data;
  setUser(userPayload);
  localStorage.setItem("user", JSON.stringify(userPayload));
}


  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
