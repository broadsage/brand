import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export interface ThemeToggleProps {
  className?: string;
  compact?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', compact = false }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const syncTheme = () => {
      const isLight = document.documentElement.classList.contains('light');
      setTheme(isLight ? 'light' : 'dark');
    };

    syncTheme();

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: 'dark' | 'light' }>;
      if (customEvent.detail?.theme) {
        setTheme(customEvent.detail.theme);
      }
    };

    window.addEventListener('broadsage-theme-change', handleThemeChange);
    document.addEventListener('astro:page-load', syncTheme);
    document.addEventListener('astro:after-swap', syncTheme);

    return () => {
      window.removeEventListener('broadsage-theme-change', handleThemeChange);
      document.removeEventListener('astro:page-load', syncTheme);
      document.removeEventListener('astro:after-swap', syncTheme);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);

    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }

    try {
      localStorage.setItem('broadsage_theme', nextTheme);
    } catch (e) {}

    window.dispatchEvent(
      new CustomEvent('broadsage-theme-change', { detail: { theme: nextTheme } })
    );
  };

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/80 animate-pulse ${className}`}
      />
    );
  }

  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 active:scale-95 shadow-sm outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 ${
        isLight
          ? 'bg-[#EFE7DC] hover:bg-[#E5DCCF] text-[#0A1128] border-[#DBD1C2]'
          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
      } ${className}`}
      title={isLight ? 'Switch to Midnight Navy (Default Brand Mode)' : 'Switch to Solar Ivory (Warm Light Mode)'}
      aria-label={isLight ? 'Switch to Midnight Navy dark mode' : 'Switch to Solar Ivory light mode'}
    >
      {isLight ? (
        <>
          <Moon className="w-4 h-4 text-sky-700 transition-transform duration-300" />
          {!compact && <span className="font-mono text-[11px] font-bold text-[#0A1128]">Midnight Navy</span>}
        </>
      ) : (
        <>
          <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300" />
          {!compact && <span className="font-mono text-[11px] font-bold text-slate-200">Solar Ivory</span>}
        </>
      )}
    </button>
  );
};

export default ThemeToggle;

