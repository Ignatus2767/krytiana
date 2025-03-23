import express from "express";
import { getCourses, getCourseById, addCourse, deleteCourse, updateCourse } from "../controllers/coursesController.js";

const router = express.Router();

// Fetch all courses
router.get("/", getCourses);

// Fetch a single course by ID
router.get("/:id", getCourseById);

// Add a new course
router.post("/add", addCourse);

// Delete a course
router.delete("/:id", deleteCourse);

// Edit a course
router.put("/:id", updateCourse);

export default router;
