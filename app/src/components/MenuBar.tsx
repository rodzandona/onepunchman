import { Icon } from '@iconify/react';

interface MenuBarProps {
  activeTab: 'home' | 'settings' | 'relatorios';
  onTabChange: (tab: 'home' | 'settings' | 'relatorios') => void;
}

export default function MenuBar({ activeTab, onTabChange }: MenuBarProps) {
  const baseButtonClasses = `
    flex-1 flex flex-col items-center py-3 px-1 rounded-xl transition-all duration-300 text-sm font-medium
  `;

  return (
    <nav id="main-footer" className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-3 shadow-xl z-50 w-[calc(100%-2rem)] max-w-md">

      <div
        className="flex justify-center"
      >
        <div
          className="flex gap-2 p-2 bg-gray-200/80 rounded-2xl shadow-lg w-full max-w-xl mx-auto sm:w-full sm:px-2 py-2 sm:rounded-2xl md:w-[420px]"
        >
          <button
            onClick={() => onTabChange('home')}
            className={`${baseButtonClasses} transition-all duration-300 will-change-transform ${activeTab === 'home'
                ? 'bg-white text-[#D82B14] shadow-[1px_1px_1px_rgba(0,0,0,0.10)] -translate-y-1 border-1 border-[#D82B14]'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 hover:shadow-sm border border-gray-200 translate-y-0'
              } sm:py-2 sm:px-0`}
          >
            <Icon
              icon="solar:home-angle-linear"
              className={`w-6 h-6 mb-1 transition-all duration-300 ${activeTab === 'home' ? 'text-[#D82B14] scale-110' : 'text-gray-400 scale-100'
                }`}
            />
            <span className={`text-xs font-semibold transition-all duration-300 ${activeTab === 'home' ? 'text-[#D82B14]' : ''}`}>Início</span>
          </button>
          <button
            onClick={() => onTabChange('settings')}
            className={`${baseButtonClasses} transition-all duration-300 will-change-transform ${activeTab === 'settings'
                ? 'bg-white text-[#D82B14] shadow-[0_4px_12px_rgba(0,0,0,0.08)] -translate-y-1 border-1 border-[#D82B14]'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 hover:shadow-sm border border-gray-200 translate-y-0'
              } sm:py-2 sm:px-0`}
          >
            <Icon
              icon="solar:settings-linear"
              className={`w-6 h-6 mb-1 transition-all duration-300 ${activeTab === 'settings' ? 'text-[#D82B14] scale-110' : 'text-gray-400 scale-100'
                }`}
            />
            <span className={`text-xs font-semibold transition-all duration-300 ${activeTab === 'settings' ? 'text-[#D82B14]' : ''}`}>Config</span>
          </button>
          {/* Relatórios */}
           <button
            onClick={() => onTabChange('relatorios')}
            className={`${baseButtonClasses} transition-all duration-300 will-change-transform ${activeTab === 'relatorios'
                ? 'bg-white text-[#D82B14] shadow-[0_4px_12px_rgba(0,0,0,0.08)] -translate-y-1 border-1 border-[#D82B14]'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 hover:shadow-sm border border-gray-200 translate-y-0'
              } sm:py-2 sm:px-0`}
          >
            <Icon
              icon="solar:checklist-minimalistic-linear"
              className={`w-6 h-6 mb-1 transition-all duration-300 ${activeTab === 'relatorios' ? 'text-[#D82B14] scale-110' : 'text-gray-400 scale-100'
                }`}
            />
            <span className={`text-xs font-semibold transition-all duration-300 ${activeTab === 'relatorios' ? 'text-[#D82B14]' : ''}`}>Relatórios</span>
          </button>
        </div>
      </div>
    </nav>
  );
}