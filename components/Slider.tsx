"use client";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "All bank features at your fingertips",
    subtitle: "Send, withdraw, and manage money instantly",
  },
  {
    title: "Fast. Secure. 24/7",
    subtitle: "Instant transfers with real-time support",
  },
];

export default function TextSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === 0 ? 1 : 0));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-6 px-4">
      <div className="relative overflow-hidden rounded-3xl shadow-lg bg-linear-to-r from-blue-600 to-indigo-600">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="w-full shrink-0 px-8 py-14 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                {slide.title}
              </h2>
              <p className="text-sm sm:text-base text-white/90">
                {slide.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
