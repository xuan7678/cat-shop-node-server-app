import express from "express";
import {admin, protect} from "../middleware/authMiddleware.js";
import { getReviews, createReview } from "./reviewController.js";

const router = express.Router();

router.route('/').get(protect, admin, getReviews)
    .post(protect, createReview);

export default router;