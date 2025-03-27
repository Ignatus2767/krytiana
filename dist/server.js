"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//src/server.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongo_1 = require("./config/mongo"); // Import MongoDB connection
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const coursesRoute_1 = __importDefault(require("./routes/coursesRoute"));
const profileRoute_1 = __importDefault(require("./routes/profileRoute"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes")); // Import authentication routes
const courseDataRoutes_1 = __importDefault(require("./routes/courseDataRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Connect to MongoDB
(0, mongo_1.connectDB)();
// Middleware
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Serve static files
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Routes
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "public", "index.html"));
});
app.use("/api/users", userRoutes_1.default);
app.use("/api/reviews", reviewRoutes_1.default);
app.use("/api/user", profileRoute_1.default);
app.use("/api/courses", coursesRoute_1.default);
app.use("/api", todoRoutes_1.default);
app.use("/api/auth", authRoutes_1.default); // Add authentication routes
app.use("/api/coursedata", courseDataRoutes_1.default);
app.use("/api/courses", courseDataRoutes_1.default);
app.get("/reset-password/:token", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "public", "reset-password.html"));
});
// Handle 404 errors (keep this last)
app.use((req, res) => {
    res.status(404).send("Page not found");
});
// Handle 404 errors
app.use((req, res) => {
    res.status(404).send("Page not found");
});
// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map