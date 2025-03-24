import { Request, Response, NextFunction } from "express";
import { findUserByEmail, createUser, generateToken } from "../models/User";
import bcrypt from "bcrypt";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" }); // Explicit return
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" }); // Explicit return
    }

    const user = await createUser(name, email, password);
    const token = generateToken(user);

    return res.status(201).json({
      // Explicit return
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.is_admin,
      },
    });
  } catch (error) {
    next(error); // Pass to error handler
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" }); // Explicit return
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" }); // Explicit return
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" }); // Explicit return
    }

    const token = generateToken(user);

    return res.json({
      // Explicit return
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.is_admin,
      },
    });
  } catch (error) {
    next(error); // Pass to error handler
  }
};
