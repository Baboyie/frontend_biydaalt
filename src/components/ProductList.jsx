import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";

const products = [
  {
    id: 1,
    name: "Product 1-1",
    price: 19.99,
    colors: ["red", "blue", "green", "white"],
    picture: "https://t3.ftcdn.net/jpg/10/00/82/64/360_F_1000826459_SkULxmIvvHot6n271iimrZvcUekncxsw.jpg",
  },
  {
    id: 2,
    name: "Product 1-2",
    price: 24.99,
    colors: ["yellow", "purple", "white", "brown"],
    picture: "https://t3.ftcdn.net/jpg/10/00/82/64/360_F_1000826459_SkULxmIvvHot6n271iimrZvcUekncxsw.jpg",
  },
  {
    id: 3,
    name: "Product 2-1",
    price: 29.99,
    colors: ["black", "pink", "orange", "green"],
    picture: "https://t3.ftcdn.net/jpg/10/00/82/64/360_F_1000826459_SkULxmIvvHot6n271iimrZvcUekncxsw.jpg",
  },
  {
    id: 4,
    name: "Product 2-2",
    price: 15.99,
    colors: ["brown", "gray", "teal", "black"],
    picture: "https://t3.ftcdn.net/jpg/10/00/82/64/360_F_1000826459_SkULxmIvvHot6n271iimrZvcUekncxsw.jpg",
  },
  {
    id: 5,
    name: "Product 3",
    price: 39.99,
    colors: ["cyan", "magenta", "lime", "indigo"],
    picture: "https://t3.ftcdn.net/jpg/10/00/82/64/360_F_1000826459_SkULxmIvvHot6n271iimrZvcUekncxsw.jpg",
  },
];

const ProductList = ({ addToCart }) => {
  const [selectedColor, setSelectedColor] = useState({});
  const [quantity, setQuantity] = useState({});

  const handleColorChange = (productId, color) => {
    setSelectedColor((prev) => ({ ...prev, [productId]: color }));
  };

  const handleQuantityChange = (productId, action) => {
    setQuantity((prev) => {
      const currentQuantity = prev[productId] || 1;
      if (action === "increase") {
        return { ...prev, [productId]: currentQuantity + 1 };
      } else if (action === "decrease" && currentQuantity > 1) {
        return { ...prev, [productId]: currentQuantity - 1 };
      }
      return prev;
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 3, p: 2, overflowX: "auto" }}>
      <Grid container spacing={2} sx={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
        {products.map((product) => (
          <Grid item key={product.id} sx={{ width: 200 }}>
            <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img
                src={product.picture}
                alt={product.name}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" noWrap>{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">${product.price.toFixed(2)}</Typography>

                {/* Color Selection with Buttons */}
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      onClick={() => handleColorChange(product.id, color)}
                      sx={{
                        backgroundColor: color,
                        color: "white",
                        minWidth: "30px",
                        minHeight: "30px",
                        borderRadius: "50%",
                        "&:hover": { backgroundColor: `${color}A6` },
                        border: selectedColor[product.id] === color ? "2px solid black" : "none",
                      }}
                    />
                  ))}
                </Box>

                {/* Quantity Control */}
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleQuantityChange(product.id, "decrease")}
                    sx={{ minWidth: "30px" }}
                  >
                    -
                  </Button>
                  <Typography sx={{ mx: 2 }}>{quantity[product.id] || 1}</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleQuantityChange(product.id, "increase")}
                    sx={{ minWidth: "30px" }}
                  >
                    +
                  </Button>
                </Box>

                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    const itemToAdd = {
                      ...product,
                      selectedColor: selectedColor[product.id],
                      quantity: quantity[product.id] || 1
                    };
                    addToCart(itemToAdd);  // Add the item to the cart
                  }}
                  sx={{ mt: 2 }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
