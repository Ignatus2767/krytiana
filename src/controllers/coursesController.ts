import { Request, Response } from 'express';
import { Course } from '../models/Course';
import mongoose from 'mongoose';

// Fetch all courses
export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    
    // Add dynamic link based on MongoDB _id
    const updatedCourses = courses.map(course => ({
      ...course.toObject(),
      link: `/preview/?id=${course._id}`
    }));

    res.json({ success: true, data: updatedCourses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching courses' });
  }
};


export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid course ID format" });
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.json({
      success: true,
      data: {
        ...course.toObject(),
        link: `/preview/?id=${course._id}` // Auto-generate course link
      }
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ success: false, message: "Error fetching course" });
  }
};


// Add a new course
export const addCourse = async (req: Request, res: Response) => {
  const {
    title, description, details, image, lessons, duration, exercises, downloads, files, project,
    outcomes, who, requirements, OfferTitle, badge, price, discount, saleBadge, units
  } = req.body;

  if (!title || !description || !details || !image || !lessons || !duration || !exercises || !downloads ||
      !files || !project || !outcomes || !who || !requirements || !OfferTitle || !badge || !price || !units) {
    return res.status(400).json({ success: false, message: 'All required fields must be provided' });
  }

  try {
    const newCourse = new Course({
      title, description, details, image, lessons, duration, exercises, downloads, files, project,
      outcomes, who, requirements, OfferTitle, badge, price, discount, saleBadge, units
    });
    console.log("Received units:", units);

    await newCourse.save();
    res.json({ success: true, message: 'Course added successfully', course: newCourse });
    console.log("Course data being sent:", newCourse);

  } catch (error) {
    console.error("Error adding course:", error);
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
