import { Request, Response } from 'express';
import { dashboardDbPool } from '../db';


const db = require('../db'); // assuming you have a db.js that handles connection

// Fetch user-specific dashboard data
export const getUserDashboard = async (req: Request, res: Response) => {
    const userId = req.params.userId; // Extract userId from the request
    try {
        // Fetch user information
        const [user] = await db.query(
            `SELECT username FROM users WHERE id = ?`,
            [userId]
        );

        // Fetch courses in progress and their completion status
        const coursesInProgress = await db.query(
            `SELECT c.title, uc.progress, uc.last_active, c.image 
             FROM user_courses uc 
             JOIN courses c ON uc.course_id = c.id 
             WHERE uc.user_id = ? AND uc.progress < 100`,
            [userId]
        );

        // Fetch courses completed
        const coursesCompleted = await db.query(
            `SELECT COUNT(*) AS CoursesCompleted 
             FROM user_courses 
             WHERE user_id = ? AND progress = 100`,
            [userId]
        );

        // Fetch study reminders
        const [studyReminders] = await db.query(
            `SELECT days_per_week FROM study_reminders WHERE user_id = ?`,
            [userId]
        );

        // Fetch user medals
        const medals = await db.query(
            `SELECT medal_type, earned_on 
             FROM medals WHERE user_id = ?`,
            [userId]
        );

        // Structure the response data
        const dashboardData = {
            username: user.username,
            coursesInProgress: coursesInProgress.length,
            CourseCompletionPercentage: (coursesInProgress.reduce((acc: any, course: { progress: any; }) => acc + course.progress, 0) / coursesInProgress.length) || 0,
            CoursesCompleted: coursesCompleted[0].CoursesCompleted,
            courses: coursesInProgress,
            studyReminders: studyReminders?.days_per_week || 2,
            medals: medals
        };

        res.json(dashboardData);
    } catch (error) {
        res.status(500).json({ error: "Error fetching dashboard data" });
    }
};