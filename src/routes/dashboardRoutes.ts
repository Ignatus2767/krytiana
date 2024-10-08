// dashboardRoutes.ts

import express from "express";
import { getUserDashboard } from "../controllers/dashboardController";

const router = express.Router();

// Get user dashboard data
router.get("/:userId", getUserDashboard);

export default router;
