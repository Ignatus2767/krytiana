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
const db = require('../db'); // assuming you have a db.js that handles connection
// Fetch user-specific dashboard data
const getUserDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId; // Extract userId from the request
    try {
        // Fetch user information
        const [user] = yield db.query(`SELECT username FROM users WHERE id = ?`, [userId]);
        // Fetch courses in progress and their completion status
        const coursesInProgress = yield db.query(`SELECT c.title, uc.progress, uc.last_active, c.image 
             FROM user_courses uc 
             JOIN courses c ON uc.course_id = c.id 
             WHERE uc.user_id = ? AND uc.progress < 100`, [userId]);
        // Fetch courses completed
        const coursesCompleted = yield db.query(`SELECT COUNT(*) AS CoursesCompleted 
             FROM user_courses 
             WHERE user_id = ? AND progress = 100`, [userId]);
        // Fetch study reminders
        const [studyReminders] = yield db.query(`SELECT days_per_week FROM study_reminders WHERE user_id = ?`, [userId]);
        // Fetch user medals
        const medals = yield db.query(`SELECT medal_type, earned_on 
             FROM medals WHERE user_id = ?`, [userId]);
        // Structure the response data
        const dashboardData = {
            username: user.username,
            coursesInProgress: coursesInProgress.length,
            CourseCompletionPercentage: (coursesInProgress.reduce((acc, course) => acc + course.progress, 0) / coursesInProgress.length) || 0,
            CoursesCompleted: coursesCompleted[0].CoursesCompleted,
            courses: coursesInProgress,
            studyReminders: (studyReminders === null || studyReminders === void 0 ? void 0 : studyReminders.days_per_week) || 2,
            medals: medals
        };
        res.json(dashboardData);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching dashboard data" });
    }
});
exports.getUserDashboard = getUserDashboard;
//# sourceMappingURL=dashboardController.js.map