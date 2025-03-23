import React, { useState } from "react";
import { Box, Button, Typography, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProductCard = ({ product, addToCart }) => {
  const [size, setSize] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        borderRadius: 3,
        padding: 2,
        textAlign: "center",
        maxWidth: 280,
        bgcolor: "white",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.08)",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0px 6px 15px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* Product Image */}
      <Box
        component="img"
        src={product.picture}
        alt={product.name}
        sx={{
          width: "100%",
          height: 180,
          objectFit: "cover",
          borderRadius: 2,
          cursor: "pointer",
        }}
        onClick={handleOpen}
      />

      {/* Product Info */}
      <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
        {product.name}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        ${product.price}
      </Typography>

      {/* Color Selection */}
      <Box sx={{ mt: 1, display: "flex", justifyContent: "center", gap: 1 }}>
        {product.colors.map((color, index) => (
          <Box
            key={index}
            sx={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: color,
              border:
                selectedColor === color
                  ? "2px solid black"
                  : "2px solid transparent",
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": { opacity: 0.8 },
            }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </Box>

      {/* Quantity Control */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setSize(size > 1 ? size - 1 : 1)}
          sx={{
            minWidth: 28,
            minHeight: 28,
            borderRadius: "50%",
            fontSize: 16,
            padding: 0,
          }}
        >
          -
        </Button>
        <Typography sx={{ mx: 1, fontSize: 16 }}>{size}</Typography>
        <Button
          variant="outlined"
          onClick={() => setSize(size + 1)}
          sx={{
            minWidth: 28,
            minHeight: 28,
            borderRadius: "50%",
            fontSize: 16,
            padding: 0,
          }}
        >
          +
        </Button>
      </Box>

      {/* Add to Cart Button */}
      <Button
        variant="contained"
        sx={{
          mt: 2,
          borderRadius: 30,
          padding: "10px 20px",
          fontWeight: "bold",
          backgroundColor: "#5533ff", // New color added here
          "&:hover": {
            backgroundColor: "#441db8", // Darker hover effect
          },
        }}
        onClick={() => addToCart({ ...product, selectedColor, quantity: size })}
      >
        Add to Cart
      </Button>

      {/* Product Detail Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 360,
            bgcolor: "white",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {product.name}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            component="img"
            src={product.picture}
            alt={product.name}
            sx={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              borderRadius: 2,
              mt: 2,
            }}
          />

          <Typography sx={{ mt: 2 }}>Price: ${product.price}</Typography>
          <Typography sx={{ mt: 1 }}>
            Available Colors: {product.colors.join(", ")}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Description: {product.description}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductCard;
