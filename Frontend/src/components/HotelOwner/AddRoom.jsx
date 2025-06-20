import React, { useState } from "react";
import uploadIcon from "../../assets/uploadArea.svg"; // adjust path as needed

export default function AddRoom() {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: 0,
    amenities: {
      'Free Wifi': false,
      'Free BreakFast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false,
    },
  });

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add New Room</h2>

      <form className="space-y-6">
        {/* Images Upload */}
        <div>
          <p className="font-medium mb-2">Images</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.keys(images).map((key) => (
              <label
                htmlFor={`roomImage${key}`}
                key={key}
                className="cursor-pointer border border-gray-300 rounded-md overflow-hidden"
              >
                <img
                  src={
                    images[key]
                      ? URL.createObjectURL(images[key])
                      : uploadIcon
                  }
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
              </label>
            ))}
          </div>
        </div>

        {/* Room Type */}
        <div>
          <p className="font-medium mb-1">Room Type</p>
          <select
            value={inputs.roomType}
            onChange={(e) =>
              setInputs({ ...inputs, roomType: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suites">Family Suites</option>
          </select>
        </div>

        {/* Price Per Night */}
        <div>
          <p className="font-medium mb-1">
            Price <span className="text-sm text-gray-500">/Night</span>
          </p>
          <input
            type="number"
            placeholder="0"
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        {/* Amenities */}
        <div>
          <p className="font-medium mb-2">Amenities</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.keys(inputs.amenities).map((amenity, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`amenities${index + 1}`}
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
                <label htmlFor={`amenities${index + 1}`}>
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Add Room
          </button>
        </div>
      </form>
    </div>
  );
}
