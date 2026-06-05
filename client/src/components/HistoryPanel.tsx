import type { HistoryItem } from '../types/image';
import { dataUrlFromBase64, formatDate } from '../lib/utils';

interface HistoryPanelProps {
  items: HistoryItem[];
  activeId?: string;
  onSelect: (item: HistoryItem) => void;
}

export function HistoryPanel({ items, activeId, onSelect }: HistoryPanelProps) {
  return (
    <aside className="rounded-[2rem] border border-slate-200/70 bg-white/85 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Image history</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Recent creations saved from MongoDB.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-white/10 dark:text-slate-300">
          {items.length} items
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const previewImage = item.imageUrl ?? dataUrlFromBase64(item.imageBase64 ?? '', item.mimeType);

          return (
            <button
              key={item._id}
              type="button"
              onClick={() => onSelect(item)}
              className={`flex w-full items-center gap-3 rounded-3xl border p-3 text-left transition ${
                item._id === activeId
                  ? 'border-violet-400 bg-violet-50 dark:bg-violet-500/10'
                  : 'border-slate-200 hover:border-violet-300 hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5'
              }`}
            >
              <img src={previewImage} alt={item.prompt} className="h-16 w-16 rounded-2xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{item.prompt}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{formatDate(item.createdAt)}</p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
