import { Request, Response } from 'express';
import { coursesDbPool } from '../db';

const getCourses = async (req: Request, res: Response) => {
  try {
    const [rows] = await coursesDbPool.query('SELECT * FROM courses');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching courses' });
  }
};

const addCourse = async (req: Request, res: Response) => {
  const { title, description, details, image, discount, duration, link } = req.body;

  if (!title || !description || !details || !image) {
    return res.status(400).json({ success: false, message: 'All required fields must be provided' });
  }

  try {
    const query = `
      INSERT INTO courses (title, description, details, image, discount, duration, link)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [title, description, details, image, discount, duration, link];

    await coursesDbPool.query(query, values);
    res.json({ success: true, message: 'Course added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding course' });
  }
};


export { getCourses, addCourse };
