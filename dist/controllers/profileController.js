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
exports.getProfile = void 0;
const mongo_1 = require("../config/mongo"); // Import MongoDB connection
const mongodb_1 = require("mongodb"); // Import ObjectId for MongoDB queries
// Fetch user profile
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // Get userId from the token
    console.log("User ID from token:", userId);
    if (!userId) {
        return res.status(404).json({ success: false, message: "User not found." });
    }
    try {
        // Convert userId to ObjectId (if stored as ObjectId in MongoDB)
        const userObjectId = new mongodb_1.ObjectId(userId);
        // Fetch user details
        const user = yield mongo_1.db.collection("users").findOne({ _id: userObjectId });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        // Fetch user's course progress
        const courses = yield mongo_1.db.collection("user_courses").aggregate([
            { $match: { user_id: userObjectId } },
            {
                $lookup: {
                    from: "courses",
                    localField: "course_id",
                    foreignField: "_id",
                    as: "courseDetails",
                },
            },
            { $unwind: "$courseDetails" },
            {
                $project: {
                    title: "$courseDetails.title",
                    progress: 1,
                    last_active: 1,
                },
            },
        ]).toArray();
        // Calculate course statistics
        const inProgressCount = courses.length;
        const completedCount = courses.filter((course) => course.progress === 100).length;
        const completionPercentage = inProgressCount > 0
            ? ((courses.reduce((acc, course) => acc + course.progress, 0) / inProgressCount) * 100).toFixed(2)
            : "0.00";
        // Respond with user details and course statistics
        res.json({
            success: true,
            message: "Welcome to your profile",
            user: {
                fullname: user.fullname,
                username: user.username,
                email: user.email,
            },
            statistics: {
                coursesInProgress: inProgressCount,
                coursesCompleted: completedCount,
                courseCompletionPercentage: `${completionPercentage}%`,
            },
            courses, // Include course data
        });
    }
    catch (error) {
        console.error("Error fetching user or courses:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.getProfile = getProfile;
//# sourceMappingURL=profileController.js.map