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
exports.insertCourseData = void 0;
const courseData_1 = __importDefault(require("../models/courseData")); // Assuming CourseData is your MongoDB model
const insertCourseData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, sections } = req.body;
        // Validate request
        if (!title || !sections || !sections.length) {
            return res.status(400).json({ message: "Title and sections are required." });
        }
        // Create a new course entry
        const newCourse = new courseData_1.default({
            title,
            sections, // ✅ Contains images as URLs now
        });
        // Save to database
        yield newCourse.save();
        res.status(201).json({ message: "Course added successfully!", course: newCourse });
    }
    catch (error) {
        console.error("Error saving course:", error);
        res.status(500).json({ message: "Error adding course", error });
    }
});
exports.insertCourseData = insertCourseData;
//# sourceMappingURL=courseDataController.js.map