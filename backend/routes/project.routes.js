
import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { requireProjectRole } from "../middleware/rbac.middleware.js";
import {
  createProject,
  getProjects,
  addMember,
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getProjects);

router.post(
  "/:projectId/members",
  protect,
  requireProjectRole(["ADMIN"]),
  addMember
);

export default router;