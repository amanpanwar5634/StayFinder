import React from "react";
import { Link } from "react-router-dom";

export default function HotelCard({ room }) {
  return (
    <Link to={`/rooms/${room.id}`}>
      <div className="mt-3 mb-3 p-3">
        <div className="card bg-base-100 shadow-xl hover:scale-105 duration-300 dark:bg-slate-900 dark:text-white border border-gray-200 dark:border-gray-700">
          <figure>
            <img
              src={room.images[0]}
              alt={room.title}
              className="h-48 w-full object-cover rounded-t-lg"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold">{room.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{room.address}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-yellow-600 font-bold">₹{room.rupeesPerNight} / night</span>
              <span className="badge badge-success text-white">⭐ {room.rating}</span>
            </div>
            <div className="mt-4">
              <button className="btn btn-primary w-full">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
