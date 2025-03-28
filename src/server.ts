//src/server.ts
import express from "express";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./config/mongo"; // Import MongoDB connection
import userRoutes from "./routes/userRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import coursesRoutes from "./routes/coursesRoute";
import profileRoute from "./routes/profileRoute";
import todoRoutes from "./routes/todoRoutes";
import authRoutes from "./routes/authRoutes"; // Import authentication routes
import courseDataRoutes from "./routes/courseDataRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); 

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/user", profileRoute);
app.use("/api/courses", coursesRoutes);
app.use("/api", todoRoutes);
app.use("/api/auth", authRoutes); // Add authentication routes
app.use("/api/coursedata", courseDataRoutes);


app.get("/reset-password/:token", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "reset-password.html"));
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

export default app;
