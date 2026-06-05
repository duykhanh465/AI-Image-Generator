interface PromptFormProps {
  prompt: string;
  isLoading: boolean;
  onPromptChange: (value: string) => void;
  onSubmit: () => void;
}

export function PromptForm({ prompt, isLoading, onPromptChange, onSubmit }: PromptFormProps) {
  return (
    <div className="rounded-[2rem] border border-slate-200/70 bg-white/85 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5">
      <label htmlFor="prompt" className="mb-3 block text-sm font-semibold text-slate-900 dark:text-slate-100">
        Describe the image you want to generate
      </label>
      <textarea
        id="prompt"
        rows={5}
        value={prompt}
        onChange={(event) => onPromptChange(event.target.value)}
        placeholder="A cinematic portrait of a cat riding a bike through a neon city..."
        className="w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-200 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-violet-500/20"
      />
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">High quality results with responsive download and history.</p>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading || !prompt.trim()}
          className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-violet-500 dark:text-slate-950 dark:hover:bg-violet-400"
        >
          {isLoading ? 'Generating...' : 'Generate image'}
        </button>
      </div>
    </div>
  );
}
