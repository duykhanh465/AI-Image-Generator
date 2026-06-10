import express from 'express';
import cors from 'cors';
import imageRoutes from './routes/imageRoutes';
import { env } from './config/env';

const app = express();

const allowedOrigins = [env.clientUrl, 'http://localhost:5173', 'http://localhost:5174'];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
  }),
);
app.use(express.json({ limit: '20mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ success: true, status: 'ok' });
});

app.use('/api/images', imageRoutes);

export default app;
