import React from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Slider,
  Paper,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { motion } from "framer-motion";

const Filters = ({
  selectedColor,
  setSelectedColor,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  colors,
  selectedName,
  setSelectedName,
  selectedBrand,
  setSelectedBrand,
  brands,
  selectedCategory,
  setSelectedCategory,
  categories,
  inStock,
  setInStock,
}) => {
  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      elevation={4}
      sx={{
        width: 280,
        padding: 3,
        borderRadius: 3,
        bgcolor: "background.paper",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Filter Products
      </Typography>

      {/* Name Filter */}
      <TextField
        label="Search by Name"
        variant="outlined"
        fullWidth
        value={selectedName}
        onChange={(e) => setSelectedName(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Color Filter */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Color</InputLabel>
        <Select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {colors.map((color) => (
            <MenuItem key={color} value={color}>
              {color}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Brand Filter */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Brand</InputLabel>
        <Select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {brands.map((brand) => (
            <MenuItem key={brand} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Category Filter */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Price Range Slider */}
      <Typography gutterBottom>Price Range</Typography>
      <Slider
        value={[minPrice, maxPrice]}
        onChange={(e, newValue) => {
          setMinPrice(newValue[0]);
          setMaxPrice(newValue[1]);
        }}
        valueLabelDisplay="auto"
        min={10} // Бага утгыг 10 болгосон
        max={500} // Дээд утгыг 500 болгосон
        sx={{ mb: 2 }}
      />

      {/* Stock Availability */}
      <FormControlLabel
        control={
          <Switch
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
        }
        label="In Stock Only"
        sx={{ mb: 2 }}
      />

      {/* Apply Button */}
      <Button
        component={motion.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variant="contained"
        color="primary"
        fullWidth
      >
        Apply Filters
      </Button>
    </Paper>
  );
};

export default Filters;
