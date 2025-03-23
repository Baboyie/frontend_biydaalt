import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "primary.dark", color: "white", p: 3, mt: 5 }}>
      <Container maxWidth="md" sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        {/* Left Section - Company Info */}
        <Box>
          <Typography variant="h6">Our Store</Typography>
          <Typography variant="body2">Quality products at the best prices.</Typography>
          <Typography variant="body2">&copy; {new Date().getFullYear()} Our Store. All rights reserved.</Typography>
        </Box>

        {/* Center Section - Navigation Links */}
        <Box>
          <Typography variant="h6">Quick Links</Typography>
          <Button color="inherit" component={Link} to="/home">Home</Button>
          <Button color="inherit" component={Link} to="/menu">Products</Button>
          <Button color="inherit" component={Link} to="/contact">Contact Us</Button>
        </Box>

        {/* Right Section - Social Media */}
        <Box>
          <Typography variant="h6">Follow Us</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button color="inherit" href="https://facebook.com" target="_blank" rel="noopener noreferrer">📘</Button>
            <Button color="inherit" href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦</Button>
            <Button color="inherit" href="https://instagram.com" target="_blank" rel="noopener noreferrer">📸</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
