import { Request, Response } from "express";
import { db } from "../config/mongo"; // Import MongoDB connection
import { ObjectId } from "mongodb"; // Import ObjectId for MongoDB queries

// Fetch user profile
export const getProfile = async (req: Request, res: Response) => {
    const userId = req.user?.userId; // Get userId from the token

    console.log("User ID from token:", userId);

    if (!userId) {
        return res.status(404).json({ success: false, message: "User not found." });
    }

    try {
        // Convert userId to ObjectId (if stored as ObjectId in MongoDB)
        const userObjectId = new ObjectId(userId);

        // Fetch user details
        const user = await db.collection("users").findOne({ _id: userObjectId });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Fetch user's course progress
        const courses = await db.collection("user_courses").aggregate([
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
        const completionPercentage =
            inProgressCount > 0
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
    } catch (error) {
        console.error("Error fetching user or courses:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
