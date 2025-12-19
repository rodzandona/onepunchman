import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const environment = { apiUrl: "http://localhost:5243/api" };

interface User {
  id: number;
  username: string;
  email: string;
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

  /**
   * 🔐 Inicialização da autenticação
   * Se NÃO existe token → usuário deslogado
   */
  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    // ⚠️ Enquanto não existir endpoint /me,
    // NÃO inventamos usuário aqui
    setUser(null);
    setLoading(false);
  }, []);

  /**
   * 🔑 LOGIN
   */
  async function login(username: string, password: string) {
    const res = await fetch(`${environment.apiUrl}/auth/Login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Username: username,
        Password: password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Erro ao fazer login");
    }

    /**
     * Esperado da API:
     * {
     *   data: { id, username, email, token }
     * }
     */
    const { token, ...userPayload } = data.data;

    localStorage.setItem("Token", token);
    setUser(userPayload);
  }

  /**
   * 🚪 LOGOUT
   */
  function logout() {
    localStorage.removeItem("Token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
