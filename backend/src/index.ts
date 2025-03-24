import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes"; // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
