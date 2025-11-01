import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  getInbox,
  getSent,
  getDrafts,
  compose,
  getMailById,
  markAsRead,
  deleteMail,
  searchMails
} from "../controllers/mailController.js";

const router = express.Router();


router.use(authMiddleware);

// GET /api/mail/
router.get("/", getInbox);

// GET /api/mail/sent 
router.get("/sent", getSent);

// GET /api/mail/drafts 
router.get("/drafts", getDrafts);

// GET /api/mail/search?q=query -
router.get("/search", searchMails);

// GET /api/mail/:id 
router.get("/:id", getMailById);

// POST /api/mail/compose 
router.post("/compose", compose);

// PATCH /api/mail/:id/read 
router.patch("/:id/read", markAsRead);

// DELETE /api/mail/:id 
router.delete("/:id", deleteMail);

export default router;

