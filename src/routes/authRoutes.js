import express from 'express'
import { signupController, loginController, userProfileController, updateLastSeenController } from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// User signup route
router.post('/signup', signupController);

// User login route
router.post('/login', loginController);

// Get user profile route
router.get('/profile', authenticateToken, userProfileController);

// ************ PROTECTED ROUTES ****************   
router.get('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: "You are viewing a protected route!", user: req.user });
});

router.post('/update-last-seen', authenticateToken, updateLastSeenController);



export default router;
