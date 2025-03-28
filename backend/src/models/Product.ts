import pool from "../utils/db"; // Ensure correct DB connection path

interface Product {
  id?: number;
  name: string;
  price: number;
  colors: string[]; // colors should be an array of strings
  picture: string;
  description?: string;
}

// Fetch all products
export const getProducts = async (): Promise<Product[]> => {
  const { rows } = await pool.query("SELECT * FROM products");
  return rows.map((row) => ({
    ...row,
    colors: row.colors || [], // Ensure colors is always an array, even if empty
  }));
};

// Fetch a product by ID
export const getProductById = async (id: number): Promise<Product | null> => {
  const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [
    id,
  ]);
  if (rows.length === 0) return null;

  return {
    ...rows[0],
    colors: rows[0].colors || [], // Ensure colors is always an array
  };
};

// Add a new product
export const addProduct = async (product: Product): Promise<Product> => {
  const { rows } = await pool.query(
    "INSERT INTO products (name, price, colors, picture, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      product.name,
      product.price,
      product.colors, // Store the array directly
      product.picture,
      product.description ?? null,
    ]
  );

  return {
    ...rows[0],
    colors: rows[0].colors || [], // Ensure colors is always an array
  };
};

// Update a product by ID
export const updateProduct = async (
  id: number,
  product: Partial<Product>
): Promise<Product | null> => {
  const { name, price, colors, picture, description } = product;

  const { rows } = await pool.query(
    `UPDATE products 
     SET name = COALESCE($1, name),
         price = COALESCE($2, price),
         colors = COALESCE($3, colors),
         picture = COALESCE($4, picture),
         description = COALESCE($5, description),
         updated_at = NOW()
     WHERE id = $6 RETURNING *`,
    [
      name ?? null,
      price ?? null,
      colors ?? null, // Pass the array directly
      picture ?? null,
      description ?? null,
      id,
    ]
  );

  if (rows.length === 0) return null;

  return {
    ...rows[0],
    colors: rows[0].colors || [], // Ensure colors is always an array
  };
};

// Delete a product by ID
export const deleteProduct = async (id: number): Promise<void> => {
  await pool.query("DELETE FROM products WHERE id = $1", [id]);
};
