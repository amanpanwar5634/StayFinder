import React from "react";
import Testimonials from "../Testimonial.json";
import TestimonialCard from "./TestimonialCard";

export default function Testimonial() {
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white">
          What Our Guests <span className="text-yellow-500">Say</span>
        </h1>
        <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Real experiences from real people. See what our happy customers have to say
          about their stays.
        </p>
      </div>

      {/* Testimonial Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Testimonials.map((item) => (
          <TestimonialCard key={item.id} testimonial={item} />
        ))}
      </div>
    </div>
  );
}
