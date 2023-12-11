import express from 'express';
import { getUserProfile, updateUserProfile, findUsers, getOtherUserProfile } from './userController.js'
import { getReviewsByUserId } from '../reviews/reviewController.js'
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(protect, getUserProfile)

router
    .route('/:id/users')
    .get(protect, admin, findUsers)

router
    .route('/:id/reviews')
    .get(protect, getReviewsByUserId)

router
    .route('/:id')
    .get(protect, getOtherUserProfile)
    .put(protect, updateUserProfile);

export default router;