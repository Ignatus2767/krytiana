// src/routes/todoRoutes.ts
import { Router } from 'express';
import { addTodoReminder, getTodoReminders } from '../controllers/todoController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { getCourses } from '../controllers/coursesController';

const router = Router();

// Route to add a new to-do reminder
router.post('/todo', authenticateToken, addTodoReminder);

// Route to get user's to-do reminders
router.get('/todo', authenticateToken, getTodoReminders);

router.get('/courses', getCourses);


export default router;
