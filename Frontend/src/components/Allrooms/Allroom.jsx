import React, { useState } from "react";
import SideBar from "./SideBar";
import Roomlist from "./Roomlist";
import hotelData from "../list.json";

export default function Allroom() {
  const [filters, setFilters] = useState({
    priceRange: [],
    roomTypes: [],
    sortBy: "",
  });

  const filteredHotels = hotelData
    .filter((hotel) => {
      // Price range filter
      if (filters.priceRange.length) {
        const match = filters.priceRange.some((range) => {
          if (range === "0-500") return hotel.rupeesPerNight <= 500;
          if (range === "500-1000")
            return hotel.rupeesPerNight > 500 && hotel.rupeesPerNight <= 1000;
          if (range === "1000-3000")
            return hotel.rupeesPerNight > 1000 && hotel.rupeesPerNight <= 3000;
          if (range === "3000+") return hotel.rupeesPerNight > 3000;
          return true;
        });
        if (!match) return false;
      }

      // Room type filter (based on hotel.roomType field now)
      if (
        filters.roomTypes.length &&
        !filters.roomTypes.includes(hotel.roomType)
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === "lowToHigh")
        return a.rupeesPerNight - b.rupeesPerNight;
      if (filters.sortBy === "highToLow")
        return b.rupeesPerNight - a.rupeesPerNight;
      if (filters.sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="mt-16 md:mt-16 min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-[30%]">
        <div className="md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-auto shadow-lg bg-white">
          <SideBar filters={filters} setFilters={setFilters} />
        </div>
      </div>

      {/* Roomlist */}
      <div className="w-full md:w-[70%] px-4">
        <Roomlist data={filteredHotels} />
      </div>
    </div>
  );
}
