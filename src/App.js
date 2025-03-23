import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./pages/cartPage";
import Header from "./components/Header";
import Home from "./pages/home";
import Footer from "./components/Footer";
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
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    const existingProduct = cart.find(
      (item) =>
        item.id === product.id && item.selectedColor === product.selectedColor
    );

    if (existingProduct) {
      existingProduct.quantity += product.quantity; // Update quantity if already in cart
    } else {
      cart.push(product); // Add new product to the cart
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Optionally, trigger a re-render or update the cart count here
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header cart={cart} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/menu" element={<Shop addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
