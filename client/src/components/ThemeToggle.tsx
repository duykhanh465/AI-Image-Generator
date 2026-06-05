import type { ThemeMode } from '../types/image';

interface ThemeToggleProps {
  theme: ThemeMode;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
    >
      <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
      <span className="text-base" aria-hidden="true">
        {theme === 'dark' ? '☀' : '☾'}
      </span>
    </button>
  );
}
