import React, { useState, useEffect } from "react";
import locationIcon from "../../assets/locationIcon.svg";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function MyBooking() {
  const { axios, getToken, user } = useAppContext();
  const [booking, setBooking] = useState([]);

  const fetchUserBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        console.log("data.bookings ->", data.bookings);
        setBooking(data.bookings);
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };
const handlePayment=async(bookingId)=>{
  try{
    const{data}=await axios.post('/api/bookings/stripe-payment',
      {bookingId},{headers:{Authorization:`Bearer ${await getToken()}`}})
      console.log("Data->",data,"data sucess->",data.success);
      if(data.success){window.location.href=data.url}
      else{console.log("errorpayment->",data.message);
        toast.error(data.messge)}
  }
  catch(err){
    console.log("payment error->",err.message);
toast.error(err.message);
  }
}
  useEffect(() => {
    if (user) fetchUserBookings();
  }, [user]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <motion.div
      className="p-6 md:p-10 min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h1
        className="text-4xl font-bold mb-10 text-center text-blue-900 underline underline-offset-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        My Bookings
      </motion.h1>

      {/* Column Headings */}
      <div className="hidden md:grid grid-cols-3 font-semibold text-blue-700 text-lg mb-4 px-4">
        <div>🏨 Hotel</div>
        <div>📅 Dates & Timing</div>
        <div>💳 Payment</div>
      </div>

      {/* Booking List */}
      {booking.map((b, index) => (
        <motion.div
          key={b._id}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Hotel Info */}
          <div className="flex flex-col sm:flex-row gap-4">
            <img
              src={b.room.images[0]}
              alt={b.hotel.name}
              className="w-full sm:w-32 h-24 object-cover rounded-md border border-gray-200"
            />
            <div className="flex flex-col justify-center">
              <h2 className="text-xl font-bold text-blue-800">{b.hotel.name}</h2>
              <p className="text-sm text-gray-600 mb-1">{b.room.roomType}</p>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <img src={locationIcon} alt="location" className="w-4 h-4" />
                <span>
                  {b.hotel.address}, {b.hotel.city}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                <FaUsers className="text-blue-500" />
                <span>Guests: {b.guests}</span>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="text-sm flex flex-col justify-center space-y-2">
            <p className="flex items-center gap-2 text-gray-700">
              <FaCalendarAlt className="text-blue-500" />
              <span>
                <strong>Check-In:</strong> {formatDate(b.checkInDate)}
              </span>
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaCalendarAlt className="text-blue-500" />
              <span>
                <strong>Check-Out:</strong> {formatDate(b.checkOutDate)}
              </span>
            </p>
          </div>

          {/* Payment */}
          <div className="flex flex-col justify-center items-start md:items-center gap-3">
            {b.isPaid ? (
              <span className="px-4 py-1 rounded-full text-sm bg-green-100 text-green-700 font-semibold">
                ✅ Paid
              </span>
            ) : (
              <>
                <span className="px-4 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700 font-semibold">
                  ⏳ Pending
                </span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 text-sm rounded shadow transition"
                onClick={()=>handlePayment(b._id)}>
                  Pay Now
                </button>
              </>
            )}
            <p className="text-sm text-gray-500 font-medium">
              ₹{b.totalPrice} via {b.paymentMethod}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
