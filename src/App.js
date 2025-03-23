import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import CartPage from "./pages/cartPage";
import Header from "./components/Header";
import Home from "./pages/home";
import Footer from "./components/Footer"; // Import Footer
import NotFound from "./pages/not-found";
import ContactUs from "./pages/contact";
import Shop from "./pages/Shop";
import LoginPage from "./pages/login";

function App() {
  const [cart, setCart] = useState([]);

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
          minHeight: "100vh", // Ensure the container takes at least the full viewport height
        }}
      >
        <Header cart={cart} />
        <Box
          component="main"
          sx={{
            flexGrow: 1, // Allow the main content to grow and push the footer to the bottom
            padding: 2, // Optional: Add padding for better spacing
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/menu" element={<Shop addToCart={addToCart} />} />
            <Route
              path="/cart"
              element={<CartPage cart={cart} removeFromCart={removeFromCart} />}
            />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Box>
        <Footer /> {/* Footer will stick to the bottom */}
      </Box>
    </BrowserRouter>
  );
}

export default App;
