"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReview = exports.getReviews = void 0;
const mongo_1 = require("../config/mongo"); // Import MongoDB connection
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all reviews, sorting by latest first
        const reviews = yield mongo_1.db.collection("reviews").find().sort({ created_at: -1 }).toArray();
        res.json(reviews);
    }
    catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Error fetching reviews" });
    }
});
exports.getReviews = getReviews;
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, comment, rating } = req.body;
    if (!username || !comment || !rating) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        // Insert the review into MongoDB
        yield mongo_1.db.collection("reviews").insertOne({
            username,
            comment,
            rating,
            created_at: new Date(), // Store timestamp
        });
        console.log("Review added successfully");
        res.json({ success: true, message: "Review added successfully" });
    }
    catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ success: false, message: "Error adding review" });
    }
});
exports.addReview = addReview;
//# sourceMappingURL=reviewController.js.map