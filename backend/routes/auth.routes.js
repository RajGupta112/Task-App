import express from "express";
import { signup, login, getAllUsers } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js"; 

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Admin needs this list to fill the "Assign Member" dropdown
router.get("/users", protect, getAllUsers);

export default router;