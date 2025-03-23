import React, { useState } from "react";
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function AdminPanel({ productList, setProductList }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    colors: "",
    picture: "",
    description: "", // Add description field
    rating: "", // Add rating field
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.picture) {
      const product = {
        id: productList.length + 1, // Generate a unique ID
        ...newProduct,
        price: parseFloat(newProduct.price),
        colors: newProduct.colors.split(",").map((color) => color.trim()), // Convert comma-separated string to array
        rating: parseFloat(newProduct.rating), // Convert rating to a number
      };
      setProductList((prev) => [...prev, product]); // Add new product to the list
      setNewProduct({
        name: "",
        price: "",
        colors: "",
        picture: "",
        description: "", // Reset description field
        rating: "", // Reset rating field
      }); // Reset form
    }
  };

  const handleRemoveProduct = (id) => {
    setProductList((prev) => prev.filter((product) => product.id !== id)); // Remove product by ID
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