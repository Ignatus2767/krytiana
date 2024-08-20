"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// myapp/src/routes/reviewRoutes.ts
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController"); // Ensure the path is correct
const router = (0, express_1.Router)();
router.get('/all', reviewController_1.getReviews);
router.post('/add', reviewController_1.addReview);
exports.default = router;
