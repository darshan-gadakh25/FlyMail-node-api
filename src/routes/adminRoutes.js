import express from "express";
import { authMiddleware, requireRole } from "../middleware/auth.js";
import {
  listUsers,
  toggleActive,
  viewUserMail,
  deleteUser
} from "../controllers/adminController.js";

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authMiddleware);

router.use(requireRole("admin"));

// GET /api/admin/users 
router.get("/users", listUsers);

// PATCH /api/admin/users/:id/toggle-active
router.patch("/users/:id/toggle-active", toggleActive);

// GET /api/admin/users/:id/mail 

router.get("/users/:id/mail", viewUserMail); 

// DELETE /api/admin/user/:id 
router.delete("/user/:id", deleteUser);


export default router;

