import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RoomData from "../list.json";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

export default function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const data = RoomData.find((r) => r.room?.id === id || r.id === id);
    const selectedRoom = data?.room || data;
    if (selectedRoom) {
      setRoom(selectedRoom);
      setMainImage(selectedRoom.images?.[0] || "https://via.placeholder.com/600x400");
    }
  }, [id]);

  return (
    room && (
      <div className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-800 space-y-12">
        
        {/* Room Overview */}
        <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-blue-100">
          <h1 className="text-4xl font-extrabold text-blue-900">{room.title}</h1>

          <div className="flex flex-col md:flex-row justify-between gap-3">
            <div className="flex items-center gap-2 text-blue-700 text-lg">
              <FaMapMarkerAlt className="text-blue-500" />
              <span className="font-medium">{room.address}, {room.city}</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-500 text-xl font-bold">
              <FaStar /> {room.rating} / 5
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-lg">
            <div><strong className="text-blue-800">Room Type:</strong> {room.roomType}</div>
            <div><strong className="text-blue-800">Price Per Night:</strong> ₹{room.rupeesPerNight}</div>
            <div className="md:col-span-2"><strong className="text-blue-800">Facilities:</strong> {room.facilities.map(f => f.label).join(", ")}</div>
            <div className="md:col-span-2">
              <strong className="text-blue-800">Description:</strong>{" "}
              {room.description || "No description available."}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="max-w-6xl mx-auto">
          <img
            src={mainImage}
            alt="Main Room"
            className="w-full h-[400px] object-cover rounded-lg shadow-md mb-4"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {room.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                className={`w-full h-24 object-cover rounded-md cursor-pointer transition-all duration-200 hover:scale-105 border-2 ${
                  mainImage === img ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </section>

        {/* Booking Form */}
        <section className="max-w-6xl mx-auto bg-white rounded-xl p-8 shadow-md space-y-6">
          <h2 className="text-2xl font-bold text-blue-800">Book Your Stay</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">Check-In</label>
              <input type="date" className="mt-1 border px-4 py-2 rounded w-full" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Check-Out</label>
              <input type="date" className="mt-1 border px-4 py-2 rounded w-full" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Guests</label>
              <input type="number" min="1" className="mt-1 border px-4 py-2 rounded w-full" placeholder="Guests" />
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow">
                Check Availability
              </button>
            </div>
          </div>
        </section>

        {/* Hotel Owner */}
        {room.hotel?.owner && (
          <section className="max-w-6xl mx-auto bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={room.hotel.owner.image}
                alt="Owner"
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-300"
              />
              <div>
                <h3 className="text-xl font-semibold text-blue-900">{room.hotel.name}</h3>
                <p className="text-sm text-gray-700">Managed by {room.hotel.owner.name}</p>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow">
              Contact Owner
            </button>
          </section>
        )}
      </div>
    )
  );
}
