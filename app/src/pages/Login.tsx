import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "../../authProviders";

export default function Login() {
  const { login, loading, error } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(username, password);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      {/* HEADER */}
      <header className="w-full flex justify-center py-4">
        <img
          src="johnson-johnson-logo-png_seeklogo-500414-removebg-preview.png"
          alt="logo header"
          className="h-24 sm:h-32 md:h-40 object-contain"
        />
      </header>

      {/* MAIN */}
      <main className="flex flex-col items-center flex-1 px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <h2 className="text-center text-gray-900 font-semibold text-3xl">
            Bem-vindo!
          </h2>

          <h3 className="text-center text-gray-700 font-medium text-xl mb-6">
            Preencha seus dados para continuar
          </h3>

          {error && (
            <div className="text-red-600 text-center mb-4 font-bold">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="text-lg font-medium mb-2 block">Usuário</label>
            <Input
              placeholder="Insira seu usuário"
              className="border-gray-500/50 h-14"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-8">
            <label className="text-lg font-medium mb-2 block">Senha</label>
            <Input
              type="password"
              placeholder="Insira sua senha"
              className="border-gray-500/50 h-14"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-red-700 w-full h-14 text-xl hover:bg-red-800"
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </main>

      {/* FOOTER */}
      <footer className="bg-red-700 w-full py-4 flex justify-center items-center">
        <span className="text-white text-sm">
          Versão 12.12.2025
        </span>
      </footer>
    </div>
  );
}
