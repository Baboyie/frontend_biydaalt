import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material"; // Material icons

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#5533ff", // #5533ff өнгийг ашигласан
        color: "white",
        p: 4,
        mt: 5,
        boxShadow: 4,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" }, // Responsive design
          alignItems: "center",
        }}
      >
        {/* Left Section - Logo (IO Logo) */}
        <Box
          sx={{ mb: { xs: 3, md: 0 }, display: "flex", alignItems: "center" }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mr: 2,
              fontSize: "2rem",
              letterSpacing: 1,
            }}
          >
            IO
          </Typography>
          <Typography variant="body2">
            Quality products at the best prices.
          </Typography>
        </Box>

        {/* Center Section - Navigation Links */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "flex-start",
            mt: { xs: 3, md: 0 },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Quick Links
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/home"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#3e29b0", // Darker hover effect
              },
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/menu"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#3e29b0", // Darker hover effect
              },
            }}
          >
            Products
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/contact"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#3e29b0", // Darker hover effect
              },
            }}
          >
            Contact Us
          </Button>
        </Box>

        {/* Right Section - Social Media */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <IconButton
              color="inherit"
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
