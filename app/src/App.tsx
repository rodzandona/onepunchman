import { useState } from 'react'
import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import Settings from './pages/Settings'

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'settings'>('home')

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Conteúdo principal */}
      <main className="flex-1 overflow-y-auto pb-28">
        {activeTab === 'home' ? <Home /> : <Settings />}
      </main>
      
      {/* MenuBar fixo na parte inferior */}
      <MenuBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default App