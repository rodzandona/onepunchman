import { useState } from 'react'
import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Login from './pages/Login'
import { Toaster } from "sonner";

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'settings' | 'login'>('home')

  return (

    <Login/>
  )
}

export default App
