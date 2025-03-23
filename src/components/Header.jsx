import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "@mui/icons-material"; // Login and other icon imports

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home,
  ContactMail,
  MenuBook,
  ShoppingCart,
  Logout,
  AdminPanelSettings,
} from "@mui/icons-material";

const Header = ({ cart }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/home" },
    { text: "Contact", icon: <ContactMail />, path: "/contact" },
    { text: "Menu", icon: <MenuBook />, path: "/menu" },
    {
      text: "Cart",
      icon: (
        <Badge badgeContent={cart.length} color="secondary">
          <ShoppingCart />
        </Badge>
      ),
      path: "/cart",
    },
  ];

  if (isAdmin) {
    menuItems.push({
      text: "Admin Panel",
      icon: <AdminPanelSettings />,
      path: "/admin",
    });
  }

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#5533ff", // Set header color
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "0 16px",
          top: 0,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Custom Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h4"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                letterSpacing: 2,
                fontFamily: "Roboto, sans-serif",
                color: "white",
                display: "flex",
                alignItems: "center",
                fontSize: "1.8rem", // Adjust font size
              }}
            >
              <span
                style={{
                  color: "#FFD700", // Highlighted color for 'I'
                  fontSize: "2.2rem", // Larger 'I'
                }}
              >
                I
              </span>
              <span
                style={{
                  fontSize: "1.6rem", // Smaller 'O' to contrast
                }}
              >
                O
              </span>
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {isAuthenticated ? (
              <>
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    color="inherit"
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      mx: 1,
                      transition: "all 0.3s",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "8px",
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  startIcon={<Logout />}
                >
                  Logout
                </Button>
              </>
            ) : (
              // Remove Login Button if not authenticated
              <></>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* 🌟 Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            backgroundColor: "#5533ff", // Solid color for modern look
            color: "white",
            height: "100%",
          }}
          role="presentation"
          onClick={toggleDrawer}
        >
          <List>
            {isAuthenticated ? (
              <>
                {menuItems.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton component={Link} to={item.path}>
                      <ListItemIcon sx={{ color: "white" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon sx={{ color: "white" }}>
                      <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/login">
                  <ListItemIcon sx={{ color: "white" }}>
                    <Login />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
