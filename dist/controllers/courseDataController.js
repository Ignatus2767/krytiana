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
exports.getCourseByTitle = exports.insertCourseData = void 0;
const courseData_1 = __importDefault(require("../models/courseData")); // MongoDB model
// Insert or update course data
const insertCourseData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseTitle, topics } = req.body;
        // ✅ Validate request
        if (!courseTitle || !topics || !topics.length) {
            return res.status(400).json({ message: "Course title and topics are required." });
        }
        // ✅ Find if the course exists
        let existingCourse = yield courseData_1.default.findOne({ courseTitle });
        if (existingCourse) {
            // ✅ Check if any topics already exist
            const existingTitles = existingCourse.topics.map((topic) => topic.title);
            const duplicateTopics = topics.filter((topic) => existingTitles.includes(topic.title));
            if (duplicateTopics.length) {
                return res.status(400).json({ message: "Some topics already exist in this course." });
            }
            // ✅ Add new topics to existing course
            existingCourse.topics.push(...topics);
            yield existingCourse.save();
            return res.status(200).json({ message: "New topics added to course!", course: existingCourse });
        }
        else {
            // ✅ Create new course
            const newCourse = new courseData_1.default({ courseTitle, topics });
            yield newCourse.save();
            return res.status(201).json({ message: "New course added!", course: newCourse });
        }
    }
    catch (error) {
        console.error("Error saving course:", error);
        res.status(500).json({ message: "Error adding course", error });
    }
});
exports.insertCourseData = insertCourseData;
const getCourseByTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseTitle = decodeURIComponent(req.params.courseTitle).trim();
        // Fetch all course titles to debug what's in the database
        const allCourses = yield courseData_1.default.find({}, "courseTitle");
        // 🔍 Debugging: Check if courseTitle exists in DB exactly
        const exists = allCourses.some(c => c.courseTitle.toLowerCase() === courseTitle.toLowerCase());
        // Try to find the course (case-insensitive search)
        const course = yield courseData_1.default.findOne({ courseTitle: new RegExp(`^${courseTitle}$`, "i") });
        if (!course) {
            console.log("❌ Course not found:", courseTitle);
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        res.json(course);
    }
    catch (error) {
        console.error("⚠️ Error fetching course:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
});
exports.getCourseByTitle = getCourseByTitle;
// Get all courses formatted properly
//# sourceMappingURL=courseDataController.js.map