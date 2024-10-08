"use strict";
// dashboardRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboardController_1 = require("../controllers/dashboardController");
const router = express_1.default.Router();
// Get user dashboard data
router.get("/:userId", dashboardController_1.getUserDashboard);
exports.default = router;
//# sourceMappingURL=dashboardRoutes.js.map