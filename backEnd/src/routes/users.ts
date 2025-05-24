import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getCurrentUser,
} from "../controllers/userController";
import { authenticateToken, requireAdmin } from "../middleware/auth";

const router = Router();

// Get current user profile
router.get("/me", authenticateToken, getCurrentUser);

// Admin only routes
router.get("/", authenticateToken, requireAdmin, getAllUsers);
router.get("/:id", authenticateToken, requireAdmin, getUserById);
router.put("/:id", authenticateToken, requireAdmin, updateUser);
router.delete("/:id", authenticateToken, requireAdmin, deleteUser);

export default router;
