import express from 'express'
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { getTeamScorersController, getTeamsController } from '../controllers/teamController.js'

const router = express.Router();


// ************ PROTECTED ROUTES ****************   
router.post('/fetch-teams', authenticateToken, getTeamsController);
router.post('/fetch-scorers', authenticateToken, getTeamScorersController);



export default router;
