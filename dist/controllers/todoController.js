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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodoReminders = exports.addTodoReminder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define the Todo schema
const todoSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
    task: { type: String, required: true },
    date: { type: Date, required: true }
});
// Create the Todo model
const Todo = mongoose_1.default.model('Todo', todoSchema);
// Add a new to-do reminder
const addTodoReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    const { task, date } = req.body;
    const userId = req.user.userId;
    try {
        const newTodo = new Todo({ userId, task, date });
        yield newTodo.save();
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
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    const userId = req.user.userId;
    try {
        const reminders = yield Todo.find({ userId });
        res.json({ success: true, reminders });
    }
    catch (error) {
        console.error('Error fetching reminders:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch reminders' });
    }
});
exports.getTodoReminders = getTodoReminders;
//# sourceMappingURL=todoController.js.map