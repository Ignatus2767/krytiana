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
exports.getUserDashboard = void 0;
const mongo_1 = require("../config/mongo"); // Import MongoDB connection
const mongodb_1 = require("mongodb"); // Import ObjectId for MongoDB queries
// Fetch user-specific dashboard data
const getUserDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId; // Extract userId from the request
    try {
        // Convert userId to ObjectId (if stored as ObjectId in MongoDB)
        const userObjectId = new mongodb_1.ObjectId(userId);
        // Fetch user information
        const user = yield mongo_1.db.collection("users").findOne({ _id: userObjectId });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Fetch courses in progress (progress < 100)
        const coursesInProgress = yield mongo_1.db.collection("user_courses").aggregate([
            { $match: { user_id: userObjectId, progress: { $lt: 100 } } },
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
                    image: "$courseDetails.image",
                },
            },
        ]).toArray();
        // Count completed courses (progress = 100)
        const coursesCompletedCount = yield mongo_1.db.collection("user_courses").countDocuments({
            user_id: userObjectId,
            progress: 100,
        });
        // Fetch study reminders
        const studyReminder = yield mongo_1.db.collection("study_reminders").findOne({ user_id: userObjectId });
        // Fetch user medals
        const medals = yield mongo_1.db.collection("medals").find({ user_id: userObjectId }).toArray();
        // Calculate overall course completion percentage
        const totalProgress = coursesInProgress.reduce((acc, course) => acc + course.progress, 0);
        const CourseCompletionPercentage = coursesInProgress.length > 0 ? totalProgress / coursesInProgress.length : 0;
        // Structure the response data
        const dashboardData = {
            username: user.username,
            coursesInProgress: coursesInProgress.length,
            CourseCompletionPercentage,
            CoursesCompleted: coursesCompletedCount,
            courses: coursesInProgress,
            studyReminders: (studyReminder === null || studyReminder === void 0 ? void 0 : studyReminder.days_per_week) || 2,
            medals,
        };
        res.json(dashboardData);
    }
    catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ error: "Error fetching dashboard data" });
    }
});
exports.getUserDashboard = getUserDashboard;
//# sourceMappingURL=dashboardController.js.map