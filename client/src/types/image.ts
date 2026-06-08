export type ThemeMode = 'light' | 'dark';

export interface GeneratedImage {
  prompt: string;
  imageUrl?: string;
  imageBase64?: string;
  mimeType?: string;
}

export interface HistoryItem extends GeneratedImage {
  _id: string;
  provider: 'gemini';
  createdAt: string;
}

export interface GenerateImageRequest {
  prompt: string;
}

export interface GenerateImageResponse {
  success: boolean;
  image: GeneratedImage;
  historyItem: HistoryItem;
}

export interface HistoryResponse {
  success: boolean;
  items: HistoryItem[];
}
