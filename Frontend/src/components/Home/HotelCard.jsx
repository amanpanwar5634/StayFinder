import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HotelCard({ room }) {
  return (
    <motion.div
      variants={cardVariants}
      className="mt-3 mb-3 p-3"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      <Link to={`/rooms/${room._id}`}>
        <div className="card bg-base-100 shadow-xl dark:bg-slate-900 dark:text-white border border-gray-200 dark:border-gray-700">
          <figure>
            <img
              src={room.images?.[0]}
              alt={room.roomType}
              className="h-48 w-full object-cover rounded-t-lg"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold">{room.roomType}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {room.hotel.name || "Hotel Name"}
            </p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-yellow-600 font-bold">
                ₹{room.pricePerNight} / night
              </span>
              <span
                className={`badge ${
                  room.isAvailable ? "badge-success" : "badge-error"
                } text-white`}
              >
                {room.isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>
            <div className="mt-4">
              <button className="btn btn-primary w-full">Book Now</button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
