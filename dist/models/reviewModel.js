"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviews = exports.addReview = void 0;
const reviews = [];
const addReview = (review) => {
    reviews.push(review);
};
exports.addReview = addReview;
const getReviews = () => {
    return reviews;
};
exports.getReviews = getReviews;
