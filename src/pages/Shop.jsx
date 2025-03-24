import React, { useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import ProductList from "../components/ProductList";
import Filters from "../components/Filter";

function Shop({ products, addToCart }) {
  const [filters, setFilters] = useState({
    selectedColor: "",
    minPrice: 10,
    maxPrice: 500,
    selectedName: "",
    selectedBrand: "",
    selectedCategory: "",
    inStock: false,
  });

  const colors = [
    "red",
    "blue",
    "green",
    "white",
    "yellow",
    "purple",
    "black",
    "brown",
    "pink",
    "orange",
    "cyan",
    "magenta",
    "lime",
    "indigo",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesColor = filters.selectedColor
      ? product.colors.includes(filters.selectedColor)
      : true;
    const matchesName = product.name
      .toLowerCase()
      .includes(filters.selectedName.toLowerCase());
    const matchesBrand = filters.selectedBrand
      ? product.brand === filters.selectedBrand
      : true;
    const matchesCategory = filters.selectedCategory
      ? product.category === filters.selectedCategory
      : true;
    const matchesMinPrice = product.price >= filters.minPrice;
    const matchesMaxPrice = product.price <= filters.maxPrice;
    const matchesStock = filters.inStock ? product.inStock === true : true;

    return (
      matchesColor &&
      matchesName &&
      matchesBrand &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesStock
    );
  });

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Filters
            selectedColor={filters.selectedColor}
            setSelectedColor={(color) =>
              setFilters({ ...filters, selectedColor: color })
            }
            minPrice={filters.minPrice}
            setMinPrice={(price) => setFilters({ ...filters, minPrice: price })}
            maxPrice={filters.maxPrice}
            setMaxPrice={(price) => setFilters({ ...filters, maxPrice: price })}
            selectedName={filters.selectedName}
            setSelectedName={(name) =>
              setFilters({ ...filters, selectedName: name })
            }
            selectedBrand={filters.selectedBrand}
            setSelectedBrand={(brand) =>
              setFilters({ ...filters, selectedBrand: brand })
            }
            selectedCategory={filters.selectedCategory}
            setSelectedCategory={(category) =>
              setFilters({ ...filters, selectedCategory: category })
            }
            inStock={filters.inStock}
            setInStock={(stock) => setFilters({ ...filters, inStock: stock })}
            colors={colors}
            
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Products
          </Typography>
          <Paper sx={{ p: 3 }}>
            <ProductList products={filteredProducts} addToCart={addToCart} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Shop;
