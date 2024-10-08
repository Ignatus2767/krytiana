"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes")); // Import the review routes
const coursesRoute_1 = __importDefault(require("./routes/coursesRoute"));
const profileRoute_1 = __importDefault(require("./routes/profileRoute"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware to parse incoming request bodies
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// Serve static files from the "public" directory
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, cors_1.default)());
// Define a route for the root path
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
// Mount user routes under /api/users
app.use('/api/users', userRoutes_1.default);
// Mount review routes under /api/reviews
app.use('/api/reviews', reviewRoutes_1.default); // This mounts your review routes
app.use('/api/user', profileRoute_1.default);
app.use('/api/courses', coursesRoute_1.default);
app.use('/api', todoRoutes_1.default);
// Define other routes as needed
app.get('/example', (req, res) => {
    res.send('This is an example route.');
});
// Handle 404 - Page Not Found
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map