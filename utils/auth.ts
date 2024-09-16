import { NextApiRequest, NextApiResponse } from "next";
import User from "../models/userModel";
import { hashPassword, verifyPassword } from "./bcryptconfig";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  // Login successful, return a token or session
  res.json({ user: { username: user.username, email: user.email } });
};

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already in use" });
  }
  const hashedPassword = await hashPassword(password);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  // Return a token or session
  res.json({ user: { username: user.username, email: user.email } });
};

export { login, register };
