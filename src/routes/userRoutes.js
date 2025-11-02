import express from "express";
import { register,signin,sendOtp } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/signin", signin);

router.post("/otp", authMiddleware,sendOtp);
export default router;

