import { Icon } from '@iconify/react';

interface MenuBarProps {
  activeTab: 'home' | 'settings';
  onTabChange: (tab: 'home' | 'settings') => void;
}

export default function MenuBar({ activeTab, onTabChange }: MenuBarProps) {
  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-3 shadow-xl z-50 w-[calc(100%-2rem)] max-w-md">
      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
        {/* Botão Home */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex-1 flex flex-col items-center p-3 rounded-xl transition-all duration-300 text-sm font-medium ${
            activeTab === 'home' 
              ? 'bg-white text-primary shadow-lg' 
              : 'text-gray-600 hover:bg-white/50 hover:text-gray-800'
          }`}
        >
          <Icon 
            icon="solar:home-angle-linear" 
            className={`w-7 h-7 mb-1 transition-colors duration-300 ${
              activeTab === 'home' ? 'text-primary' : 'text-gray-500'
            }`}
          />
          <span className="text-xs font-medium">Início</span>
        </button>

        {/* Botão Configurações */}
        <button
          onClick={() => onTabChange('settings')}
          className={`flex-1 flex flex-col items-center p-3 rounded-xl transition-all duration-300 text-sm font-medium ${
            activeTab === 'settings' 
              ? 'bg-white text-primary shadow-lg' 
              : 'text-gray-600 hover:bg-white/50 hover:text-gray-800'
          }`}
        >
          <Icon 
            icon="solar:settings-linear" 
            className={`w-7 h-7 mb-1 transition-colors duration-300 ${
              activeTab === 'settings' ? 'text-primary' : 'text-gray-500'
            }`}
          />
          <span className="text-xs font-medium">Config</span>
        </button>
      </div>
    </nav>
  );
}