import { Request, Response } from "express";
import { getProducts, addProduct, deleteProduct } from "../models/Product";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await addProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

export const removeProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteProduct(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};
