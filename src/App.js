import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import CartPage from "./pages/cartPage";
import Header from "./components/Header";
import Home from "./pages/home";
import Footer from "./components/Footer";
import NotFound from "./pages/not-found";
import ContactUs from "./pages/contact";
import Shop from "./pages/Shop";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profilePage";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import products from "./components/products";

function App() {
  const [cart, setCart] = useState([]);
  const [productList, setProductList] = useState(() => {
    // Load productList from localStorage or use the initial products array
    const savedProductList = JSON.parse(localStorage.getItem("productList"));
    return savedProductList || products;
  });

  // Save productList to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("productList", JSON.stringify(productList));
  }, [productList]);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Function to add item to cart and store it in localStorage
  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find(
      (item) =>
        item.id === product.id && item.selectedColor === product.selectedColor
    );

    if (existingProduct) {
      existingProduct.quantity += product.quantity; // Update quantity if already in cart
    } else {
      updatedCart.push(product); // Add new product to the cart
    }

    setCart(updatedCart); // Update state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  // Function to remove item from cart
  const removeFromCart = (item) => {
    const updatedCart = cart.filter(
      (cartItem) =>
        cartItem.id !== item.id || cartItem.selectedColor !== item.selectedColor
    );
    setCart(updatedCart); // Update state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  return (
    <BrowserRouter>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header cart={cart} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 2,
          }}
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            {/* Protected Routes for Authenticated Users */}
            <Route
              element={
                <ProtectedRoute
                  isAuthenticated={
                    localStorage.getItem("isAuthenticated") === "true"
                  }
                  isAdmin={localStorage.getItem("isAdmin") === "true"}
                  adminOnly={false}
                />
              }
            >
              <Route path="/contact" element={<ContactUs />} />
              <Route
                path="/menu"
                element={<Shop products={productList} addToCart={addToCart} />}
              />
              <Route
                path="/cart"
                element={
                  <CartPage cart={cart} removeFromCart={removeFromCart} />
                }
              />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* Protected Routes for Admins Only */}
            <Route
              element={
                <ProtectedRoute
                  isAuthenticated={
                    localStorage.getItem("isAuthenticated") === "true"
                  }
                  isAdmin={localStorage.getItem("isAdmin") === "true"}
                  adminOnly={true}
                />
              }
            >
              <Route
                path="/admin"
                element={
                  <AdminPanel
                    productList={productList}
                    setProductList={setProductList}
                  />
                }
              />
            </Route>

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;
