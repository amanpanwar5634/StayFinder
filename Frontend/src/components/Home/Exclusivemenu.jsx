import React from "react";
import Offerlist from "../Offerlist.json";
import ExclusiveCard from "./ExclusiveCard"; // Make sure this is the updated card component
import { useNavigate } from "react-router-dom";

export default function ExclusiveMenu() {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white">
          Find Your Perfect <span className="text-yellow-500">Stay</span>
        </h1>
        <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Explore top-rated hotels across breathtaking destinations. Whether it's
          a luxurious escape, a serene retreat, or a city adventure — your comfort
          begins here.
        </p>
      </div>

      {/* Offer Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Offerlist.map((item) => (
          <ExclusiveCard key={item.id} item={item} />
        ))}
      </div>

      {/* View All Offers Button */}
      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/offer")}
          className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          View All Offers →
        </button>
      </div>
    </div>
  );
}
