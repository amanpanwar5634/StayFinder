import React from "react";
import { motion } from "framer-motion";
import HotelCard from "./HotelCard";
import { useAppContext } from "../../context/AppContext";

export default function HotelsMenu() {
  const { rooms, navigate } = useAppContext();

  return (
    <motion.div
      className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white">
          Find Your Perfect <span className="text-yellow-500">Stay</span>
        </h1>
        <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Explore top-rated hotels across breathtaking destinations. Whether it's
          a luxurious escape, a serene retreat, or a city adventure — your comfort
          begins here.
        </p>
      </motion.div>

      {/* Hotel Cards or No Rooms Message */}
      {rooms && rooms.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {rooms.slice(0, 6).map((room) => (
            <HotelCard key={room._id} room={room} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center mt-16 text-xl text-gray-600 dark:text-gray-300">
          No rooms available at the moment. Please check back later!
        </div>
      )}

      {/* View All Button */}
      {rooms && rooms.length > 0 && (
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button
            onClick={() => navigate("/rooms")}
            className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            View All Hotels →
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
