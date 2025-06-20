import React from "react";
import { useNavigate } from "react-router-dom";

export default function Roomlist({ data }) {
    const navigate=useNavigate();
  return (
    <div className="flex flex-col gap-6 p-4 max-w-full">
      {data.map(({ room }) => (
  <div
    key={room.id}
    className="w-full max-w-[900px] mx-auto bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-4"
  >
    <img
      src={room.images[0]}
      alt={room.title}
      className="w-full md:w-1/3 h-48 md:h-auto object-cover rounded-lg"
    />

    <div
      className="flex flex-col justify-between w-full md:w-2/3 cursor-pointer"
      onClick={() => {
        navigate(`/rooms/${room.id}`);
      }}
    >
      <div>
        <h2 className="text-xl font-semibold">{room.title}</h2>
        <p className="text-gray-500">{room.address}</p>
        <p className="text-sm text-gray-600 mt-1">City: {room.city}</p>
        <p className="mt-1 text-gray-700">₹{room.rupeesPerNight} / night</p>
        <p className="text-yellow-500">⭐ {room.rating}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-2 text-sm">
        {room.facilities.map((f, index) => (
          <span
            key={index}
            className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"
          >
            <span>{f.icon}</span>
            <span>{f.label}</span>
          </span>
        ))}
      </div>
    </div>
  </div>
))}

    </div>
  );
}
