import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import { signToken } from "../utils/jwt.js";

export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    throw new Error("Email already used");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "customer",
  });

  const token = signToken({ id: user.id, role: user.role });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({ id: user.id, role: user.role });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
