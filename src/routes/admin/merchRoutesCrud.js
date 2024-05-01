import express from 'express'
import { authenticateToken } from '../../middlewares/authMiddleware.js';
import { deleteMerchController, fetchAllMerchController, updateMerchController } from '../../controllers/admin/merchController.js';

const router = express.Router();


// ************ PROTECTED ROUTES ****************   
router.post('/fetch-merch', fetchAllMerchController);
router.post('/delete-merch/:id', deleteMerchController);
router.post('/update-merch/:id', updateMerchController);


export default router;
