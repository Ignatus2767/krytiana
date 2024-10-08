"use strict";
// myapp/src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const coursesRoute_1 = __importDefault(require("./routes/coursesRoute"));
const profileRoute_1 = __importDefault(require("./routes/profileRoute"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Middleware setup
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
// Serve static files from the "public" directory
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.use((0, cors_1.default)());
// Routes
app.use('/api/users', userRoutes_1.default);
app.use('/api/reviews', reviewRoutes_1.default);
app.use('/api/courses', coursesRoute_1.default);
app.use('/api/user', profileRoute_1.default);
app.use('/api', todoRoutes_1.default);
app.get('/', (req, res) => {
    res.render('index');
});
exports.default = app;
//# sourceMappingURL=app.js.map