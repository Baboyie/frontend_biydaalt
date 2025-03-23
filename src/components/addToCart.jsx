import React from "react";

function AddToCart({ product, addToCart }) {
  const handleAddToCart = () => {
    // Add the product to the cart
    addToCart(product);
  };

  return <button onClick={handleAddToCart}>Add to Cart</button>;
}

export default AddToCart;
