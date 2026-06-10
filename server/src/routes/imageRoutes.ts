import { Router } from 'express';
import { generateImage, getImageHistory } from '../controllers/imageController';

const router = Router();

router.post('/generate', generateImage);
router.get('/history', getImageHistory);

export default router;
