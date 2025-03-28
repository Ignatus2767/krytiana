"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//src/models/courseData
const mongoose_1 = __importDefault(require("mongoose"));
// Code snippets schema
const codeSchema = new mongoose_1.default.Schema({
    lang: { type: String, required: true }, // e.g., "python"
    code: { type: String, required: true } // Code snippet
});
// Section schema (Content inside topics)
const sectionSchema = new mongoose_1.default.Schema({
    heading: { type: String, required: true }, // Section title
    content: { type: String, required: true }, // Section content
    video: { type: String }, // Optional YouTube video URL
    images: [{ type: String }], // Array of image URLs
    codes: [codeSchema] // Code snippets related to this section
});
// Topic Schema (Contains multiple sections)
const topicSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true }, // Topic title (e.g., "Python Basics")
    sections: [sectionSchema] // Sections under this topic
});
// Course Schema (Contains multiple topics)
const courseSchema = new mongoose_1.default.Schema({
    courseTitle: { type: String, required: true, unique: true }, // Course name (e.g., "Data Science")
    topics: [topicSchema] // Array of topics under this course
});
const CourseData = mongoose_1.default.model("CourseData", courseSchema);
exports.default = CourseData;
//# sourceMappingURL=courseData.js.map