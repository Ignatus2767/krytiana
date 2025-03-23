"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const coursesController_js_1 = require("../controllers/coursesController.js");
const router = express_1.default.Router();
// Fetch all courses
router.get("/", coursesController_js_1.getCourses);
// Fetch a single course by ID
router.get("/:id", coursesController_js_1.getCourseById);
// Add a new course
router.post("/add", coursesController_js_1.addCourse);
// Delete a course
router.delete("/:id", coursesController_js_1.deleteCourse);
// Edit a course
router.put("/:id", coursesController_js_1.updateCourse);
exports.default = router;
//# sourceMappingURL=coursesRoute.js.map