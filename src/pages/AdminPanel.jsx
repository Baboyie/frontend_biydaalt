import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function AdminPanel() {
  const [productList, setProductList] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    colors: "",
    picture: "",
    description: "",
  });

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const products = await response.json();
        setProductList(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price && newProduct.picture) {
      const product = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        colors: newProduct.colors.split(",").map((color) => color.trim()),
      };

      try {
        const response = await fetch("http://localhost:5000/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        if (!response.ok) {
          throw new Error("Failed to add product");
        }

        const addedProduct = await response.json();
        setProductList((prev) => [...prev, addedProduct]);

        // Clear the input fields
        setNewProduct({
          name: "",
          price: "",
          colors: "",
          picture: "",
          description: "",
        });
      } catch (error) {
        console.error("Failed to add product:", error);
      }
    }
  };

  const handleRemoveProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProductList((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>

      {/* Add Product Form */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6">Add New Product</Typography>
        <TextField
          fullWidth
          label="Product Name"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={newProduct.price}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Colors (comma-separated)"
          name="colors"
          value={newProduct.colors}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Image URL"
          name="picture"
          value={newProduct.picture}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Box>

      {/* Product List */}
      <Typography variant="h6">Product List</Typography>
      <List>
        {productList.map((product) => (
          <ListItem
            key={product.id}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleRemoveProduct(product.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={product.name}
              secondary={`$${product.price} | Colors: ${product.colors.join(", ")}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default AdminPanel;
