import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { motion } from "framer-motion";

export default function HomeContent() {
  const { navigate, getToken, axios, setSearchedCities } = useAppContext();
  const [destination, setDestination] = useState("");

  const onSearch = async (e) => {
    e.preventDefault();
    navigate(`/rooms?destination=${destination}`);
    await axios.post(
      "/api/user/store-recent-search",
      { recentSearchedCity: destination },
      { headers: { Authorization: `Bearer ${await getToken()}` } }
    );
    setSearchedCities((prev) => {
      const updated = [...prev, destination];
      if (updated.length > 3) updated.shift();
      return updated;
    });
  };

  return (
    <div
      className="hero min-h-screen sm:h-[90vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1350&q=80)",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-60 flex items-center h-full px-4 sm:px-6 md:px-20">
        <div className="mt-16 md:mt-4 flex flex-col md:flex-row justify-between items-center w-full max-w-screen-2xl mx-auto gap-6 sm:gap-10">
          
          {/* Left Content */}
          <motion.div
            className="text-white max-w-xl text-center md:text-left"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-block bg-yellow-400 text-black font-semibold px-3 py-1 rounded-full mb-3 text-xs sm:text-sm shadow-md"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              🏨 Your Perfect Stay Awaits
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 leading-snug drop-shadow">
              Book Luxury Hotels in Seconds
            </h1>
            <p className="text-sm sm:text-base font-light mb-4">
              Explore top-rated hotels across the world. Whether it’s a weekend getaway or a business trip, we’ve got you covered.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-5 rounded-lg transition duration-300 shadow-lg text-sm sm:text-base"
            >
               <li><a href="/rooms">Discover More</a></li>
            </motion.button>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            className="bg-white bg-opacity-90 backdrop-blur-lg p-4 sm:p-6 rounded-lg shadow-2xl w-full max-w-md sm:max-w-sm"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-gray-800">Book Your Stay</h2>
            <form className="space-y-3 sm:space-y-4" onSubmit={onSearch}>
              {/* Destination Input */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Destination</label>
                <input
                  onChange={(e) => setDestination(e.target.value)}
                  value={destination}
                  list="destinations"
                  placeholder="Select or type a city"
                  className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
                <datalist id="destinations">
                  <option value="Singapore" />
                  <option value="Dubai" />
                  <option value="New York" />
                  <option value="Tokyo" />
                  <option value="London" />
                  <option value="Rome" />
                  <option value="Bali" />
                  <option value="Istanbul" />
                  <option value="Bangkok" />
                  <option value="Sydney" />
                </datalist>
              </div>

              {/* Date Pickers */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Check-In</label>
                  <input
                    type="date"
                    className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Check-Out</label>
                  <input
                    type="date"
                    className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Guests</label>
                <input
                  type="number"
                  min="1"
                  placeholder="Number of guests"
                  className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 text-sm sm:text-base rounded-lg transition duration-300"
              >
                Search Hotels
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
