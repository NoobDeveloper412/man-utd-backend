import express from 'express'
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { getBookingsPerSeasonController, getTeamScorersController, getTeamsController } from '../controllers/teamController.js'

const router = express.Router();


// ************ PROTECTED ROUTES ****************   
router.post('/fetch-teams', authenticateToken, getTeamsController);
router.post('/fetch-scorers', authenticateToken, getTeamScorersController);
router.post('/fetch-last-matches', authenticateToken, getBookingsPerSeasonController);



export default router;
