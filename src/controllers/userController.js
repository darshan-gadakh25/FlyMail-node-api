import * as UserService from "../services/userService.js";
import { registerEmailTemplate } from "../templates/registerEmailTemplate.js";
import sendmail from "../utils/sendEmail.js";
import generateToken from "../middleware/auth.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await UserService.register({ name, email, password, role });

    await sendmail(
      user.email,
      "Welcome to Our FlyMail!",
      registerEmailTemplate(name)
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.login(email, password);

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const jwtToken = generateToken(payload);
    console.log("token: ", jwtToken);
    res
      .status(200)
      .json({ message: "Login successful", user, token: jwtToken });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
