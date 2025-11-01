import * as MailService from "../services/mailService.js";
import {sendmailWithsender} from "../utils/sendEmail.js";

// GET /api/mail/inbox
export const getInbox = async (req, res) => {
  try {
    const mails = await MailService.getInbox(req.user._id);
    res.status(200).json({ count: mails.length, mails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET /api/mail/sent
export const getSent = async (req, res) => {
  try {
    const mails = await MailService.getSent(req.user._id);
    res.status(200).json({ count: mails.length, mails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET /api/mail/drafts
 
export const getDrafts = async (req, res) => {
  try {
    const mails = await MailService.getDrafts(req.user._id);
    res.status(200).json({ count: mails.length, mails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/mail/compose
// Request body: { toEmail: "email@example.com" OR receiver: "userId", subject: "...", body: "...", isDraft: false }

// export const compose = async (req, res) => {
//   try {
//     const { toEmail, receiver, subject, body, isDraft } = req.body;
    
//     // Support both 'toEmail' and 'receiver' fields
//     const receiverInput = toEmail || receiver;
    
//     if (!receiverInput) {
//       return res.status(400).json({ error: "Receiver email or ID is required (use 'toEmail' or 'receiver' field)" });
//     }
    
//     if (!subject || !body) {
//       return res.status(400).json({ error: "Subject and body are required" });
//     }
    
//     const mail = await MailService.composeMail(
//       req.user._id,
//       receiverInput,
//       subject,
//       body,
//       isDraft || false
//     );

//     await sendmail(
//       user.email,
//       "Welcome to Our FlyMail!",
//       registerEmailTemplate(name)
//     );
//     res.status(201).json({ 
//       message: isDraft ? "Draft saved successfully" : "Mail sent successfully",
//       mail 
//     });
//   } catch (error) {
//     if (error.message === "Receiver not found") {
//       return res.status(404).json({ error: error.message });
//     }
//     res.status(400).json({ error: error.message });
//   }
// };

export const compose = async (req, res) => {
  try {
    const { toEmail, receiver, subject, body, isDraft } = req.body;

    // Support both 'toEmail' and 'receiver' fields
    const receiverInput = toEmail || receiver;

    if (!receiverInput) {
      return res
        .status(400)
        .json({ error: "Receiver email or ID is required (use 'toEmail' or 'receiver')" });
    }

    if (!subject || !body) {
      return res.status(400).json({ error: "Subject and body are required" });
    }

    // Save to DB (composeMail likely saves mail to drafts/sent)
    const mail = await MailService.composeMail(
      req.user._id,
      receiverInput,
      subject,
      body,
      isDraft || false
    );

    // Only send actual email if it's not a draft
    if (!isDraft) {
      await sendmailWithsender(req.user.email , receiverInput, subject, body);
    }

    res.status(201).json({
      message: isDraft ? "Draft saved successfully" : "Mail sent successfully",
      mail,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    if (error.message === "Receiver not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};


// GET /api/mail/:id
export const getMailById = async (req, res) => {
  try {
    const { id } = req.params;
    const mail = await MailService.getMailById(id, req.user._id);
    res.status(200).json(mail);
  } catch (error) {
    if (error.message === "Mail not found" || error.message.includes("Forbidden")) {
      return res.status(error.message.includes("Forbidden") ? 403 : 404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

// PATCH /api/mail/:id/read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const mail = await MailService.markAsRead(id, req.user._id);
    res.status(200).json({ message: "Mail marked as read", mail });
  } catch (error) {
    if (error.message === "Mail not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

//  DELETE /api/mail/:id
export const deleteMail = async (req, res) => {
  try {
    const { id } = req.params;
    await MailService.deleteMail(id, req.user._id);
    res.status(200).json({ message: "Mail deleted successfully" });
  } catch (error) {
    if (error.message === "Mail not found") {
      return res.status(404).json({ error: error.message });
    }
    if (error.message.includes("Forbidden")) {
      return res.status(403).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

// GET /api/mail/search?q=searchQuery
 
export const searchMails = async (req, res) => {
  try {
    const { q } = req.query;
    const mails = await MailService.searchMails(req.user._id, q || "");
    res.status(200).json({ count: mails.length, mails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

