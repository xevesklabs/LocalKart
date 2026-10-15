import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/useTheme';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 hover:text-amber-700 dark:hover:text-amber-400 active:scale-95 transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30 shrink-0"
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4 text-amber-400 fill-amber-400 animate-spin-slow" />
          <span className="text-xs font-semibold hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-stone-600 dark:text-stone-300" />
          <span className="text-xs font-semibold hidden sm:inline">Dark</span>
        </>
      )}
    </button>
  );
}
