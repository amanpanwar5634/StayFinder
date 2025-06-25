import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
 import {useAppContext} from "../../context/AppContext.jsx"
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaWifi, FaCheckCircle } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { IoMdPricetags } from "react-icons/io";
import { FaUserTie } from "react-icons/fa"

import {toast} from "react-hot-toast";

export default function RoomDetail() {
  const { id } = useParams();
  const { rooms,getToken,axios,navigate } = useAppContext();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate,setCheckInDate]=useState(null);
    const [checkOutDate,setCheckOutDate]=useState(null);
      const [guests,setGuests]=useState(1);
 const [isAvailable,setIsAvailable]=useState(false);

  useEffect(() => {
    const selectedRoom = rooms.find((r) => r._id === id);
    if (selectedRoom) {
      setRoom(selectedRoom);
      setMainImage(selectedRoom.images?.[0] || "https://via.placeholder.com/600x400");
    }
  }, [id, rooms]);
  const checkAvialability=async()=>{
    try{
      if(checkInDate>=checkOutDate){
        toast.error('CHECK IN DATA SHOULD BE LESS THEN CHEKCOUT DATE') 
        return;
      }
      const {data}=await axios.post(`/api/bookings/check-availability`,{room:id,checkInDate,checkOutDate})
      if(data.success){
        if(data.isAvailable){setIsAvailable(true);toast.success('Room is available')}
        else{setIsAvailable(false); toast.error("Room is not available")}
      }else{
        toast.error(data.message);
      }
    }catch(err){
      toast.error(err.message);
    }
  }
  //onsubmit handler to checkAvailability and book the room
  const onSubmitHandler=async(e)=>{
    try{
      e.preventDefault();
       if(!isAvailable){
        return checkAvialability();
       }else{
        const {data}=await axios.post(`/api/bookings/book`,{room:id,checkInDate,checkOutDate,guests,paymentMethod:"pay at hotel"},
          {headers:{Authorization:`Bearer ${await getToken()}`}}
        )
         if(data.success){
            toast.success(data.message);
            navigate(`/my-bookings`);
            scroll(0,0)
          }else{
            toast.error(data.message);
          }
       }
    }catch(err){
toast.error(err.message)
    }
  }

  return (
    room && (
      <div className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-800 space-y-12">
        
        {/* Room Overview */}
        {/* Animated Intro Section */}
<motion.div
  className="max-w-4xl mx-auto text-center space-y-4 mt-6 sm:mt-10"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
>
 <motion.h2
  className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-md"
  initial={{ opacity: 0, scale: 0.8, y: -20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{
    delay: 0.3,
    duration: 0.8,
    type: "spring",
    stiffness: 100,
  }}
>
  Experience Comfort & Luxury Like Never Before
</motion.h2>

  <motion.p
    className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
  >
    Dive into the charm of our premium rooms equipped with modern amenities, perfect for business trips or family getaways. Scroll down to explore room features, gallery, availability, and more.
  </motion.p>
</motion.div>

     <motion.section
  className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 border border-blue-100"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <motion.h1
    className="text-3xl sm:text-4xl font-extrabold text-blue-900"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    {room.title}
  </motion.h1>

  {/* Location & Rating */}
<motion.div
  className="flex flex-col sm:flex-row justify-between gap-6 text-base sm:text-lg font-medium"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
>
  <div className="flex items-center gap-3 text-indigo-700 bg-indigo-50 px-4 py-2 rounded-lg shadow-sm">
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <FaMapMarkerAlt className="text-indigo-600 text-xl sm:text-2xl" />
    </motion.div>
    <span>
      {room.hotel?.address}, {room.hotel?.city}
    </span>
  </div>
</motion.div>


  {/* Room Info Grid */}
  <motion.div
    className="grid grid-cols-1 md:grid-cols-2 gap-5 text-gray-700 text-sm sm:text-base"
    initial="hidden"
    animate="visible"
    variants={{
      visible: {
        transition: {
          staggerChildren: 0.15,
        },
      },
    }}
  >
    {/* Room Type */}
    <motion.div
      className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg shadow hover:shadow-md transition"
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    >
      <MdMeetingRoom className="text-blue-600 text-xl mt-1" />
      <div>
        <div className="font-semibold text-blue-800 mb-1">Room Type</div>
        <div>{room.roomType}</div>
      </div>
    </motion.div>

    {/* Price */}
    <motion.div
      className="flex items-start gap-3 bg-green-50 p-4 rounded-lg shadow hover:shadow-md transition"
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    >
      <IoMdPricetags className="text-green-600 text-xl mt-1" />
      <div>
        <div className="font-semibold text-green-800 mb-1">Price Per Night</div>
        <div>₹{room.pricePerNight}</div>
      </div>
    </motion.div>

    {/* Amenities */}
    <motion.div
      className="md:col-span-2 bg-white border border-blue-100 p-4 rounded-lg shadow-sm hover:shadow-md transition"
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    >
      <div className="flex items-center gap-2 text-blue-800 font-semibold mb-2">
        <FaWifi className="text-blue-500" />
        Amenities
      </div>
      {room.amenities?.length ? (
        <div className="flex flex-wrap gap-2">
          {room.amenities.map((amenity, idx) => (
            <motion.span
              key={idx}
              className="bg-blue-100 text-blue-700 text-xs sm:text-sm font-medium px-3 py-1 rounded-full shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {amenity}
            </motion.span>
          ))}
        </div>
      ) : (
        <span className="text-gray-500">No amenities listed.</span>
      )}
    </motion.div>

    {/* Availability */}
    <motion.div
      className="md:col-span-2 bg-white border border-green-200 p-4 rounded-lg shadow-sm hover:shadow-md transition"
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    >
      <div className="flex items-center gap-2 font-semibold text-blue-800 mb-2">
        <FaCheckCircle className="text-green-500" />
        Availability
      </div>
      <span
        className={`inline-block px-4 py-1 rounded-full font-semibold text-sm ${
          room.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {room.isAvailable ? "Available for Booking" : "Currently Unavailable"}
      </span>
    </motion.div>
  </motion.div>
</motion.section>


{/* Gallery */}
<section className="max-w-6xl mx-auto">
  <img
    src={mainImage}
    alt="Main Room"
    className="w-full max-h-[400px] object-cover rounded-lg shadow-lg mb-4"
  />
  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
    {room.images.map((img, idx) => (
      <img
        key={idx}
        src={img}
        alt={`Thumbnail ${idx}`}
        className={`w-full h-20 sm:h-24 object-cover rounded-md cursor-pointer transition duration-200 hover:scale-105 border-2 ${
          mainImage === img ? "border-blue-500" : "border-transparent"
        }`}
        onClick={() => setMainImage(img)}
      />
    ))}
  </div>
</section>

{/* Booking Form */}
<section className="max-w-6xl mx-auto bg-white rounded-xl p-6 sm:p-8 shadow-md space-y-6">
  <h2 className="text-xl sm:text-2xl font-bold text-blue-800">Book Your Stay</h2>
  <form onSubmit={onSubmitHandler} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <div>
      <label className="text-sm font-semibold text-gray-600">Check-In</label>
      <input
        type="date"
        className="mt-1 border px-3 py-2 rounded w-full text-sm"
        onChange={(e) => setCheckInDate(e.target.value)}
        min={new Date().toISOString().split("T")[0]}
        required
      />
    </div>
    <div>
      <label className="text-sm font-semibold text-gray-600">Check-Out</label>
      <input
        type="date"
        className="mt-1 border px-3 py-2 rounded w-full text-sm"
        onChange={(e) => setCheckOutDate(e.target.value)}
        min={checkInDate}
        disabled={!checkInDate}
        required
      />
    </div>
    <div>
      <label className="text-sm font-semibold text-gray-600">Guests</label>
      <input
        type="number"
        min="1"
        className="mt-1 border px-3 py-2 rounded w-full text-sm"
        onChange={(e) => setGuests(e.target.value)}
        value={guests}
        required
      />
    </div>
    <div className="flex items-end">
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded shadow text-sm"
      >
        {isAvailable ? "Book Now" : "Check Availability"}
      </button>
    </div>
  </form>
</section>

{/* Hotel Owner Info */}
{room.hotel?.owner && (
  <motion.section
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="max-w-6xl mx-auto bg-gradient-to-r from-indigo-50 to-blue-50 border border-blue-200 p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6"
>
  {/* Owner Info */}
  <div className="flex items-center gap-4">
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    >
      <img
        src={room.hotel.owner.image}
        alt="Owner"
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-indigo-300 shadow-md"
      />
    </motion.div>
    <div>
      <h3 className="text-xl sm:text-2xl font-bold text-indigo-900">{room.hotel.name}</h3>
      <p className="text-sm sm:text-base text-gray-600 flex items-center gap-2">
        <FaUserTie className="text-indigo-600" /> Managed by <span className="font-medium text-gray-800">{room.hotel.owner.username}</span>
      </p>
    </div>
  </div>

  {/* Contact Button */}
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 sm:py-3 rounded-lg shadow-md text-base font-semibold transition"
  >
    Contact Owner
  </motion.button>
</motion.section>
)}

      </div>
    )
  );
}
