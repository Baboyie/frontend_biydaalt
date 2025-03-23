import React, { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart)); // Load cart data from localStorage
    }
  }, []);

  const handleRemove = (item) => {
    const updatedCart = cart.filter(
      (cartItem) => cartItem.id !== item.id || cartItem.selectedColor !== item.selectedColor
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update cart in localStorage
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={`${item.id}-${item.selectedColor}`}>
            <p>
              {item.name} - ${item.price} x {item.quantity} ({item.selectedColor})
            </p>
            <button onClick={() => handleRemove(item)}>Remove from Cart</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
