import { ThemeToggle } from './ThemeToggle';
import type { ThemeMode } from '../types/image';

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-500 dark:text-violet-300">
            Gemini powered
          </p>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">AI Image Generator</h1>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
