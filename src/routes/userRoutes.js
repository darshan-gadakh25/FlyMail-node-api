import express from "express";
import { register,signin,sendOtp, resetPassword } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/signin", signin);

router.post("/otp", authMiddleware,sendOtp);

router.put("/reset-password", authMiddleware, resetPassword);

export default router;

