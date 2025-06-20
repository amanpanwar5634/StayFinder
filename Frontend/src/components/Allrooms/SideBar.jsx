import React from "react";

export default function SideBar({ filters, setFilters }) {
  const toggleFilter = (category, value) => {
    setFilters((prev) => {
      const alreadySelected = prev[category].includes(value);
      const updatedCategory = alreadySelected
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];

      return { ...prev, [category]: updatedCategory };
    });
  };

  const setSort = (value) => {
    setFilters((prev) => ({ ...prev, sortBy: value }));
  };

  return (
    <div className="p-6 space-y-8 text-gray-800">
      <h2 className="text-2xl font-bold mb-2">Filters</h2>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        {["0-500", "500-1000", "1000-3000", "3000+"].map((range) => (
          <label key={range} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.priceRange.includes(range)}
              onChange={() => toggleFilter("priceRange", range)}
              className="accent-blue-500"
            />
            ₹{range.replace("-", " – ₹").replace("+", "+")}
          </label>
        ))}
      </div>

      {/* Room Type Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Room Types</h3>
        {["Single Bed", "Double Bed", "Family", "Luxury Room"].map((type) => (
          <label key={type} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.roomTypes.includes(type)}
              onChange={() => toggleFilter("roomTypes", type)}
              className="accent-blue-500"
            />
            {type}
          </label>
        ))}
      </div>

      {/* Sort By */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Sort By</h3>
        {[
          { label: "Price: Low to High", value: "lowToHigh" },
          { label: "Price: High to Low", value: "highToLow" },
          { label: "Rating", value: "rating" },
        ].map((sort) => (
          <label key={sort.value} className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              checked={filters.sortBy === sort.value}
              onChange={() => setSort(sort.value)}
              className="accent-blue-500"
            />
            {sort.label}
          </label>
        ))}
      </div>
    </div>
  );
}
