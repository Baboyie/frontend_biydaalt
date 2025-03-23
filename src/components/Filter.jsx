import React from "react";
import { Box, Typography, TextField, Select, MenuItem, InputLabel, FormControl, Button } from "@mui/material";

const Filters = ({ selectedColor, setSelectedColor, minPrice, setMinPrice, maxPrice, setMaxPrice, colors, selectedName, setSelectedName }) => {
  return (
    <Box
      sx={{
        width: 250,
        padding: 2,
        border: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>Filters</Typography>

      {/* Name Filter */}
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={selectedName}
        onChange={(e) => setSelectedName(e.target.value)}
      />

      {/* Color Filter */}
      <FormControl fullWidth>
        <InputLabel>Color</InputLabel>
        <Select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          label="Color"
        >
          <MenuItem value="">All</MenuItem>
          {colors.map((color) => (
            <MenuItem key={color} value={color}>
              {color}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Price Range Filters */}
      <TextField
        label="Min Price"
        variant="outlined"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        fullWidth
        InputProps={{
          inputProps: { min: 0 },
        }}
      />

      <TextField
        label="Max Price"
        variant="outlined"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        fullWidth
        InputProps={{
          inputProps: { min: 0 },
        }}
      />

      <Button variant="contained" color="primary" onClick={() => console.log('Apply Filters')} fullWidth>
        Apply Filters
      </Button>
    </Box>
  );
};

export default Filters;
