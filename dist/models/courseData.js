"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//src/models/courseData
const mongoose_1 = __importDefault(require("mongoose"));
const sectionSchema = new mongoose_1.default.Schema({
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
const courseDataSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    sections: [sectionSchema]
});
const CourseData = mongoose_1.default.model("CourseData", courseDataSchema);
exports.default = CourseData;
//# sourceMappingURL=courseData.js.map