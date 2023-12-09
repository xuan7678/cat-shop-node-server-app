import express from 'express';
import { getUserProfile, updateUserProfile, findUsers, getOtherUserProfile } from './userController.js'
import { getReviewsForUser } from '../reviews/reviewController.js'
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
    .get(protect, getReviewsForUser)

router
    .route('/:id')
    .get(protect, admin, getOtherUserProfile)
    .put(protect, updateUserProfile);

export default router;