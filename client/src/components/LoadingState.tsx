export function LoadingState() {
  return (
    <div className="rounded-[2rem] border border-slate-200/70 bg-white/85 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="animate-pulse space-y-4">
        <div className="h-5 w-40 rounded-full bg-slate-200 dark:bg-white/10" />
        <div className="aspect-square w-full rounded-[1.5rem] bg-slate-200 dark:bg-white/10" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded-full bg-slate-200 dark:bg-white/10" />
          <div className="h-4 w-2/3 rounded-full bg-slate-200 dark:bg-white/10" />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Generating your image with Gemini. This can take a few seconds.</p>
    </div>
  );
}
