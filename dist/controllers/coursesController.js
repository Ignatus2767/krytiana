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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCourse = exports.getCourses = void 0;
const db_1 = require("../db");
const getCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.coursesDbPool.query('SELECT * FROM courses');
        res.json({ success: true, data: rows });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching courses' });
    }
});
exports.getCourses = getCourses;
const addCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, details, image, discount, duration, link } = req.body;
    if (!title || !description || !details || !image) {
        return res.status(400).json({ success: false, message: 'All required fields must be provided' });
    }
    try {
        const query = `
      INSERT INTO courses (title, description, details, image, discount, duration, link)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
        const values = [title, description, details, image, discount, duration, link];
        yield db_1.coursesDbPool.query(query, values);
        res.json({ success: true, message: 'Course added successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error adding course' });
    }
});
exports.addCourse = addCourse;
//# sourceMappingURL=coursesController.js.map