import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
    const savedProductList = JSON.parse(localStorage.getItem("productList"));
    return savedProductList || products;
  });

  useEffect(() => {
    localStorage.setItem("productList", JSON.stringify(productList));
  }, [productList]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find(
      (item) =>
        item.id === product.id && item.selectedColor === product.selectedColor
    );

    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      updatedCart.push(product);
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (item) => {
    const updatedCart = cart.filter(
      (cartItem) =>
        cartItem.id !== item.id || cartItem.selectedColor !== item.selectedColor
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <BrowserRouter>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header cart={cart} />
        <Box component="main" sx={{ flexGrow: 1, padding: 2 }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/home"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
            />

            {/* Protected Routes for Authenticated Users */}
            <Route
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
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
                  isAuthenticated={isAuthenticated}
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
