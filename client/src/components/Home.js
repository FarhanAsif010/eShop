import React, { useEffect, useState } from 'react';
import FilterSidebar from './FilterSideBar.js';
import { useCart } from '../CartContext.js'; // Import useCart

function Home() {
  const { addToCart } = useCart(); // Get addToCart function from context
  const [items, setItems] = useState([]); // State to hold fetched items
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state
  const [filter, setFilter] = useState(''); // State to manage selected filter
  const [sortOrder, setSortOrder] = useState(''); // State to manage sort order

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products'); // Example API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItems(data); // Set the fetched items to state
      } catch (error) {
        setError(error.message); // Set error message if fetch fails
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchItems(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleSortChange = (selectedSort) => {
    setSortOrder(selectedSort);
  };

  const filteredItems = filter
    ? items.filter((item) => item.category === filter)
    : items;

  const sortedItems = () => {
    if (sortOrder === 'asc') {
      return filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      return filteredItems.sort((a, b) => b.price - a.price);
    }
    return filteredItems;
  };

  if (loading) {
    return <div className="text-white">Loading items...</div>; // Loading state
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>; // Error state
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <FilterSidebar
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <div className="flex-grow p-4 ml-64">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {sortedItems().map((item) => (
            <li
              key={item.id}
              className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold text-white">
                  {item.title}
                </h2>
                <p className="font-bold text-white">${item.price}</p>

                <button
                  onClick={() => addToCart({ ...item, quantity: 1 })} // Add to cart functionality
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
