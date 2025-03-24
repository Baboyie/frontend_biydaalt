import express from "express";
import { login, register } from "../controllers/authController";

const router = express.Router();

// Ensure all paths return responses
router.post("/register", (req, res, next) => {
  register(req, res, next).catch(next); // Handle async errors
});

router.post("/login", (req, res, next) => {
  login(req, res, next).catch(next); // Handle async errors
});

export default router;
