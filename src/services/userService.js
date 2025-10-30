import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async ({ name, email, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, role });
  return await user.save();
};
