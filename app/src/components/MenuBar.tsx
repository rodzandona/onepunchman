import { Icon } from '@iconify/react';

interface MenuBarProps {
  activeTab: 'home' | 'settings';
  onTabChange: (tab: 'home' | 'settings') => void;
}

export default function MenuBar({ activeTab, onTabChange }: MenuBarProps) {
  const baseButtonClasses = `
    flex-1 flex flex-col items-center py-3 px-1 rounded-xl transition-colors duration-300 text-sm font-medium
  `;

  return (
    <nav
      className="fixed bottom-0 left-0 w-full z-50 border-t border-gray-200 py-3 bg-white sm:bg-transparent sm:border-0 sm:py-0"
    >
      <div
        className="flex justify-center"
      >
        <div
          className="flex gap-2 p-2 bg-gray-200/80 rounded-2xl shadow-lg w-full max-w-xl mx-auto sm:mb-6 sm:w-full sm:px-2 sm:py-2 sm:rounded-2xl md:w-[420px]"
        >
          <button
            onClick={() => onTabChange('home')}
            className={`${baseButtonClasses} ${
              activeTab === 'home'
                  ? 'bg-white text-primary shadow-[1px_1px_1px_rgba(0,0,0,0.10)] transform -translate-y-0.5 border-1 border-[#D82B14]'
                : 'text-gray-500 hover:bg-white/80 hover:text-gray-700 hover:shadow-sm border border-gray-200'
            } sm:py-2 sm:px-0`}
          >
            <Icon
              icon="solar:home-angle-linear"
              className={`w-6 h-6 mb-1 transition-all duration-300 ${
                activeTab === 'home' ? 'text-primary scale-110' : 'text-gray-400'
              }`}
            />
            <span className="text-xs font-semibold">Início</span>
          </button>
          <button
            onClick={() => onTabChange('settings')}
            className={`${baseButtonClasses} ${
              activeTab === 'settings'
                  ? 'bg-white text-primary shadow-[0_4px_12px_rgba(0,0,0,0.08)] transform -translate-y-0.5 border-1 border-[#D82B14]'
                : 'text-gray-500 hover:bg-white/80 hover:text-gray-700 hover:shadow-sm border border-gray-200'
            } sm:py-2 sm:px-0`}
          >
            <Icon
              icon="solar:settings-linear"
              className={`w-6 h-6 mb-1 transition-all duration-300 ${
                activeTab === 'settings' ? 'text-primary scale-110' : 'text-gray-400'
              }`}
            />
            <span className="text-xs font-semibold">Config</span>
          </button>
        </div>
      </div>
    </nav>
  );
}