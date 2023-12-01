import express from 'express';
import {  getUserProfile, updateUserProfile, findUsers, getOtherUserProfile } from './userController.js'
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.
    route('/:id/users')
    .get(protect, admin, findUsers)

router.
route('/:id')
    .get(protect, admin, getOtherUserProfile)

export default router;