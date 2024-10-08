import { Request, Response } from 'express';
import { signupDbPool } from '../db'; // Adjust the import as per your db setup

// Add a new to-do reminder
export const addTodoReminder = async (req: Request, res: Response) => {
    const { task, date } = req.body; // Extract data from request body
    if (!req.user) {
        console.log('Unauthorized access attempt');
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    const userId = req.user.userId; // Get user ID from token (make sure this matches the key in your token)

    console.log('Adding reminder:', { userId, task, date });

    try {
        const result = await signupDbPool.query(
            'INSERT INTO study_reminders (user_id, task, date) VALUES (?, ?, ?)',
            [userId, task, date]
        );
        console.log('Reminder added successfully:', result);
        res.status(201).json({ success: true, message: 'Reminder added successfully' });
    } catch (error) {
        console.error('Error adding reminder:', error);
        res.status(500).json({ success: false, message: 'Failed to add reminder' });
    }
};

// Get user's to-do reminders
export const getTodoReminders = async (req: Request, res: Response) => {
    if (!req.user) {
        console.log('Unauthorized access attempt');
        return res.status(401).json({ message: 'Unauthorized access' });
    }   
    const userId = req.user.userId; // Get user ID from token (make sure this matches the key in your token)

    console.log('Fetching reminders for user ID:', userId);

    try {
        const [reminders] = await signupDbPool.query(
            'SELECT * FROM study_reminders WHERE user_id = ?',
            [userId]
        );
        console.log('Fetched reminders:', reminders);
        res.json({ success: true, reminders });
    } catch (error) {
        console.error('Error fetching reminders:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch reminders' });
    }
};
