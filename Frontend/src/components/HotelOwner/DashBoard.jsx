import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";

export default function DashBoard() {
  const { currency, user, getToken, toast, axios } = useAppContext();
  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/bookings/hotel", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  return (
    <motion.div
      className="space-y-10 p-6 sm:p-10 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Title */}
      <motion.h1
        className="text-4xl font-bold text-indigo-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Dashboard Overview
      </motion.h1>

      {/* Stat Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {/* Revenue Card */}
        <motion.div
          className="bg-white shadow-xl hover:shadow-2xl p-6 rounded-xl border-l-4 border-green-400"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        >
          <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
          <h2 className="text-3xl font-bold text-green-600">
            ₹<CountUp end={dashboardData.totalRevenue} duration={1.5} separator="," />
          </h2>
        </motion.div>

        {/* Booking Count Card */}
        <motion.div
          className="bg-white shadow-xl hover:shadow-2xl p-6 rounded-xl border-l-4 border-blue-400"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        >
          <p className="text-sm text-gray-500 mb-1">Total Bookings</p>
          <h2 className="text-3xl font-bold text-blue-600">
            <CountUp end={dashboardData.totalBookings} duration={1.5} />
          </h2>
        </motion.div>
      </motion.div>

      {/* Table */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-indigo-800 mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-sm text-gray-700 rounded-md">
            <thead className="bg-indigo-100 text-indigo-800 font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">User Name</th>
                <th className="px-4 py-3 text-left">Room Type</th>
                <th className="px-4 py-3 text-left">Total Amount</th>
                <th className="px-4 py-3 text-left">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.bookings.length > 0 ? (
                dashboardData.bookings.map((item, index) => (
                  <motion.tr
                    key={index}
                    className="border-t hover:bg-indigo-50 transition duration-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-4 py-3">{item.user.username}</td>
                    <td className="px-4 py-3">{item.room.roomType}</td>
                    <td className="px-4 py-3">₹{item.totalPrice}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-400">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
