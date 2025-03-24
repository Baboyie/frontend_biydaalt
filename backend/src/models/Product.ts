import pool from "../utils/db";

interface Product {
  id?: number;
  name: string;
  price: number;
  colors: string[];
  picture: string;
  description?: string;
}

export const getProducts = async (): Promise<Product[]> => {
  const { rows } = await pool.query("SELECT * FROM products");
  return rows;
};

export const addProduct = async (product: Product): Promise<Product> => {
  const { rows } = await pool.query(
    "INSERT INTO products (name, price, colors, picture, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      product.name,
      product.price,
      product.colors,
      product.picture,
      product.description,
    ]
  );
  return rows[0];
};

export const deleteProduct = async (id: number): Promise<void> => {
  await pool.query("DELETE FROM products WHERE id = $1", [id]);
};
