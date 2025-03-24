import pool from "../utils/db"; // Ensure correct DB connection path

interface Product {
  id?: number;
  name: string;
  price: number;
  colors: string[];
  picture: string;
  description?: string;
}

// Fetch all products
export const getProducts = async (): Promise<Product[]> => {
  const { rows } = await pool.query("SELECT * FROM products");
  return rows;
};

// Add a new product
export const addProduct = async (product: Product): Promise<Product> => {
  const { rows } = await pool.query(
    "INSERT INTO products (name, price, colors, picture, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      product.name,
      product.price,
      JSON.stringify(product.colors), // Ensure proper array handling
      product.picture,
      product.description || null,
    ]
  );
  return rows[0];
};

// Delete a product by ID
export const deleteProduct = async (id: number): Promise<void> => {
  await pool.query("DELETE FROM products WHERE id = $1", [id]);
};
