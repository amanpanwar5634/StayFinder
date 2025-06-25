import React, { useState, useEffect } from "react";
import { assets, cities } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import { toast } from "react-hot-toast";

export default function RegModal() {
  const { showHotelReg, setShowHotelReg, axios, getToken, setIsOwner,isOwner } = useAppContext();

  const [formData, setFormData] = useState({
    hotelName: "",
    phone: "",
    address: "",
    city: "",
    termsAccepted: false,
  });

  useEffect(() => {
    const modal = document.getElementById("my_modal_2");
    if (!modal) return;
    if (showHotelReg) modal.showModal();
    else modal.close();
  }, [showHotelReg]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/hotels/",
        {
          name: formData.hotelName,
          address: formData.address,
          contact: formData.phone,
          city: formData.city,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message || "Hotel registered successfully!");
        setIsOwner(true);
        document.getElementById("my_modal_2").close(); // ✅ Close modal
        setShowHotelReg(false); // optional for state syncx
        console.log("after the addinge isOwner value",isOwner);
      } else {
        toast.error(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message || "Something went wrong.");
    }
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

              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="select select-bordered w-full"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

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

              <button type="submit" className="btn btn-primary w-full mt-2">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Close on backdrop */}
      <form method="dialog" className="modal-backdrop" onClick={() => setShowHotelReg(false)}>
        <button>close</button>
      </form>
    </dialog>
  );
}
