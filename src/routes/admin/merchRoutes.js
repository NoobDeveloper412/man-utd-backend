import express from 'express'
import { authenticateToken } from '../../middlewares/authMiddleware.js';
import { addMerchController } from '../../controllers/admin/merchController.js';

const router = express.Router();


// ************ PROTECTED ROUTES ****************   
router.post('/add-merch', authenticateToken, addMerchController);


export default router;
