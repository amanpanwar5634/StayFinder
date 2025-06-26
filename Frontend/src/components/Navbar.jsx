import React, { useState, useEffect } from "react";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import RegModal from "./RegModal";

const BookIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6m0 0v6m0-6H6m6 0h6"
    />
  </svg>
);

export default function Navbar() {
  const { openSignIn } = useClerk();
  const location = useLocation();
  const { user, navigate, isOwner, setShowHotelReg } = useAppContext();
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        sticky
          ? "bg-white shadow-md text-gray-800"
          : "bg-gradient-to-b from-black/70 to-transparent text-white"
      }`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="navbar container mx-auto px-4 py-2">
        {/* Mobile */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-white rounded-lg w-52 text-gray-800 space-y-2"
            >
              <li><a href="/" className="hover:text-yellow-500">Home</a></li>
              <li><a href="/rooms" className="hover:text-yellow-500">Hotels</a></li>
              <li><a href="#" className="hover:text-yellow-500">Experience</a></li>
              {user && (
                isOwner ? (
                  <li><a href="/owner" className="hover:text-yellow-500">Dashboard</a></li>
                ) : (
                  <li>
                    <button
                      className="btn btn-sm bg-yellow-400 hover:bg-yellow-500 text-black transition"
                      onClick={() => {
                        setShowHotelReg(true);
                        document.getElementById("my_modal_2").showModal();
                      }}
                    >
                      Add Your Hotel
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold tracking-wide ml-2"
          >
            StayFinder
          </motion.a>
        </div>

        {/* Desktop */}
        <motion.div
          className="navbar-center hidden lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ul className="menu menu-horizontal gap-6 text-md font-semibold tracking-wide">
            {["Home", "Hotels", "Experience"].map((label, i) => (
              <motion.li
                key={label}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a
                  href={label === "Home" ? "/" : label === "Hotels" ? "/rooms" : "#"}
                  className="relative group"
                >
                  {label}
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </motion.li>
            ))}

            {user && (
              isOwner ? (
                <motion.li whileHover={{ scale: 1.05 }}>
                  <a href="/owner" className="relative group">
                    Dashboard
                    <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                  </a>
                </motion.li>
              ) : (
                <motion.li whileHover={{ scale: 1.05 }}>
                  <a
  href="#"
  onClick={(e) => {
    e.preventDefault(); // Prevent the default link behavior
    setShowHotelReg(true);
    document.getElementById("my_modal_2").showModal();
  }}
  className="hover:text-yellow-500"
>
  Add Your Hotel
</a>

                </motion.li>
              )
            )}
          </ul>
        </motion.div>

        {/* Right: Auth */}
        <div className="navbar-end space-x-4">
          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<BookIcon />}
                  onClick={() => navigate("/my-bookings")}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-yellow-400 text-black px-5 py-2 rounded-md hover:bg-yellow-500 transition"
              onClick={openSignIn}
            >
              Log In
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
