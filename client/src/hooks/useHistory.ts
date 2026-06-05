import { useMemo } from 'react';
import type { HistoryItem } from '../types/image';

export function useHistory(items: HistoryItem[]) {
  return useMemo(() => items.slice().sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)), [items]);
}
