"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodoReminders = exports.addTodoReminder = void 0;
const db_1 = require("../db"); // Adjust the import as per your db setup
// Add a new to-do reminder
const addTodoReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { task, date } = req.body; // Extract data from request body
    if (!req.user) {
        console.log('Unauthorized access attempt');
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    const userId = req.user.userId; // Get user ID from token (make sure this matches the key in your token)
    console.log('Adding reminder:', { userId, task, date });
    try {
        const result = yield db_1.signupDbPool.query('INSERT INTO study_reminders (user_id, task, date) VALUES (?, ?, ?)', [userId, task, date]);
        console.log('Reminder added successfully:', result);
        res.status(201).json({ success: true, message: 'Reminder added successfully' });
    }
    catch (error) {
        console.error('Error adding reminder:', error);
        res.status(500).json({ success: false, message: 'Failed to add reminder' });
    }
});
exports.addTodoReminder = addTodoReminder;
// Get user's to-do reminders
const getTodoReminders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        console.log('Unauthorized access attempt');
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    const userId = req.user.userId; // Get user ID from token (make sure this matches the key in your token)
    console.log('Fetching reminders for user ID:', userId);
    try {
        const [reminders] = yield db_1.signupDbPool.query('SELECT * FROM study_reminders WHERE user_id = ?', [userId]);
        console.log('Fetched reminders:', reminders);
        res.json({ success: true, reminders });
    }
    catch (error) {
        console.error('Error fetching reminders:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch reminders' });
    }
});
exports.getTodoReminders = getTodoReminders;
//# sourceMappingURL=todoController.js.map