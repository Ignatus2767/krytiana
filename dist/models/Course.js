"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CourseSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    image: { type: String, required: true },
    discount: { type: Number, default: 0 },
    duration: { type: String, required: false },
    link: { type: String, required: false }
});
exports.Course = mongoose_1.default.model('Course', CourseSchema);
//# sourceMappingURL=Course.js.map