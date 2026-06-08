import { useEffect, useMemo, useState } from 'react';
import { GenerationPanel } from '../components/GenerationPanel';
import { Header } from '../components/Header';
import { HistoryPanel } from '../components/HistoryPanel';
import { PromptForm } from '../components/PromptForm';
import { PromptTemplates } from '../components/PromptTemplates';
import { useHistory } from '../hooks/useHistory';
import { useTheme } from '../hooks/useTheme';
import { generateImage, getHistory } from '../services/imageApi';
import type { HistoryItem } from '../types/image';

const defaultPrompt = 'A cat riding a bike through a glowing futuristic city';

export function Home() {
  const { theme, toggleTheme } = useTheme();
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeId, setActiveId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sortedHistory = useHistory(history);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await getHistory();
        setHistory(response.items);
        setActiveId(response.items[0]?._id);
      } catch (loadError) {
        console.error(loadError);
      }
    };

    void loadHistory();
  }, []);

  const activeItem = useMemo(() => sortedHistory.find((item) => item._id === activeId) ?? sortedHistory[0], [activeId, sortedHistory]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await generateImage({ prompt: prompt.trim() });
      setHistory((currentHistory) => [response.historyItem, ...currentHistory.filter((item) => item._id !== response.historyItem._id)]);
      setActiveId(response.historyItem._id);
    } catch (requestError) {
      console.error(requestError);
      setError('Failed to generate image. Please check your server configuration and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.18),_transparent_35%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_45%,#ffffff_100%)] text-slate-900 transition dark:bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.18),_transparent_30%),linear-gradient(180deg,#020617_0%,#0f172a_45%,#020617_100%)] dark:text-white">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="space-y-5">
              <span className="inline-flex rounded-full border border-violet-300/60 bg-violet-100/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-violet-700 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-200">
                Text to image studio
              </span>
              <div className="max-w-3xl space-y-4">
                <h2 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                  Create premium AI art with a fast Gemini-powered generator.
                </h2>
                <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
                  Generate visuals from natural language, instantly preview the result, download the image, and keep a searchable history for later inspiration.
                </p>
              </div>
            </div>

            <PromptForm prompt={prompt} isLoading={isLoading} onPromptChange={setPrompt} onSubmit={handleGenerate} />
            <PromptTemplates onSelect={setPrompt} />

            {error ? (
              <div className="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200">
                {error}
              </div>
            ) : null}
          </div>

          <GenerationPanel activeItem={activeItem} isLoading={isLoading} />
        </section>

        <section className="mt-10">
          <HistoryPanel items={sortedHistory} activeId={activeItem?._id} onSelect={(item) => setActiveId(item._id)} />
        </section>
      </main>
    </div>
  );
}
