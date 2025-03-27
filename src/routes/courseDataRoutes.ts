// src/routes/courseDataRoutes.ts
import express from "express";
import { insertCourseData } from "../controllers/courseDataController";
import CourseData from "../models/courseData"; // ✅ Correct model import

const router = express.Router();

router.post("/save-course", insertCourseData);

router.get("/", async (req, res) => {
  try {
    const courses = await CourseData.find(); // ✅ Fetch courses from MongoDB
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

export default router;
