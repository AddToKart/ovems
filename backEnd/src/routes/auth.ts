import { Router } from "express";
import { register, login } from "../controllers/authController";
import {
  validateRequest,
  userRegistrationSchema,
  userLoginSchema,
} from "../middleware/validation";

const router = Router();

router.post("/register", validateRequest(userRegistrationSchema), register);
router.post("/login", validateRequest(userLoginSchema), login);

export default router;
