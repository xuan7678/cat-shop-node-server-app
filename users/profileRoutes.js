import express from 'express';
import { getUserProfile, updateUserProfile, findUsers, getOtherUserProfile } from './userController.js'
import { getReviewsForUser } from '../reviews/reviewController.js'
import { protect, admin } from '../middleware/authMiddleware.js';
import {getReviewByUserId} from "../reviews/reviewController.js";


const router = express.Router();

router
    .route('/')
    .get(protect, getUserProfile)

router
    .route('/:id/users')
    .get(protect, admin, findUsers)

router
    .route('/reviews')
    .get(protect, getReviewsForUser)        //api/profile/reviews  //get all reviews for user

router.get('/:id/reviews', getReviewByUserId)

  
router
    .route('/:id')
    .get(protect, getOtherUserProfile)
    .put(protect, updateUserProfile);

export default router;