import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async ({ name, email, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, role });
  return await user.save();
};

// login with generate token
export const login = async (email, password) => {
  const normalizedEmail = String(email).trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(String(password), user.password);
  if (!isMatch) throw new Error("Incorrect credentials");
  if (user.status && user.status !== "active")
    throw new Error("Account is inactive");

  return user;
};

export const findUser = async (email) => {
  const normalizedEmail = String(email).trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });
    
  if (!user) throw new Error("User not found");

 return user;
};


export const updateUserPassword = async (email, newPassword) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("user not found");

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return user;
};