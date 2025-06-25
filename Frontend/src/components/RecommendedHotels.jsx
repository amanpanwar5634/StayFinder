import React, { useEffect, useState } from "react";
import HotelCard from "./Home/HotelCard";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

export default function RecommendedHotels() {
  const { rooms, searchedCities } = useAppContext();
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const filteredHotels = rooms.slice().filter((room) =>
      searchedCities.includes(room.hotel.city)
    );
    setRecommended(filteredHotels);
  }, [rooms, searchedCities]);

  return (
    <motion.div
      className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white">
          Recommended <span className="text-yellow-500">Stays</span> for You
        </h1>
        <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Discover handpicked hotel recommendations tailored to your recent
          searches. Whether you're planning a city escape, a beach holiday, or a
          quiet mountain retreat — find stays that match your taste and
          destination.
        </p>
      </div>

      {recommended && recommended.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          {recommended.slice(0, 3).map((room) => (
            <HotelCard key={room._id} room={room} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center mt-16 text-xl text-gray-600 dark:text-gray-300">
          We couldn't find any recommendations for your selected cities right now.
          Try exploring other destinations or check back later!
        </div>
      )}
    </motion.div>
  );
}
