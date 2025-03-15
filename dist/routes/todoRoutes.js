"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/todoRoutes.ts
const express_1 = require("express");
const todoController_1 = require("../controllers/todoController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const coursesController_1 = require("../controllers/coursesController");
const router = (0, express_1.Router)();
// Route to add a new to-do reminder
router.post('/todo', authMiddleware_1.authenticateToken, todoController_1.addTodoReminder);
// Route to get user's to-do reminders
router.get('/todo', authMiddleware_1.authenticateToken, todoController_1.getTodoReminders);
// Route to get courses
router.get('/courses', coursesController_1.getCourses);
exports.default = router;
//# sourceMappingURL=todoRoutes.js.map