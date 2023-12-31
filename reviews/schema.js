import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    product: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      ref: "products",
      required: true,
    },
    productTitle: { type: String, required: true },
    productImage: { type: String },
    comment: { type: String, required: true },
  },
  { collection: "reviews" }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
