import { Request, Response } from 'express';
import { Course } from '../models/Course'; // Ensure the correct path to your Course model

// Fetch all courses
export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching courses' });
  }
};

// Add a new course
export const addCourse = async (req: Request, res: Response) => {
  const { title, description, details, image, discount, duration, link } = req.body;

  if (!title || !description || !details || !image) {
    return res.status(400).json({ success: false, message: 'All required fields must be provided' });
  }

  try {
    const newCourse = new Course({ title, description, details, image, discount, duration, link });
    await newCourse.save();
    res.json({ success: true, message: 'Course added successfully', course: newCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding course' });
  }
};

// Delete a course
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting course' });
  }
};

// Update a course
export const updateCourse = async (req: Request, res: Response) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating course' });
  }
};
