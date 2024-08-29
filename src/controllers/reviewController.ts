//myapp/src/controllers/reviewController.ts
import { Request, Response } from 'express';
import { reviewDbPool } from '../db'; // Ensure the correct pool is imported

export const getReviews = async (req: Request, res: Response) => {
  try {
    const [rows] = await reviewDbPool.query('SELECT * FROM reviews ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching reviews:', error); // Log the error
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};


export const addReview = async (req: Request, res: Response) => {
  const { username, comment, rating } = req.body;
  try {
    await reviewDbPool.query(
      'INSERT INTO reviews (username, comment, rating) VALUES (?, ?, ?)', 
      [username, comment, rating]
    );
    console.log('Review added successfully'); // Log the success message
    res.json({ success: true, message: 'Review added successfully' });
  } catch (error) {
    console.error('Error adding review:', error); // Log the error
    res.status(500).json({ success: false, message: 'Error adding review' });
  }
};
