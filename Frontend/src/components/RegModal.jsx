import React, { useState } from "react";
import { assets } from "../assets/assets"; // adjust path if needed

export default function RegModal() {
  const [formData, setFormData] = useState({
    hotelName: "",
    phone: "",
    address: "",
    city: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }
    console.log("Form Submitted:", formData);
    // Close modal manually
    document.getElementById("my_modal_2").close();
  };

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box p-0 max-w-4xl overflow-hidden">
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* Left: Image */}
          <div className="md:w-1/2 w-full bg-blue-100 flex justify-center items-center p-4">
            <img
              src={assets.regImage}
              alt="Register"
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>

          {/* Right: Form */}
          <div className="md:w-1/2 w-full p-6 space-y-4 bg-white">
            <h2 className="text-2xl font-bold text-blue-800 text-center">Register Your Hotel</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="hotelName"
                placeholder="Hotel Name"
                value={formData.hotelName}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />

              {/* Terms Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="checkbox checkbox-primary"
                />
                <label className="text-sm text-gray-600">
                  I agree to the terms and conditions.
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full mt-2"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Close on backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
