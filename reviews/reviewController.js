import asyncHandler from "../middleware/asyncHandler";
import Review from "./schema.js";
import User from "../users/schema";

const getReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({});
    res.json(reviews);
});


const createReview = asyncHandler(async (req, res) => {
    const {productTitle, productImage, comment, product} = req.body;
    const user =  req.user;
    const review = await User.create({
        productTitle,
        productImage,
        comment,
        user: user._id,
        product
    });

    if (review) {
        res.status(200).json(review);
    } else {
        res.status(400);
        throw new Error('Invalid review data');
    }
});

const getReviewsForUser = asyncHandler(async (req, res) => {
    const user = req.user;
    const reviews = await Review.find({user: user._id});
    res.json(reviews);
});

export {
    getReviews,
    createReview,
    getReviewsForUser,
}