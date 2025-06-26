import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import Allroom from "./components/Allrooms/Allroom";
import RoomDetail from "./components/RoomDetail/RoomDetail";
import MyBooking from "./components/MyBooking/MyBooking";
import OwnerNavbar from "./components/HotelOwner/OwnerNavbar";
import HotelOwner from "./components/HotelOwner/HotelOwner";
import DashBoard from "./components/HotelOwner/DashBoard";
import AddRoom from "./components/HotelOwner/AddRoom";
import HotelList from "./components/HotelOwner/HotelList";
import { Toaster } from "react-hot-toast";
import RegModal from "./components/RegModal.jsx"; // ✅ Add this
import Loader from "./components/Loader.jsx";
export default function App() {
  const isownerPath = useLocation().pathname.includes("owner");

  return (
    <>
      <div>
        <Toaster />
        {!isownerPath && <Navbar />}
        {!isownerPath && <RegModal />} {/* ✅ Render RegModal only once */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<Allroom />} />
          <Route path='rooms/:id' element={<RoomDetail />} />
          <Route path='my-bookings' element={<MyBooking />} />
          <Route path='loader/:nextUrl'element={<Loader/>}/>
          <Route path="/owner" element={<HotelOwner />}>
            <Route index element={<DashBoard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<HotelList />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}
