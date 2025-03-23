import React, { useState } from "react";
import { Box } from "@mui/material";
import ProductList from "../components/ProductList";
import Filters from "../components/Filter"; 

function Shop() {
  const [cart, setCart] = useState([]); // Store cart data
  const [selectedColor, setSelectedColor] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedName, setSelectedName] = useState("");

  const colors = ["red", "blue", "green", "white", "yellow", "purple", "black", "brown", "pink", "orange", "cyan", "magenta", "lime", "indigo"];

  const products = [
    { id: 1, name: "Product 1-1", price: 19.99, colors: ["red", "blue", "green", "white"], picture: "https://t3.ftcdn.net/jpg/10/00/82/64/360_F_1000826459_SkULxmIvvHot6n271iimrZvcUekncxsw.jpg" },
    { id: 2, name: "Product 1-2", price: 24.99, colors: ["yellow", "purple", "white", "brown"], picture: "https://t3.ftcdn.net/jpg/10/00/82/64/360_F_1000826459_SkULxmIvvHot6n271iimrZvcUekncxsw.jpg" },
    { id: 3, name: "Product 2-1", price: 29.99, colors: ["black", "pink", "orange", "green"], picture: "https://t3.ftcdn.net/jpg/10/00/82/64/360_F_1000826459_SkULxmIvvHot6n271iimrZvcUekncxsw.jpg" },
    { id: 4, name: "Product 2-2", price: 15.99, colors: ["brown", "gray", "teal", "black"], picture: "https://t3.ftcdn.net/jpg/10/00/82/64/360_F_1000826459_SkULxmIvvHot6n271iimrZvcUekncxsw.jpg" },
    { id: 5, name: "Product 3", price: 39.99, colors: ["cyan", "magenta", "lime", "indigo"], picture: "https://t3.ftcdn.net/jpg/10/00/82/64/360_F_1000826459_SkULxmIvvHot6n271iimrZvcUekncxsw.jpg" },
  ];

  const addToCart = (product, selectedColor) => {
    const newProduct = { ...product, selectedColor };

    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === newProduct.id && item.selectedColor === newProduct.selectedColor
      );

      if (existingProduct) {
        const updatedCart = prevCart.map((item) =>
          item.id === newProduct.id && item.selectedColor === newProduct.selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      } else {
        const updatedCart = [...prevCart, { ...newProduct, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesColor = selectedColor ? product.colors.includes(selectedColor) : true;
    const matchesName = product.name.toLowerCase().includes(selectedName.toLowerCase());
    const matchesMinPrice = product.price >= minPrice;
    const matchesMaxPrice = product.price <= maxPrice;

    return matchesColor && matchesName && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
      <Filters
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        colors={colors}
        selectedName={selectedName}
        setSelectedName={setSelectedName}
      />
      
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <ProductList
          products={filteredProducts}
          addToCart={addToCart}
        />
      </Box>
    </Box>
  );
}

export default Shop;
