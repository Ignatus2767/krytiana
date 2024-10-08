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
exports.coursesDbPool = exports.dashboardDbPool = exports.reviewDbPool = exports.signupDbPool = void 0;
const promise_1 = require("mysql2/promise");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signupDbPool = (0, promise_1.createPool)({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_SIGNUP,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
exports.signupDbPool = signupDbPool;
const reviewDbPool = (0, promise_1.createPool)({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_REVIEW, // Ensure this is the correct DB name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
exports.reviewDbPool = reviewDbPool;
const dashboardDbPool = (0, promise_1.createPool)({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_DASHBOARD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
exports.dashboardDbPool = dashboardDbPool;
const coursesDbPool = (0, promise_1.createPool)({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_COURSES,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
exports.coursesDbPool = coursesDbPool;
// Test database connections
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield signupDbPool.getConnection();
        console.log('Connected to the signup database.');
        connection.release();
        const reviewConnection = yield reviewDbPool.getConnection();
        console.log('Connected to the review database.');
        reviewConnection.release();
        const dashboardConnection = yield dashboardDbPool.getConnection();
        console.log('Connected to the dashboard database.');
        dashboardConnection.release();
        const coursesConnection = yield coursesDbPool.getConnection();
        console.log('Connected to the courses database.');
        coursesConnection.release();
    }
    catch (err) {
        console.error('Error connecting to the database:', err);
    }
});
testConnection();
//# sourceMappingURL=db.js.map