import React, { useState } from "react";
import { useSearchParams } from "react-router-dom"; // ✅ needed for URL params
import SideBar from "./SideBar";
import Roomlist from "./Roomlist";
import { useAppContext } from "../../context/AppContext";

export default function Allroom() {
  const { rooms } = useAppContext();
  const [searchParams] = useSearchParams(); // ✅ Get the destination from URL

  const [filters, setFilters] = useState({
    priceRange: [],
    roomTypes: [],
    sortBy: "",
  });

  // ✅ Get destination from URL
  const destination = searchParams.get("destination");

  // ✅ First filter rooms by destination (if any)
  const destinationFilteredRooms = rooms?.filter((room) => {
    if (!destination) return true;
    return room.hotel.city
      .toLowerCase()
      .includes(destination.toLowerCase());
  });

  // ✅ Then apply price range, room type, and sorting filters
  const filteredRooms = destinationFilteredRooms
    ?.filter((room) => {
      // Price Filter
      if (filters.priceRange.length) {
        const match = filters.priceRange.some((range) => {
          if (range === "0-500") return room.pricePerNight <= 500;
          if (range === "500-1000")
            return room.pricePerNight > 500 && room.pricePerNight <= 1000;
          if (range === "1000-3000")
            return room.pricePerNight > 1000 && room.pricePerNight <= 3000;
          if (range === "3000+") return room.pricePerNight > 3000;
          return true;
        });
        if (!match) return false;
      }

      // Room Type Filter
      if (
        filters.roomTypes.length &&
        !filters.roomTypes.includes(room.roomType)
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === "lowToHigh")
        return a.pricePerNight - b.pricePerNight;
      if (filters.sortBy === "highToLow")
        return b.pricePerNight - a.pricePerNight;
      if (filters.sortBy === "rating")
        return (b.rating || 0) - (a.rating || 0);
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
        <Roomlist data={filteredRooms} />
      </div>
    </div>
  );
}
