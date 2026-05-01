// backend/routes/task.routes.js
import express from "express";
import { 
  createTask, 
  getTasks, 
  updateTaskStatus, 
  getTaskStats,
  getUserTasks // <--- ADD THIS LINE TO YOUR IMPORT
} from "../controllers/task.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Order matters! Put "user-tasks" above routes with dynamic params like ":projectId"
router.get("/user-tasks", protect, getUserTasks); 

router.post("/", protect, createTask);
router.get("/stats", protect, getTaskStats);
router.get("/:projectId", protect, getTasks);
router.put("/:taskId", protect, updateTaskStatus);

export default router;