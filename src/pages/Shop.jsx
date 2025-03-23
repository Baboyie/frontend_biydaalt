import React, { useState } from "react";
import { Box } from "@mui/material";
import ProductList from "../components/ProductList";
import Filters from "../components/Filter";

function Shop({ products, addToCart }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedName, setSelectedName] = useState("");

  const colors = ["red", "blue", "green", "white", "yellow", "purple", "black", "brown", "pink", "orange", "cyan", "magenta", "lime", "indigo"];

  // Ensure products is an array before filtering
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        const matchesColor = selectedColor ? product.colors.includes(selectedColor) : true;
        const matchesName = product.name.toLowerCase().includes(selectedName.toLowerCase());
        const matchesMinPrice = product.price >= minPrice;
        const matchesMaxPrice = product.price <= maxPrice;

        return matchesColor && matchesName && matchesMinPrice && matchesMaxPrice;
      })
    : []; // Fallback to an empty array if products is not an array

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