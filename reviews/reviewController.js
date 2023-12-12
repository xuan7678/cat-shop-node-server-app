import asyncHandler from "../middleware/asyncHandler.js";
import Review from "./schema.js";
import User from "../users/schema.js";
import Product from "../products/model.js";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({});
  res.json(reviews);
});

const createReview = asyncHandler(async (req, res) => {
  const { comment, productId } = req.body;
  const user = await User.findById(req.user._id);
  const product = await Product.findById(productId);
  const review = await Review.create({
    productTitle: product.title,
    productImage: product.image,
    comment,
    user: user._id,
    product: product._id,
  });

  if (review) {
    res.status(200).json(review);
  } else {
    res.status(400);
    throw new Error("Invalid review data");
  }
});

const createReviewCatAPI = asyncHandler(async (req, res) => {
  //kevin added this for catapi
  const { comment, product, productTitle } = req.body;
  console.log(req.body);
  const user = await User.findById(req.user._id);
  console.log(user); //this is verified to work
  try {
    const review = await Review.create({
      productTitle,
      comment,
      user: user._id, //this is verified to work
      product: product,
    });
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ message: "Invalid review data" });
  }
});

const getReviewsForUser = asyncHandler(async (req, res) => {
  const user = req.user;
  const reviews = await Review.find({ user: user._id });
  res.json(reviews);
});

const getReviewByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const reviews = await Review.find({ userId });
  res.json(reviews);
});

const getReviewsByProductId = asyncHandler(async (req, res) => {
  //this is using kevin version, if not work need discussion
  const itemId = req.params.productId; // Renamed to itemId to be more generic

  let query;
  if (mongoose.Types.ObjectId.isValid(itemId)) {
    // It's a valid ObjectId, so we can proceed with it for MongoDB lookup
    query = Review.find({ product: itemId });
  } else {
    // It's not a valid ObjectId (it's a numerical ID from external API), so handle accordingly
    query = Review.find({ product: itemId });
  }
  const reviews = await query;
  res.json(reviews);
});

export {
  getReviews,
  createReview,
  getReviewByUserId,
  getReviewsForUser,
  getReviewsByProductId,
  createReviewCatAPI,
};
