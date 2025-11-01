import Mail from "../models/Mail.js";
import User from "../models/User.js";

export const getInbox = async (userId) => {
  const mails = await Mail.find({ receiver: userId, isDraft: false })
    .populate("sender", "name email")
    .populate("receiver", "name email");
  return mails;
};

export const getSent = async (userId) => {
  const mails = await Mail.find({ sender: userId, isDraft: false })
    .populate("sender", "name email")
    .populate("receiver", "name email");
  return mails;
};

export const getDrafts = async (userId) => {
  const mails = await Mail.find({ sender: userId, isDraft: true })
    .populate("sender", "name email")
    .populate("receiver", "name email")
    .sort({ updatedAt: -1 });
  return mails;
};

export const composeMail = async (senderId, receiverInput, subject, body, isDraft = false) => {
  // Support both email and user ID
  let receiver;
  
  // Check if receiverInput is a valid MongoDB ObjectId (24 hex characters)
  if (/^[0-9a-fA-F]{24}$/.test(receiverInput)) {
    receiver = await User.findById(receiverInput);
  } else {
    // Try to find by email
    receiver = await User.findOne({ email: receiverInput });
  }
  
  if (!receiver) {
    throw new Error("Receiver not found");
  }

  const mail = await Mail.create({
    sender: senderId,
    receiver: receiver._id,
    subject,
    body,
    isDraft
  });

  return await Mail.findById(mail._id)
    .populate("sender", "name email")
    .populate("receiver", "name email");
};

export const markAsRead = async (mailId, userId) => {
  const mail = await Mail.findOne({ _id: mailId, receiver: userId });

  if (!mail) {
    throw new Error("Mail not found");
  }

  mail.isRead = true;
  await mail.save();

  return await Mail.findById(mail._id)
    .populate("sender", "name email")
    .populate("receiver", "name email");
};

export const deleteMail = async (mailId, userId) => {
  const mail = await Mail.findById(mailId);

  if (!mail) {
    throw new Error("Mail not found");
  }

  // Check if user is sender or receiver
  if (
    String(mail.sender) !== String(userId) &&
    String(mail.receiver) !== String(userId)
  ) {
    throw new Error("Forbidden: You don't have permission to delete this mail");
  }

  await Mail.deleteOne({ _id: mailId });
};

export const searchMails = async (userId, searchQuery) => {
  console.log(userId);
  console.log(searchQuery);
  console.log(typeof(searchQuery));
  
  
  
  if (!searchQuery || searchQuery.trim() === "") {
    return [];
  }

  const mails = await Mail.find({
    $text: { $search: searchQuery },
    $or: [{ receiver: userId }, { sender: userId }],
  })
    .populate("sender", "name email")
    .populate("receiver", "name email")
    .sort({ createdAt: -1 });

  return mails;
};

export const getMailById = async (mailId, userId) => {
  const mail = await Mail.findById(mailId)
    .populate("sender", "name email")
    .populate("receiver", "name email");

  if (!mail) {
    throw new Error("Mail not found");
  }

  // Check if user is sender or receiver
  if (
    String(mail.sender._id) !== String(userId) &&
    String(mail.receiver._id) !== String(userId)
  ) {
    throw new Error("Forbidden: You don't have permission to view this mail");
  }

  return mail;
};
