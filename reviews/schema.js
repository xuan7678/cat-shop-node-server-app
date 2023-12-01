import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    productTitle: { type: String, required: true },
    productImage: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { collection: "reviews" }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
