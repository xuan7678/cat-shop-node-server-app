import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  getReviews,
  createReview,
  getReviewsByProductId,
  createReviewCatAPI,
} from "./reviewController.js";

const router = express.Router();

router.route("/").get(protect, admin, getReviews).post(protect, createReview);

router.route("/:productId").get(getReviewsByProductId);
router.route("/catAPI").post(protect, createReviewCatAPI);

export default router;
