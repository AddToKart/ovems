import { Router } from "express";
import authRoutes from "./auth";
import userRoutes from "./users";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

// Health check route
router.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

export default router;
