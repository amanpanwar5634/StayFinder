import { UserButton } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiMenu } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

export default function OwnerNavbar() {
  const [sticky, setSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sidebarLinks = [
    { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
    { name: "Add Room", path: "/owner/add-room", icon: assets.addIcon },
    { name: "List Room", path: "/owner/list-room", icon: assets.listIcon },
  ];

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed left-0 top-0 right-0 z-50 transition-all duration-300 ${
        sticky
          ? "bg-white shadow-md text-gray-800 dark:bg-slate-900 dark:text-white"
          : "bg-gradient-to-b from-black/70 to-transparent text-white"
      }`}
    >
      <div className="container mx-auto md:px-20 px-4">
        <div className="navbar py-2 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-4"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Hamburger menu (mobile only) */}
            <div className="md:hidden relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <HiMenu className="text-2xl" />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-10 left-0 w-48 bg-white text-black shadow-md rounded-lg py-2 z-50">
                  {sidebarLinks.map((link, index) => (
                    <NavLink
                      to={link.path}
                      key={index}
                      onClick={() => setIsDropdownOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 hover:bg-gray-100 ${
                          isActive ? "bg-blue-100 font-semibold" : ""
                        }`
                      }
                    >
                      <img
                        src={link.icon}
                        alt={link.name}
                        className="w-5 h-5"
                      />
                      {link.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Logo */}
            <a
              className="text-2xl font-bold tracking-wide hover:text-yellow-400 transition duration-300"
              href="/"
            >
              StayFinder
            </a>
          </motion.div>

          {/* User Avatar */}
          <motion.div
            className="flex-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <UserButton />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
