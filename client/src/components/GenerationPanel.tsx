import type { HistoryItem } from '../types/image';
import { ImageCard } from './ImageCard';
import { LoadingState } from './LoadingState';

interface GenerationPanelProps {
  activeItem?: HistoryItem;
  isLoading: boolean;
}

export function GenerationPanel({ activeItem, isLoading }: GenerationPanelProps) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (!activeItem) {
    return (
      <div className="flex min-h-[480px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-300/80 bg-white/70 p-8 text-center shadow-soft dark:border-white/10 dark:bg-white/5">
        <div className="max-w-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 animate-float items-center justify-center rounded-3xl bg-violet-100 text-3xl text-violet-600 dark:bg-violet-500/15 dark:text-violet-200">
            AI
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Turn your ideas into striking visuals</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Enter a prompt, generate with Gemini, and build a reusable history of your favorite creations.
          </p>
        </div>
      </div>
    );
  }

  return <ImageCard item={activeItem} />;
}
