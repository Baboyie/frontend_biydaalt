import express from "express";
import { getProducts, addProduct, deleteProduct } from "../models/Product"; // Ensure correct path

const router = express.Router();

// Fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Add a new product
router.post("/", async (req, res) => {
  try {
    const newProduct = await addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// Delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    await deleteProduct(productId);
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
