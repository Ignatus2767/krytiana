//src/controllers/courseDataController.ts
import { Request, Response } from "express";
import CourseData from "../models/courseData"; // Assuming CourseData is your MongoDB model

export const insertCourseData = async (req: Request, res: Response) => {
    try {
        const { title, sections } = req.body;

        // Validate request
        if (!title || !sections || !sections.length) {
            return res.status(400).json({ message: "Title and sections are required." });
        }

        // Create a new course entry
        const newCourse = new CourseData({
            title,
            sections, // ✅ Contains images as URLs now
        });

        // Save to database
        await newCourse.save();

        res.status(201).json({ message: "Course added successfully!", course: newCourse });
    } catch (error) {
        console.error("Error saving course:", error);
        res.status(500).json({ message: "Error adding course", error });
    }
};
