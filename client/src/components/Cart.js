import React from 'react';
import { useCart } from '../CartContext'; // Import useCart

function Cart() {
  const { cart, removeFromCart, clearCart, addToCart } = useCart(); // Get cart items and functions from context

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;

    // Only update if the new quantity is greater than 0
    if (newQuantity > 0) {
      addToCart({ ...item, quantity: newQuantity }); // Update cart with new quantity
    } else {
      removeFromCart(item.id); // Remove item if quantity is 0
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ); // Calculate total price

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <h2 className="text-2xl font-bold text-white mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-white">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li
              key={item.id}
              className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-white">Price: ${item.price}</p>
                <p className="text-white">Quantity: {item.quantity}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleQuantityChange(item, -1)} // Decrease quantity
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    -
                  </button>
                  <span className="mx-2 text-white">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item, 1)} // Increase quantity
                    className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)} // Remove item from cart
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-white">
            Total Price: ${totalPrice.toFixed(2)}
          </h3>
          <button
            onClick={clearCart} // Clear the cart
            className="mt-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
