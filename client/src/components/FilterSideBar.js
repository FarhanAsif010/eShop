import React from 'react';

function FilterSidebar({ onFilterChange, onSortChange }) {
  const handleFilterChange = (event) => {
    onFilterChange(event.target.value);
  };

  const handleSortChange = (event) => {
    onSortChange(event.target.value);
  };

  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50">
      {' '}
      {/* Set height to 100% */}
      <h2 className="text-white text-lg font-bold mb-4">Filters</h2>
      <div className="mt-4">
        <h3 className="text-white">Categories</h3>
        <select
          onChange={handleFilterChange}
          className="mt-2 w-full bg-gray-700 text-white"
        >
          <option value="">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </div>
      <div className="mt-4">
        <h3 className="text-white">Sort By Price</h3>
        <select
          onChange={handleSortChange}
          className="mt-2 w-full bg-gray-700 text-white"
        >
          <option value="">Default</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSidebar;
