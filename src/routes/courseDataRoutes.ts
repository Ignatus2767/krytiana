// src/routes/courseDataRoutes.ts
import express from "express";
import { insertCourseData, getCourseByTitle} from "../controllers/courseDataController";
import CourseData from "../models/courseData";

const router = express.Router();

router.post("/save-course", insertCourseData);
router.get("/:courseTitle", getCourseByTitle);



// ✅ New Route: Fetch All Available Course Categories
router.get("/categories", async (req, res) => {
  try {
      const courses = await CourseData.find({}, "courseTitle"); // ✅ Fetch only course titles

      if (!courses.length) {
        return res.status(200).json([]); // ✅ Always return an array
    }
    

      res.json(courses.map(course => course.courseTitle)); // ✅ Return only course titles
  } catch (error) {
      res.status(500).json({ message: "Error fetching courses", error });
  }
});


export default router;
