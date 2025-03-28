//src/models/courseData
import mongoose from "mongoose";

// Code snippets schema
const codeSchema = new mongoose.Schema({
    lang: { type: String, required: true }, // e.g., "python"
    code: { type: String, required: true } // Code snippet
});

// Section schema (Content inside topics)
const sectionSchema = new mongoose.Schema({
    heading: { type: String, required: true }, // Section title
    content: { type: String, required: true }, // Section content
    video: { type: String }, // Optional YouTube video URL
    images: [{ type: String }], // Array of image URLs
    codes: [codeSchema] // Code snippets related to this section
});

// Topic Schema (Contains multiple sections)
const topicSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Topic title (e.g., "Python Basics")
    sections: [sectionSchema] // Sections under this topic
});

// Course Schema (Contains multiple topics)
const courseSchema = new mongoose.Schema({
    courseTitle: { type: String, required: true, unique: true }, // Course name (e.g., "Data Science")
    topics: [topicSchema] // Array of topics under this course
});

const CourseData = mongoose.model("CourseData", courseSchema);
export default CourseData;
