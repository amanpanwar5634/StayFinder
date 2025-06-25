import React, { useState } from "react";
import uploadIcon from "../../assets/uploadArea.svg";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function AddRoom() {
  const { axios, getToken } = useAppContext();
  const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null });

  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Free Wifi": false,
      "Free BreakFast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      !inputs.roomType ||
      !inputs.pricePerNight ||
      !inputs.amenities ||
      !Object.values(images).some((image) => image)
    ) {
      toast.error("Please fill in all the details");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", inputs.pricePerNight);

      const amenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key]
      );
      formData.append("amenities", JSON.stringify(amenities));

      Object.keys(images).forEach((key) => {
        if (images[key]) formData.append("images", images[key]);
      });

      const { data } = await axios.post("/api/rooms/", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        toast.success(data.message);
        setInputs({
          roomType: "",
          pricePerNight: 0,
          amenities: {
            "Free Wifi": false,
            "Free BreakFast": false,
            "Room Service": false,
            "Mountain View": false,
            "Pool Access": false,
          },
        });
        setImages({ 1: null, 2: null, 3: null, 4: null });
      } else {
        console.log("eroor->",data.message);
        toast.error(data.message);
      }
    } catch (err) {
    console.log("error->",err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-10 p-6 sm:p-10 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-3xl font-bold text-center text-indigo-900 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Add a Brand New Room
      </motion.h2>

      <form onSubmit={onSubmitHandler} className="space-y-8">
        {/* Image Upload */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-semibold text-gray-700">Upload Room Images</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.keys(images).map((key) => (
              <motion.label
                key={key}
                htmlFor={`roomImage${key}`}
                className="cursor-pointer rounded-lg overflow-hidden border-2 border-dashed border-indigo-300 hover:border-indigo-500 transition"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={images[key] ? URL.createObjectURL(images[key]) : uploadIcon}
                  alt="Upload"
                  className="w-full h-28 object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  id={`roomImage${key}`}
                  hidden
                  onChange={(e) =>
                    setImages({ ...images, [key]: e.target.files[0] })
                  }
                />
              </motion.label>
            ))}
          </div>
        </motion.div>

        {/* Room Type */}
        <motion.div
          className="space-y-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <label className="font-medium text-gray-700">Room Type</label>
          <select
            value={inputs.roomType}
            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
            className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suites">Family Suites</option>
          </select>
        </motion.div>

        {/* Price */}
        <motion.div
          className="space-y-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <label className="font-medium text-gray-700">
            Price <span className="text-sm text-gray-500">/ night</span>
          </label>
          <input
            type="number"
            placeholder="₹0"
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: e.target.value })
            }
            className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </motion.div>

        {/* Amenities */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-semibold text-gray-700">Amenities</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.keys(inputs.amenities).map((amenity, idx) => (
              <label key={idx} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={inputs.amenities[amenity]}
                  onChange={() =>
                    setInputs({
                      ...inputs,
                      amenities: {
                        ...inputs.amenities,
                        [amenity]: !inputs.amenities[amenity],
                      },
                    })
                  }
                />
                <span className="text-sm text-gray-600">{amenity}</span>
              </label>
            ))}
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-md font-medium shadow-md transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {loading ? "Adding..." : "Add Room"}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
}
