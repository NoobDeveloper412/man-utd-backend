import express from 'express'
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { fetchLiveScoreController } from '../controllers/liveScoreController.js';

const router = express.Router();


// ************ PROTECTED ROUTES ****************   
router.post('/live-scores', authenticateToken, fetchLiveScoreController);



export default router;
