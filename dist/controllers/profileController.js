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
const db_1 = require("../db"); // Import the signup database pool
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // Get the userId from the token
    console.log('User ID from token:', userId);
    if (!userId) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }
    try {
        // Query the database to get the user by ID
        const [userRows] = yield db_1.signupDbPool.query('SELECT fullname, username, email FROM users WHERE id = ?', [userId]); // Cast the result as [User[], any]
        const user = userRows[0]; // Now TypeScript knows this is of type User
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
        // Fetch course progress
        const [courseRows] = yield db_1.signupDbPool.query('SELECT c.title, uc.progress, uc.last_active FROM user_courses uc JOIN courses c ON uc.course_id = c.id WHERE uc.user_id = ?', [userId]); // Cast the result as [Course[], any]
        const inProgressCount = courseRows.length; // Number of courses in progress
        const completedCount = courseRows.filter(course => course.progress === 100).length; // Number of completed courses
        const completionPercentage = (courseRows.reduce((acc, course) => acc + course.progress, 0) / (inProgressCount || 1)).toFixed(2); // Average progress percentage
        // Respond with user details and course statistics
        res.json({
            success: true,
            message: 'Welcome to your profile',
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
            courses: courseRows, // Include course data if needed
        });
    }
    catch (error) {
        console.error('Error fetching user or courses:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
exports.getProfile = getProfile;
//# sourceMappingURL=profileController.js.map