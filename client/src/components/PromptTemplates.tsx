const templatePrompts = [
  'A cat riding a bike through Tokyo at sunset',
  'Iron Man walking in a rainy street in Vietnam',
  'A majestic dragon flying above the clouds',
  'Cyberpunk fashion portrait with neon lights',
];

interface PromptTemplatesProps {
  onSelect: (prompt: string) => void;
}

export function PromptTemplates({ onSelect }: PromptTemplatesProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Prompt templates</h3>
        <span className="text-xs text-slate-500 dark:text-slate-400">Tap to autofill</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {templatePrompts.map((template) => (
          <button
            key={template}
            type="button"
            onClick={() => onSelect(template)}
            className="rounded-full border border-slate-300/80 bg-white px-4 py-2 text-left text-sm text-slate-700 transition hover:-translate-y-0.5 hover:border-violet-400 hover:text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-violet-400 dark:hover:text-violet-200"
          >
            {template}
          </button>
        ))}
      </div>
    </div>
  );
}
