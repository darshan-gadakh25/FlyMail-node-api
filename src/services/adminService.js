import User from "../models/User.js";
import Mail from "../models/Mail.js";

export const getAllUsers = async () => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  return users;
};

export const toggleUserStatus = async (userId, adminId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Prevent deactivating self
  if (String(user._id) === String(adminId)) {
    throw new Error("Cannot change your own status");
  }

  user.status = user.status === "active" ? "inactive" : "active";
  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };
};

export const getUserMails = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const inbox = await Mail.find({ receiver: userId })
    .populate("sender", "name email")
    .populate("receiver", "name email")
    .sort({ createdAt: -1 });

  const sent = await Mail.find({ sender: userId })
    .populate("sender", "name email")
    .populate("receiver", "name email")
    .sort({ createdAt: -1 });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
    inbox: {
      count: inbox.length,
      mails: inbox,
    },
    sent: {
      count: sent.length,
      mails: sent,
    },
  };
};

export const deleteUserById = async (userId, adminId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Prevent deleting self
  if (String(user._id) === String(adminId)) {
    throw new Error("Cannot delete your own account");
  }

  // Delete all mails associated with this user (as sender and receiver)
  await Mail.deleteMany({
    $or: [{ sender: userId }, { receiver: userId }],
  });

  // Delete the user
  await User.deleteOne({ _id: userId });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};
