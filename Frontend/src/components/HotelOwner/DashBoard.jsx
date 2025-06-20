import React, { useState } from "react";
import { dashboardDummyData } from "../../assets/assets";

export default function DashBoard() {
  const [dashboardData] = useState(dashboardDummyData);

  return (
    <div className="space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-800">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold text-green-600">${dashboardData.totalRevenue}</h2>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <h2 className="text-2xl font-bold text-blue-600">{dashboardData.totalBookings}</h2>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">User Name</th>
                <th className="px-4 py-3 text-left">Room Type</th>
                <th className="px-4 py-3 text-left">Total Amount</th>
                <th className="px-4 py-3 text-left">Payment Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {dashboardData.bookings.map((item, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-4 py-3">{item.user.username}</td>
                  <td className="px-4 py-3">{item.room.roomType}</td>
                  <td className="px-4 py-3">${item.totalPrice}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        item.isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
              {dashboardData.bookings.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-400">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
