import { dataUrlFromBase64, downloadFromUrl, formatDate } from '../lib/utils';
import type { HistoryItem } from '../types/image';

interface ImageCardProps {
  item: HistoryItem;
}

export function ImageCard({ item }: ImageCardProps) {
  const imageSrc = item.imageUrl ?? dataUrlFromBase64(item.imageBase64 ?? '', item.mimeType);

  const handleDownload = () => {
    downloadFromUrl(imageSrc, `ai-image-${item._id}.png`);
  };

  return (
    <div className="rounded-[2rem] border border-slate-200/70 bg-white/85 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 dark:border-white/10">
        <img src={imageSrc} alt={item.prompt} className="aspect-square w-full object-cover" />
      </div>
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">
            {item.provider}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">{formatDate(item.createdAt)}</span>
        </div>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{item.prompt}</p>
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex w-full items-center justify-center rounded-full border border-slate-300/80 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-400 hover:text-violet-600 dark:border-white/10 dark:text-slate-100 dark:hover:border-violet-400 dark:hover:text-violet-200"
        >
          Download image
        </button>
      </div>
    </div>
  );
}
