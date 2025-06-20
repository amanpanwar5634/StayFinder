import React, { useState } from "react";
import { roomsDummyData } from "../../assets/assets";

export default function HotelList() {
  const [rooms, setRooms] = useState(roomsDummyData);

  const handleToggle = (id) => {
    const updatedRooms = rooms.map((room) =>
      room._id === id
        ? { ...room, isAvailable: !room.isAvailable }
        : room
    );
    setRooms(updatedRooms);
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">🛏️ All Rooms</h2>

      <div className="overflow-x-auto shadow-xl rounded-lg bg-white border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-6 py-4 w-1/4">Room</th>
              <th className="px-6 py-4 w-1/2">Facilities</th>
              <th className="px-6 py-4">Price/Night</th>
              <th className="px-6 py-4">Availability</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id} className="border-t hover:bg-gray-50">
                
                {/* Room Image + Name */}
                <td className="px-6 py-4 align-top">
                  <div className="flex items-center gap-3">
                    <img
                      src={room.images[0]}
                      alt={room.roomType}
                      className="w-14 h-14 object-cover rounded-md shadow"
                    />
                    <span className="font-semibold">{room.roomType}</span>
                  </div>
                </td>

                {/* Facilities */}
                <td className="px-6 py-4 align-top">
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Price */}
                <td className="px-6 py-4 align-top font-medium">
                  ${room.pricePerNight}
                </td>

                {/* Toggle Button */}
                <td className="px-6 py-4 align-top">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={room.isAvailable}
                      onChange={() => handleToggle(room._id)}
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full peer relative transition-all">
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          room.isAvailable ? "translate-x-5" : ""
                        }`}
                      ></div>
                    </div>
                  </label>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
