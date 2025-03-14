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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

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

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
