import { useState } from "react";

const ProductCard = ({ product, addToCart }) => {
  const [size, setSize] = useState(1);  // Default size (quantity) is 1
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const increaseSize = () => setSize(size + 1);
  const decreaseSize = () => setSize(size > 1 ? size - 1 : 1);

  return (
    <div className="product-card">
      <img src={product.picture} alt={product.name} className="product-img" />
      <h3>{product.name}</h3>
      <p className="product-price">${product.price}</p>

      <div className="product-colors">
        {product.colors.map((color, index) => (
          <span
            key={index}
            className={`color-circle ${selectedColor === color ? "selected" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          ></span>
        ))}
      </div>

      <div className="product-size">
        <button onClick={decreaseSize}>-</button>
        <span>{size}</span>
        <button onClick={increaseSize}>+</button>
      </div>

      <button className="add-to-cart" onClick={() => addToCart(product, selectedColor, size)}>
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductCard;
