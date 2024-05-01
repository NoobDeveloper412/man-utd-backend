import express from 'express'
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { fetchNewsController } from '../controllers/newsController.js';

const router = express.Router();


// ************ PROTECTED ROUTES ****************   
router.post('/fetch-news', authenticateToken, fetchNewsController);



export default router;
