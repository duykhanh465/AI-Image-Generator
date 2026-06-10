import 'dotenv/config';

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 5000),
  mongoUri: requireEnv('MONGODB_URI'),
  huggingFaceApiKey: requireEnv('HUGGING_FACE_API_KEY'),
  huggingFaceModel: process.env.HUGGING_FACE_MODEL ?? 'stabilityai/stable-diffusion-xl-base-1.0',
  clientUrl: process.env.CLIENT_URL ?? 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV ?? 'development',
};
