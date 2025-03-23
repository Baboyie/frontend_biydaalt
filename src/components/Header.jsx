import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Home, ContactMail, MenuBook, ShoppingCart, Login, Logout } from "@mui/icons-material";

const Header = ({ cart }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

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
                Cart ({cart.length}) {/* Display cart count */}
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