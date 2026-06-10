import axios from 'axios';
import { env } from '../config/env';

interface GeneratedImagePayload {
  imageBase64: string;
  mimeType: string;
}

export async function generateImageWithGemini(prompt: string): Promise<GeneratedImagePayload> {
  const response = await axios.post<ArrayBuffer>(
    `https://api-inference.huggingface.co/models/${env.huggingFaceModel}`,
    {
      inputs: prompt,
      parameters: {
        negative_prompt: 'blurry, distorted, low quality, watermark, text',
        num_inference_steps: 28,
        guidance_scale: 7.5,
      },
      options: {
        wait_for_model: true,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${env.huggingFaceApiKey}`,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
      validateStatus: () => true,
      timeout: 120000,
    },
  );

  const contentTypeHeader = response.headers['content-type'];
  const mimeType = typeof contentTypeHeader === 'string' ? contentTypeHeader : undefined;

  if (!mimeType?.startsWith('image/')) {
    const errorBody = Buffer.from(response.data).toString('utf8');
    throw new Error(`Hugging Face image generation failed: ${response.status} ${errorBody}`);
  }

  return {
    imageBase64: Buffer.from(response.data).toString('base64'),
    mimeType,
  };
}
