import express from "express";
import {
  getAllProducts,
  createProduct,
  removeProduct,
} from "../controllers/productController";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.delete("/:id", removeProduct);

export default router;
