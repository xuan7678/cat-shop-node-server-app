import express from 'express';
import { registerUser, getUsers, authUser, logoutUser, getUserProfile, updateUserProfile } from './userController.js'
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getUsers);
router.post('/signin', authUser);
router.post('/signup', registerUser);
router.post('/signout', logoutUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;
