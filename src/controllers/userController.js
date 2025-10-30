import * as UserService from "../services/userService.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await UserService.register({ name, email, password, role });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
