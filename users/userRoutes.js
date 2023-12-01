import express from 'express';
import { registerUser, getUsers, authUser, logoutUser, deleteUser } from './userController.js'
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getUsers);
router.post('/signin', authUser);
router.post('/signup', registerUser);
router.post('/signout', logoutUser);

router.delete('/:username', deleteUser);

export default router;
