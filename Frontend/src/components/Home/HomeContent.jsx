import React from "react";

export default function HomeContent() {
  return (
    <div
      className="hero h-[90vh] w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1350&q=80)", // Elegant hotel background
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-60 flex items-center h-full px-6 md:px-20">
        <div className=" mt-16 md:mt-4 flex flex-col md:flex-row justify-between items-center w-full max-w-screen-2xl mx-auto gap-10">
          {/* Left Side: Text */}
          <div className="text-white max-w-xl">
            <div className="inline-block bg-yellow-400 text-black font-semibold px-4 py-1 rounded-full mb-4 text-sm shadow-md">
              🏨 Your Perfect Stay Awaits
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              Book Luxury Hotels in Seconds
            </h1>
            <p className="text-lg font-light mb-6">
              Explore top-rated hotels across the world. Whether it's a weekend getaway or a business trip, we've got you covered.
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg">
              Discover More
            </button>
          </div>

          {/* Right Side: Booking Form */}
          <div className="bg-white bg-opacity-90 backdrop-blur-lg p-8 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Book Your Stay</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Destination</label>
                <input
  list="destinations"
  name="destination"
  placeholder="Select or type a city"
  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
/>
<datalist id="destinations">
  <option value="Paris" />
  <option value="Dubai" />
  <option value="New York" />
  <option value="Tokyo" />
  <option value="London" />
  <option value="Rome" />
  <option value="Bali" />
  <option value="Istanbul" />
  <option value="Bangkok" />
  <option value="Sydney" />
</datalist>

              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Check-In</label>
                  <input
                    type="date"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Check-Out</label>
                  <input
                    type="date"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Guests</label>
                <input
                  type="number"
                  min="1"
                  placeholder="Number of guests"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition duration-300"
              >
                Search Hotels
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
