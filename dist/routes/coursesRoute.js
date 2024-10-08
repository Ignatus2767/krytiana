"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/coursesRoute.ts
const express_1 = __importDefault(require("express"));
const coursesController_1 = require("../controllers/coursesController");
const router = express_1.default.Router();
// Route to fetch all courses
router.get('/', coursesController_1.getCourses);
// Route to add a new course
router.post('/add', coursesController_1.addCourse);
exports.default = router;
//# sourceMappingURL=coursesRoute.js.map