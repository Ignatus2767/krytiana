//src/models/courseData
import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    content: { type: String, required: true },
    video: { type: String },
    images: [{ type: String }], // ✅ Store image URLs instead of file paths
    codes: [
        {
            lang: { type: String },
            code: { type: String }
        }
    ]
});

const courseDataSchema = new mongoose.Schema({
    title: { type: String, required: true },
    sections: [sectionSchema]
});

const CourseData = mongoose.model("CourseData", courseDataSchema);
export default CourseData;
