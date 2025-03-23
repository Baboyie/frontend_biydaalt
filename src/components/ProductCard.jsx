import React, { useState } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";

const ProductCard = ({ product, addToCart }) => {
  const [size, setSize] = useState(1); // Default size (quantity) is 1
  const [selectedColor, setSelectedColor] = useState(product.colors[0]); // Set first color as default
  const [open, setOpen] = useState(false); // Modal state

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const increaseSize = () => setSize(size + 1);
  const decreaseSize = () => setSize(size > 1 ? size - 1 : 1);

  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        padding: 2,
        textAlign: "center",
        maxWidth: 300,
        margin: "auto",
        backgroundColor: "#ffffff",
      }}
    >
      <img
        src={product.picture}
        alt={product.name}
        style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 8, cursor: "pointer" }}
        onClick={handleOpen} // Open modal on image click
      />
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        {product.name}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
        ${product.price}
      </Typography>

      {/* Color Selection */}
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Select Color:
        </Typography>
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center", marginTop: 1 }}>
          {product.colors.map((color, index) => (
            <Box
              key={index}
              onClick={() => setSelectedColor(color)}
              sx={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                backgroundColor: color,
                border: selectedColor === color ? "2px solid black" : "2px solid transparent",
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Quantity Control */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
        <Button
          variant="outlined"
          onClick={decreaseSize}
          sx={{ minWidth: 30, minHeight: 30 }}
        >
          -
        </Button>
        <Typography sx={{ mx: 2 }}>{size}</Typography>
        <Button
          variant="outlined"
          onClick={increaseSize}
          sx={{ minWidth: 30, minHeight: 30 }}
        >
          +
        </Button>
      </Box>

      {/* Add to Cart Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
        onClick={() => addToCart({ ...product, selectedColor, quantity: size })}
      >
        ADD TO CART
      </Button>

      {/* Product Detail Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            {product.name}
          </Typography>
          <img
            src={product.picture}
            alt={product.name}
            style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 8, marginTop: 2 }}
          />
          <Typography sx={{ mt: 2 }}>Price: ${product.price}</Typography>
          <Typography sx={{ mt: 2 }}>Colors: {product.colors.join(", ")}</Typography>
          <Typography sx={{ mt: 2 }}>Description: {product.description}</Typography> {/* Display description */}
          <Button onClick={handleClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductCard;