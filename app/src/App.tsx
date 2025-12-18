import { useState } from "react"
import MenuBar from "./components/MenuBar"
import Home from "./pages/Home"
import Settings from "./pages/Settings"
import Login from "./pages/login"
import { Toaster } from "sonner"
import { AuthProvider, useAuth } from "../authProviders"


function AppContent() {
  const { user, loading, logout } = useAuth()


  // Estado responsável por controlar qual aba está ativa
  const [activeTab, setActiveTab] = useState<"home" | "settings">("home")

  /**
   * Enquanto o sistema ainda está verificando
   * se o usuário está logado ou não
   */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Carregando...
      </div>
    )
  }

  if (!user) {
    return (
      <>
        <Login />
        <Toaster richColors />
      </>
    )
  }

  /**
   * ✅ USUÁRIO LOGADO
   * Aqui entra no fluxo normal do app
   */
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Conteúdo principal */}
     <main className="flex-1 overflow-y-auto pb-28">
  {activeTab === "home" && <Home />}

  {activeTab === "settings" && (
  <Settings
  onGoHome={() => setActiveTab("home")}
  onLogout={() => {
    logout()
    setActiveTab("home")
  }}
/>

  )}
</main>


      {/* Menu inferior para navegação */}
      <MenuBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Toasts globais */}
      <Toaster richColors />
    </div>
  )
}

/**
 * Componente raiz da aplicação
 * Aqui garantimos que tudo esteja
 * dentro do AuthProvider
 */
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
