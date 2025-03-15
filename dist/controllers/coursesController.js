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
exports.updateCourse = exports.deleteCourse = exports.addCourse = exports.getCourses = void 0;
const Course_1 = require("../models/Course"); // Ensure the correct path to your Course model
// Fetch all courses
const getCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield Course_1.Course.find();
        res.json({ success: true, data: courses });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching courses' });
    }
});
exports.getCourses = getCourses;
// Add a new course
const addCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, details, image, discount, duration, link } = req.body;
    if (!title || !description || !details || !image) {
        return res.status(400).json({ success: false, message: 'All required fields must be provided' });
    }
    try {
        const newCourse = new Course_1.Course({ title, description, details, image, discount, duration, link });
        yield newCourse.save();
        res.json({ success: true, message: 'Course added successfully', course: newCourse });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error adding course' });
    }
});
exports.addCourse = addCourse;
// Delete a course
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCourse = yield Course_1.Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        res.json({ success: true, message: 'Course deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting course' });
    }
});
exports.deleteCourse = deleteCourse;
// Update a course
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCourse = yield Course_1.Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        res.json({ success: true, message: 'Course updated successfully', course: updatedCourse });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error updating course' });
    }
});
exports.updateCourse = updateCourse;
//# sourceMappingURL=coursesController.js.map