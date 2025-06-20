import React from "react";
import OwnerNavbar from "./OwnerNavbar";
import OwnerContent from "./OwnerContent";

export default function HotelOwner() {
  return (
    <div className="flex flex-col h-screen">
      <OwnerNavbar />
      <div className="mt-6 md:mt-6">
        <OwnerContent />
      </div>
    </div>
  );
}
