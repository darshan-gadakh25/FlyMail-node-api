import mongoose from "mongoose";

const mailSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    isDraft: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Index for text search
mailSchema.index({ subject: "text", body: "text" });

export default mongoose.model("Mail", mailSchema);
