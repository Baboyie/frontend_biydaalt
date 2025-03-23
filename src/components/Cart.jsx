function Cart({ cart, removeFromCart }) {
    return (
      <div>
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id}>
              <p>
                {item.name} - ${item.price} x {item.quantity} ({item.selectedColor})
              </p>
              <button onClick={() => removeFromCart(item, item.selectedColor)}>
                Remove from Cart
              </button>
            </div>
          ))
        )}
      </div>
    );
  }
  
  export default Cart;
  