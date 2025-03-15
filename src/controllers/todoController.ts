import { Request, Response } from 'express';
import mongoose from 'mongoose';

// Define the Todo schema
const todoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    task: { type: String, required: true },
    date: { type: Date, required: true }
});

// Create the Todo model
const Todo = mongoose.model('Todo', todoSchema);

// Add a new to-do reminder
export const addTodoReminder = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    const { task, date } = req.body;
    const userId = req.user.userId;

    try {
        const newTodo = new Todo({ userId, task, date });
        await newTodo.save();
        res.status(201).json({ success: true, message: 'Reminder added successfully' });
    } catch (error) {
        console.error('Error adding reminder:', error);
        res.status(500).json({ success: false, message: 'Failed to add reminder' });
    }
};

// Get user's to-do reminders
export const getTodoReminders = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    const userId = req.user.userId;

    try {
        const reminders = await Todo.find({ userId });
        res.json({ success: true, reminders });
    } catch (error) {
        console.error('Error fetching reminders:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch reminders' });
    }
};
