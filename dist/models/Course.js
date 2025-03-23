"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UnitSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    topics: { type: [String], required: true }
});
const CourseSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    image: { type: String, required: true },
    // Course Details
    lessons: { type: Number, required: true },
    duration: { type: String, required: true },
    exercises: { type: Number, required: true },
    downloads: { type: Number, required: true },
    files: { type: Number, required: true },
    project: { type: String, required: true },
    // Target Audience & Requirements
    outcomes: { type: [String], required: true },
    who: { type: [String], required: true },
    requirements: { type: [String], required: true },
    // Pricing & Offers
    OfferTitle: { type: String, required: true },
    badge: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    saleBadge: { type: String, required: false },
    // Course Units
    units: { type: [UnitSchema], required: true }
});
exports.Course = mongoose_1.default.model('Course', CourseSchema);
//# sourceMappingURL=Course.js.map