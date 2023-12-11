import asyncHandler from "../middleware/asyncHandler.js";
import Review from "./schema.js";
import User from "../users/schema.js";
import Product from "../products/model.js";
import { ObjectId } from "mongodb";

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
        throw new Error('Invalid review data');
    }
});

const getReviewsByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const reviews = await Review.find({ userId });
    res.json(reviews);
});

const getReviewsByProductId = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    //const reviews = await Review.find({product: new ObjectId(productId)});
    const reviews = await Review.find({ product: productId });
    res.json(reviews);
});

export {
    getReviews,
    createReview,
    getReviewsByUserId,
    getReviewsByProductId,
}