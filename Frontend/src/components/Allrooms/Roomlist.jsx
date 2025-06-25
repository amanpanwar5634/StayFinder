import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Roomlist({ data }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 p-4 max-w-full">
      {data.map((room, index) => (
        <motion.div
          key={room._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="w-full max-w-[900px] mx-auto bg-white dark:bg-slate-900 rounded-xl shadow-lg p-4 flex flex-col md:flex-row gap-4 hover:shadow-xl transition-shadow duration-300"
        >
          <motion.img
            src={room.images?.[0] || "/placeholder.jpg"}
            alt={room.roomType}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-full md:w-1/3 h-48 md:h-auto object-cover rounded-lg"
          />

          <div
            className="flex flex-col justify-between w-full md:w-2/3 cursor-pointer"
            onClick={() => navigate(`/rooms/${room._id}`)}
          >
            <div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                {room.roomType}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                ₹{room.pricePerNight} / night
              </p>
              <p
                className={`text-sm mt-1 font-medium ${
                  room.isAvailable ? "text-green-600" : "text-red-500"
                }`}
              >
                {room.isAvailable ? "Available" : "Not Available"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-3 text-sm text-gray-700 dark:text-gray-300">
              {room.amenities?.slice(0, 5).map((item, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-full shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
