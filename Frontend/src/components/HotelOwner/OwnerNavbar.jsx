import { UserButton } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";

export default function OwnerNavbar() {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 right-0 z-50 transition-all ease-in-out duration-300 ${
        sticky
          ? "bg-white shadow-md dark:bg-slate-900 dark:text-white"
          : "bg-black bg-opacity-60 text-white"
      }`}
    >
      <div className="container mx-auto md:px-20 px-4">
        <div className="navbar bg-transparent">
          <div className="flex-1">
            <a className="btn btn-ghost text-3xl font-semibold">StayFinder</a>
          </div>
          <div className="flex-none">
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
}
