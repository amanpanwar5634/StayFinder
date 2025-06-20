import React, { useState, useEffect } from "react";
import { useUser, useClerk, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`container mx-auto md:px-20 px-4 fixed left-0 top-0 right-0 z-50 transition-all ease-in-out duration-300 ${
        sticky
          ? "bg-white shadow-md dark:bg-slate-900 dark:text-white"
          : "bg-black bg-opacity-60 text-white"
      }`}
    >
      <div className="navbar">
        {/* Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              className={`menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[1]`}
            >
              <li><a href="/">Home</a></li>
              <li><a href="/rooms">Hotels</a></li>
              <li><a href="#">Experience</a></li>
              <li><a href="#">About</a></li>
             {user && <li><a href="/dashboard">Dashboard</a></li> } 
            </ul>
          </div>
          <a className="btn btn-ghost text-3xl">StayFinder</a>
        </div>

        {/* Desktop Menu Centered */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4 text-md font-medium">
            <li><a href="/">Home</a></li>
            <li><a href="/rooms">Hotels</a></li>
            <li><a href="#">Experience</a></li>
            <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>about</button><RegModal/>
            {user && <li><a href="/dashboard">Dashboard</a></li> }
          </ul>
        </div>

        {/* User Buttons */}
        <div className="navbar-end space-x-3">
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
            <button
              className="bg-yellow-400 text-black px-5 py-2 rounded-md hover:bg-yellow-500 transition duration-300"
              onClick={openSignIn}
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
