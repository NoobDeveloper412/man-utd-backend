import express from 'express'
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { fetchCompetitionsDataController, getFixturesController } from '../controllers/fixturesController.js';

const router = express.Router();


// ************ PROTECTED ROUTES ****************   
router.post('/fetch-fixtures', authenticateToken, getFixturesController);
router.post('/fetch-standings', authenticateToken, fetchCompetitionsDataController);



export default router;
