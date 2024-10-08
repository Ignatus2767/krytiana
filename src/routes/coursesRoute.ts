// routes/coursesRoute.ts
import express from 'express';
import { getCourses, addCourse } from '../controllers/coursesController';

const router = express.Router();

// Route to fetch all courses
router.get('/', getCourses);

// Route to add a new course
router.post('/add', addCourse);

export default router;
