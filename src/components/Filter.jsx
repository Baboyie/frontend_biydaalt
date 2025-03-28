import React from "react";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Slider,
  Paper,
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

      {/* Price Range Slider */}
      <Typography gutterBottom>Price Range</Typography>
      <Slider
  value={[minPrice, maxPrice]}
  onChange={(e, newValue) => {
    const [newMin, newMax] = newValue;
    if (newMin !== minPrice) setMinPrice(newMin);
    if (newMax !== maxPrice) setMaxPrice(newMax);
  }}
  valueLabelDisplay="auto"
  min={0} 
  max={100} 
  sx={{ mb: 2 }}
/>


      
    </Paper>
  );
};

export default Filters;
