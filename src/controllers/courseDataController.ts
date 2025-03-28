//src/controllers/courseDataController.ts
import { Request, Response } from "express";
import CourseData from "../models/courseData"; // MongoDB model

// Insert or update course data
export const insertCourseData = async (req: Request, res: Response) => {
    try {
        const { courseTitle, topics } = req.body;

        // ✅ Validate request
        if (!courseTitle || !topics || !topics.length) {
            return res.status(400).json({ message: "Course title and topics are required." });
        }

        // ✅ Find if the course exists
        let existingCourse = await CourseData.findOne({ courseTitle });

        if (existingCourse) {
            // ✅ Check if any topics already exist
            const existingTitles = existingCourse.topics.map((topic: { title: string }) => topic.title);
            const duplicateTopics = topics.filter((topic: { title: string }) => existingTitles.includes(topic.title));

            if (duplicateTopics.length) {
                return res.status(400).json({ message: "Some topics already exist in this course." });
            }

            // ✅ Add new topics to existing course
            existingCourse.topics.push(...topics);
            await existingCourse.save();
            return res.status(200).json({ message: "New topics added to course!", course: existingCourse });
        } else {
            // ✅ Create new course
            const newCourse = new CourseData({ courseTitle, topics });
            await newCourse.save();
            return res.status(201).json({ message: "New course added!", course: newCourse });
        }
    } catch (error) {
        console.error("Error saving course:", error);
        res.status(500).json({ message: "Error adding course", error });
    }
};

export const getCourseByTitle = async (req: Request, res: Response) => {
    try {
        const courseTitle = decodeURIComponent(req.params.courseTitle).trim();
        

        // Fetch all course titles to debug what's in the database
        const allCourses = await CourseData.find({}, "courseTitle");
       

        // 🔍 Debugging: Check if courseTitle exists in DB exactly
        const exists = allCourses.some(c => c.courseTitle.toLowerCase() === courseTitle.toLowerCase());
       

        // Try to find the course (case-insensitive search)
        const course = await CourseData.findOne({ courseTitle: new RegExp(`^${courseTitle}$`, "i") });

        if (!course) {
            console.log("❌ Course not found:", courseTitle);
            return res.status(404).json({ success: false, message: "Course not found" });
        }

    
        res.json(course);
    } catch (error) {
        console.error("⚠️ Error fetching course:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};



// Get all courses formatted properly



