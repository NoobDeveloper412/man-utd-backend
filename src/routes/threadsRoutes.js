import express from 'express'
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { createThreadController, getRecentThreads } from '../controllers/threadsController.js';

const router = express.Router();

router.post('/fetch-threads', getRecentThreads);

// ************ PROTECTED ROUTES ****************   
router.get('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: "You are viewing a protected route!", user: req.user });
});

router.post('/create-thread', authenticateToken, createThreadController);



export default router;
