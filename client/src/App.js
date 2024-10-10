import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update this line
import Header from './components/Header.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Home from './components/Home.js';
import Cart from './components/Cart.js'; // Import Cart component
import { CartProvider } from './CartContext.js'; // Import CartProvider

function App() {
  const [activeForm, setActiveForm] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [user, setUser] = useState(null); // Store user information

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  return (
    <CartProvider>
      <Router>
        {' '}
        {/* Wrap the application with Router */}
        <div className="App min-h-screen bg-gray-900 flex flex-col">
          <Header
            activeForm={activeForm}
            setActiveForm={setActiveForm}
            isLoggedIn={isLoggedIn}
            user={user}
          />

          {/* Main content */}
          <main className="flex-grow flex items-center justify-center px-4 py-8 w-full">
            <div className="w-full">
              <Routes>
                <Route path="/cart" element={<Cart />} />{' '}
                {/* Render Cart component */}
                <Route
                  path="/"
                  element={
                    isLoggedIn ? (
                      <Home />
                    ) : (
                      <div className="flex justify-center">
                        <div
                          className={`transition-opacity duration-300 ease-in-out ${
                            activeForm === 'login' ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <Login onLoginSuccess={handleLoginSuccess} />
                        </div>
                        <div
                          className={`transition-opacity duration-300 ease-in-out ${
                            activeForm === 'register'
                              ? 'opacity-100'
                              : 'opacity-0'
                          }`}
                        >
                          <Register />
                        </div>
                      </div>
                    )
                  }
                />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
