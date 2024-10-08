// src/controllers/profileController.ts
import { Request, Response } from 'express';
import { signupDbPool } from '../db'; // Import the signup database pool

// Define the interfaces for User and Course
interface User {
  fullname: string;
  username: string;
  email: string;
}

interface Course {
  title: string;
  progress: number;
  last_active: Date; // Adjust the type based on your database structure
}

export const getProfile = async (req: Request, res: Response) => {
  const userId = req.user?.userId; // Get the userId from the token

  console.log('User ID from token:', userId);

  if (!userId) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  try {
    // Query the database to get the user by ID
    const [userRows] = await signupDbPool.query(
      'SELECT fullname, username, email FROM users WHERE id = ?',
      [userId]
    ) as [User[], any]; // Cast the result as [User[], any]

    const user = userRows[0]; // Now TypeScript knows this is of type User

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Fetch course progress
    const [courseRows] = await signupDbPool.query(
      'SELECT c.title, uc.progress, uc.last_active FROM user_courses uc JOIN courses c ON uc.course_id = c.id WHERE uc.user_id = ?',
      [userId]
    ) as [Course[], any]; // Cast the result as [Course[], any]

    const inProgressCount = courseRows.length; // Number of courses in progress
    const completedCount = courseRows.filter(course => course.progress === 100).length; // Number of completed courses
    const completionPercentage = (courseRows.reduce((acc, course) => acc + course.progress, 0) / (inProgressCount || 1)).toFixed(2); // Average progress percentage

    // Respond with user details and course statistics
    res.json({
      success: true,
      message: 'Welcome to your profile',
      user: {
        fullname: user.fullname,
        username: user.username,
        email: user.email,
      },
      statistics: {
        coursesInProgress: inProgressCount,
        coursesCompleted: completedCount,
        courseCompletionPercentage: `${completionPercentage}%`,
      },
      courses: courseRows, // Include course data if needed
    });
  } catch (error) {
    console.error('Error fetching user or courses:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
