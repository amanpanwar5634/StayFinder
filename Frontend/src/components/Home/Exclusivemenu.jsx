import React from "react";
import Offerlist from "../Offerlist.json";
import ExclusiveCard from "./ExclusiveCard";
import { useNavigate } from "react-router-dom";

export default function ExclusiveMenu() {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-16">
      {/* Header Section */}
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white">
          <span className="text-yellow-500">Exclusive</span> Hotel Offers Just for You
        </h1>
        <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
          Discover unbeatable deals, limited-time promotions, and handpicked offers that make your next stay more affordable and memorable. Whether it's a romantic getaway, family trip, or solo adventure — we’ve got something special for you.
        </p>
      </div>

      {/* Offer Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {Offerlist.map((item) => (
          <ExclusiveCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
