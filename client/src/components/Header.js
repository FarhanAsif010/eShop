import React from 'react';
import { useNavigate } from 'react-router-dom'; // Update this line
import { useCart } from '../CartContext.js'; // Import useCart

function Header({ activeForm, setActiveForm, isLoggedIn, user }) {
  const navigate = useNavigate(); // Update this line
  const { cart } = useCart(); // Get cart items from context

  const handleCartClick = () => {
    navigate('/cart'); // Update this line
  };

  return (
    <header className="bg-gray-800 py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">My App</h1>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <button className="px-4 py-2 rounded-full text-white font-semibold bg-gray-600 hover:bg-gray-700">
              Profile
            </button>
            {user && user.image && (
              <img
                src={user.image}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
            )}
            <button
              onClick={handleCartClick} // Handle cart button click
              className="px-4 py-2 rounded-full text-white font-semibold bg-blue-600 hover:bg-blue-700"
            >
              Cart ({cart.length}) {/* Display number of items in cart */}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveForm('login')}
              className={`px-4 py-2 rounded-full text-white font-semibold transition duration-300 ease-in-out ${
                activeForm === 'login'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveForm('register')}
              className={`px-4 py-2 rounded-full text-white font-semibold transition duration-300 ease-in-out ${
                activeForm === 'register'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
