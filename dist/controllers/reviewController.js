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
const db_1 = require("../db"); // Ensure the correct pool is imported
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.reviewDbPool.query('SELECT * FROM reviews');
        res.json(rows);
    }
    catch (error) {
        console.error('Error fetching reviews:', error); // Log the error
        res.status(500).json({ message: 'Error fetching reviews' });
    }
});
exports.getReviews = getReviews;
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, comment, rating } = req.body;
    try {
        yield db_1.reviewDbPool.query('INSERT INTO reviews (username, comment, rating) VALUES (?, ?, ?)', [username, comment, rating]);
        console.log('Review added successfully'); // Log the success message
        res.json({ success: true, message: 'Review added successfully' });
    }
    catch (error) {
        console.error('Error adding review:', error); // Log the error
        res.status(500).json({ success: false, message: 'Error adding review' });
    }
});
exports.addReview = addReview;
