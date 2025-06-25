import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function HotelList() {
  const [rooms, setRooms] = useState([]);
  const { axios, getToken, user } = useAppContext();

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms/owner", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) setRooms(data.rooms);
      else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (user) fetchRooms();
  }, [user]);

  const handleToggle = async (id) => {
    const { data } = await axios.post(
      "/api/rooms/toggle-availability",
      { roomId: id },
      { headers: { Authorization: `Bearer ${await getToken()}` } }
    );

    if (data.success) {
      toast.success(data.message);
      fetchRooms();
    } else {
      toast.error(data.message);
    }
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-4xl font-extrabold text-indigo-900 mb-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        🛏️ Manage Your Rooms
      </motion.h2>

      <motion.div
        className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="bg-indigo-50 text-indigo-700 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-6 py-4 w-1/4">Room</th>
              <th className="px-6 py-4 w-1/2">Amenities</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Available</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <motion.tr
                key={room._id}
                className="border-t hover:bg-indigo-50 transition"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                {/* Room Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={room.images[0]}
                      alt={room.roomType}
                      className="w-16 h-16 object-cover rounded-lg shadow-md"
                    />
                    <div>
                      <div className="font-semibold text-indigo-800 text-base">
                        {room.roomType}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {room._id.slice(0, 6)}...
                      </div>
                    </div>
                  </div>
                </td>

                {/* Amenities */}
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity, idx) => (
                      <motion.span
                        key={idx}
                        className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        {amenity}
                      </motion.span>
                    ))}
                  </div>
                </td>

                {/* Price */}
                <td className="px-6 py-4 font-semibold text-green-600">
                  ₹{room.pricePerNight}
                </td>

                {/* Availability Toggle */}
                <td className="px-6 py-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={room.isAvailable}
                      onChange={() => handleToggle(room._id)}
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full transition-all relative">
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                          room.isAvailable ? "translate-x-5" : ""
                        }`}
                      ></div>
                    </div>
                  </label>
                </td>
              </motion.tr>
            ))}
            {rooms.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  No rooms available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
