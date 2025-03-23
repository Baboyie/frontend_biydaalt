import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const ProductCard = ({ product, addToCart }) => {

  const [size, setSize] = useState(1); // Default size (quantity) is 1
  const [selectedColor, setSelectedColor] = useState(product.colors[0]); // Set first color as default
 // Debugging: Check selected color

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
        backgroundColor: "antiquewhite",
      }}
    >
      <img
        src={product.picture}
        alt={product.name}
        style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 8 }}
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
    </Box>
  );
};

export default ProductCard;