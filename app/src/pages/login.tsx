import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "../../authProviders";

export default function Login() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      // ✅ sucesso → App troca automaticamente para Home
    } catch (err: any) {
      setError(err.message || "Falha ao entrar.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="w-full flex justify-center py-20">
        <img
          src="johnson-johnson-logo-png_seeklogo-500414-removebg-preview.png"
          alt="logo header"
          className="h-40 object-contain"
        />
      </header>

      <main className="flex flex-col items-center flex-1 -mt-20">
        <form onSubmit={handleSubmit} className="p-6 w-full max-w-md">
          <h2 className="text-center text-gray-900 font-semibold text-3xl">
            Bem vindo!
          </h2>
          <h3 className="text-center text-gray-700 font-medium text-xl mb-10">
            Preencha seus dados para continuar
          </h3>

          {error && (
            <div className="text-red-600 text-center mb-4 font-bold">
              {error}
            </div>
          )}

          <div className="mb-10">
            <div className="text-2xl mb-3 font-medium">Usuário</div>
            <Input
              placeholder="Insira seu usuário"
              className="border-gray-500/50 h-[3.5rem]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-10">
            <div className="text-2xl mb-3 font-medium">Senha</div>
            <Input
              type="password"
              placeholder="Insira sua senha"
              className="border-gray-500/50 h-[3.5rem]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-red-700 w-full h-[3.5rem] text-white text-2xl hover:bg-red-800"
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </main>

      <footer className="bg-red-700 w-full h-[5rem] mt-auto flex justify-center items-center">
        <h2 className="text-white text-sm">Versão 12.12.2025</h2>
      </footer>
    </div>
  );
}
