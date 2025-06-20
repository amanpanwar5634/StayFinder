import React from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

export default function SidebarMenu() {
  const sideBarLinks = [
    { name: "DashBoard", path: "/owner", icon: assets.dashboardIcon },
    { name: "Add Room", path: "/owner/add-room", icon: assets.addIcon },
    { name: "List Room", path: "/owner/list-room", icon: assets.listIcon },
  ];

  return (
    <div className="w-64 h-full bg-white shadow-md px-4 py-6 space-y-3">
      {sideBarLinks.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          end
          className={({ isActive }) =>
            `flex items-center gap-4 p-3 rounded-lg transition-all duration-200
             ${
               isActive
                 ? "bg-blue-600 text-white shadow"
                 : "text-gray-700 hover:bg-gray-100"
             }`
          }
        >
          <img src={item.icon} alt={item.name} className="w-5 h-5" />
          <p className="text-base font-medium">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
}
