import React from "react";
import SidebarMenu from "./SidebarMenu";
import { Outlet } from "react-router-dom";

export default function OwnerContent() {
  return (
    <div className="flex h-[calc(100vh-4rem)] pt-20">
      {/* Sidebar */}
      <SidebarMenu />

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}
