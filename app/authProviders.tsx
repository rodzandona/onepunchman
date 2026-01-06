import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiFetch } from "@/services/http/apiFetch";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (!token) {
      setUser(null);
    }

    setLoading(false);
  }, []);

  async function login(username: string, password: string) {
    try {
      setLoading(true);
      setError(null);

      const response = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          Username: username,
          Password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao fazer login");
      }

      const { token, ...userPayload } = data.data;

      localStorage.setItem("Token", token);
      setUser(userPayload);
    } catch (err: any) {
      setError(err.message ?? "Erro inesperado");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("Token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
