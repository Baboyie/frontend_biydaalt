import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Home, ContactMail, MenuBook, ShoppingCart, Login, Logout } from "@mui/icons-material";

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  const [cartCount, setCartCount] = useState(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.length;
  });

  useEffect(() => {
    // Listen to cart changes and update the count
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    // Listen for cart changes using localStorage event
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Website Header
        </Typography>
        <Box>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/home" startIcon={<Home />}>Home</Button>
              <Button color="inherit" component={Link} to="/contact" startIcon={<ContactMail />}>Contact</Button>
              <Button color="inherit" component={Link} to="/menu" startIcon={<MenuBook />}>Menu</Button>
              <Button color="inherit" onClick={goToCart} startIcon={<ShoppingCart />}>
                Go to Cart ({cartCount})
              </Button>
              <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>Logout</Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login" startIcon={<Login />}>Login</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
