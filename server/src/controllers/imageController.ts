import { Request, Response } from 'express';
import { ImageHistory } from '../models/ImageHistory';
import { generateImageWithGemini } from '../services/geminiImageService';

function buildUnsavedHistoryItem(prompt: string, imageBase64: string, mimeType: string) {
  return {
    _id: `unsaved-${Date.now()}`,
    prompt,
    imageBase64,
    mimeType,
    provider: 'gemini' as const,
    createdAt: new Date().toISOString(),
  };
}

export async function generateImage(req: Request, res: Response) {
  const prompt = typeof req.body?.prompt === 'string' ? req.body.prompt.trim() : '';

  if (!prompt) {
    res.status(400).json({
      success: false,
      message: 'Prompt is required.',
    });
    return;
  }

  try {
    const imageResult = await generateImageWithGemini(prompt);

    try {
      const historyItem = await ImageHistory.create({
        prompt,
        imageBase64: imageResult.imageBase64,
        mimeType: imageResult.mimeType,
        provider: 'gemini',
      });

      res.status(201).json({
        success: true,
        image: {
          prompt,
          imageBase64: imageResult.imageBase64,
          mimeType: imageResult.mimeType,
        },
        historyItem,
      });
      return;
    } catch (historyError) {
      console.error('Failed to save image history.', historyError);
      res.status(201).json({
        success: true,
        image: {
          prompt,
          imageBase64: imageResult.imageBase64,
          mimeType: imageResult.mimeType,
        },
        historyItem: buildUnsavedHistoryItem(prompt, imageResult.imageBase64, imageResult.mimeType),
        warning: 'Image generated successfully, but history could not be saved.',
      });
      return;
    }
  } catch (error) {
    console.error('Failed to generate image with Gemini.', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate image.',
    });
    return;
  }
}

export async function getImageHistory(_req: Request, res: Response) {
  try {
    const items = await ImageHistory.find().sort({ createdAt: -1 }).limit(20).lean();

    res.json({
      success: true,
      items,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch image history.',
    });
    return;
  }
}
