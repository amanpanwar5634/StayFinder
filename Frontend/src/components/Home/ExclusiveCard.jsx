import React from "react";

export default function ExclusiveCard({ item }) {
  return (
    <div className="mt-3 mb-3 p-3">
      <div
        className="relative card shadow-xl hover:scale-105 duration-300 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${item.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "300px",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-between text-white">
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold">{item.title}</h2>
              <span className="badge badge-error">{item.priceOff} OFF</span>
            </div>
            <p className="mt-1 text-sm">{item.description}</p>
          </div>
          <div className="flex justify-between items-end">
            <p className="text-xs">Expires on: {item.expireDate}</p>
            <button className="btn btn-outline btn-sm text-white border-white hover:bg-white hover:text-black">
              View Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
