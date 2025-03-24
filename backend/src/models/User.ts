import pool from "../utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  is_admin: boolean;
}

const JWT_SECRET = process.env.JWT_SECRET || "your_strong_secret_here";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE email ILIKE $1",
    [email.toLowerCase()]
  );
  return rows[0] || null;
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  isAdmin = false
): Promise<User> => {
  const passwordHash = await bcrypt.hash(password, 10);
  const { rows } = await pool.query(
    `INSERT INTO users (name, email, password_hash, is_admin)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, is_admin`,
    [name, email.toLowerCase(), passwordHash, isAdmin]
  );
  return rows[0];
};

export const generateToken = (user: User): string => {
  return jwt.sign({ userId: user.id, isAdmin: user.is_admin }, JWT_SECRET, {
    expiresIn: "1h",
  });
};
