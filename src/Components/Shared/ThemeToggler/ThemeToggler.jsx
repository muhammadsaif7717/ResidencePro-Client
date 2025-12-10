import { CiSun } from 'react-icons/ci';
import { FaMoon } from 'react-icons/fa';
import { useTheme } from '../../../Hooks/useTheme';

const ThemeToggler = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-[#F1F5F9] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] hover:bg-[#E2E8F0] dark:hover:bg-[#334155] transition-all duration-300 shadow-md hover:shadow-lg group overflow-hidden"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Background glow effect */}
      <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${
        darkMode 
          ? 'bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 opacity-0 group-hover:opacity-100' 
          : 'bg-gradient-to-br from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100'
      } blur-xl`} />

      {/* Icons with smooth transition */}
      <div className="relative">
        {/* Sun Icon */}
        <CiSun 
          className={`absolute inset-0 w-6 h-6 text-[#F59E0B] transition-all duration-500 ${
            darkMode 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-180 scale-0'
          }`} 
        />
        
        {/* Moon Icon */}
        <FaMoon 
          className={`w-6 h-6 text-[#3B82F6] dark:text-[#8B5CF6] transition-all duration-500 ${
            darkMode 
              ? 'opacity-0 -rotate-180 scale-0' 
              : 'opacity-100 rotate-0 scale-100'
          }`} 
        />
      </div>

      {/* Ripple effect on click */}
      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-active:opacity-100 -translate-x-full group-active:translate-x-full transition-all duration-500" />
    </button>
  );
};

export default ThemeToggler;