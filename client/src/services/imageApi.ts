import axios from 'axios';
import type { GenerateImageRequest, GenerateImageResponse, HistoryResponse } from '../types/image';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api',
});

export async function generateImage(payload: GenerateImageRequest) {
  const { data } = await api.post<GenerateImageResponse>('/images/generate', payload);
  return data;
}

export async function getHistory() {
  const { data } = await api.get<HistoryResponse>('/images/history');
  return data;
}
