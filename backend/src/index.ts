import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes"; // Import the auth routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes); // Mount auth routes

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
);

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
