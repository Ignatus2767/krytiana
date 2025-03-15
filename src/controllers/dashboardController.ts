import { Request, Response } from "express";
import { db } from "../config/mongo"; // Import MongoDB connection
import { ObjectId } from "mongodb"; // Import ObjectId for MongoDB queries

// Fetch user-specific dashboard data
export const getUserDashboard = async (req: Request, res: Response) => {
    const userId = req.params.userId; // Extract userId from the request

    try {
        // Convert userId to ObjectId (if stored as ObjectId in MongoDB)
        const userObjectId = new ObjectId(userId);

        // Fetch user information
        const user = await db.collection("users").findOne({ _id: userObjectId });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Fetch courses in progress (progress < 100)
        const coursesInProgress = await db.collection("user_courses").aggregate([
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
        const coursesCompletedCount = await db.collection("user_courses").countDocuments({
            user_id: userObjectId,
            progress: 100,
        });

        // Fetch study reminders
        const studyReminder = await db.collection("study_reminders").findOne({ user_id: userObjectId });

        // Fetch user medals
        const medals = await db.collection("medals").find({ user_id: userObjectId }).toArray();

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
            studyReminders: studyReminder?.days_per_week || 2,
            medals,
        };

        res.json(dashboardData);
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ error: "Error fetching dashboard data" });
    }
};
