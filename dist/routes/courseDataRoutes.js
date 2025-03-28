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
// src/routes/courseDataRoutes.ts
const express_1 = __importDefault(require("express"));
const courseDataController_1 = require("../controllers/courseDataController");
const courseData_1 = __importDefault(require("../models/courseData"));
const router = express_1.default.Router();
router.post("/save-course", courseDataController_1.insertCourseData);
router.get("/:courseTitle", courseDataController_1.getCourseByTitle);
// ✅ New Route: Fetch All Available Course Categories
router.get("/categories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield courseData_1.default.find({}, "courseTitle"); // ✅ Fetch only course titles
        if (!courses.length) {
            return res.status(200).json([]); // ✅ Always return an array
        }
        res.json(courses.map(course => course.courseTitle)); // ✅ Return only course titles
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching courses", error });
    }
}));
exports.default = router;
//# sourceMappingURL=courseDataRoutes.js.map