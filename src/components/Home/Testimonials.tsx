import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Background Image import
import bgImg2 from "../../img/bgImg1.png";

// Real client/team images from src/img/Imgh
import TejasImg from "../../img/Imgh/Tejas.jpg.jpeg";
import AnushkaImg from "../../img/Imgh/Anushka.jpg.jpeg";
import PratapImg from "../../img/Imgh/Pratap.jpg.jpeg";

const testimonials = [
  {
    name: "Tejas Patil",
    company: "E-Commerce Founder",
    image: TejasImg,
    review:
      "Working with this team completely transformed our online presence. Within just a few months, our revenue increased significantly and customer acquisition became much more efficient.",
  },
  {
    name: "Anushka Deshmukh",
    company: "Healthcare Clinic Owner",
    image: AnushkaImg,
    review:
      "Their SEO and advertising strategy helped us attract more local patients than ever before. The results were measurable, transparent, and exceeded our expectations.",
  },
  {
    name: "Pratap Singh",
    company: "Real Estate Consultant",
    image: PratapImg,
    review:
      "The lead generation campaigns delivered high-quality prospects consistently. Their team was proactive, responsive, and focused on real business growth.",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play cycle every 5 seconds, pauses when user hovers or interacts
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative overflow-hidden py-24 px-5 md:px-10 lg:px-20 bg-white">
      {/* Background Image & Light Yellow Glow Blend */}
      <div className="absolute inset-0 -z-10">
        <img
          src={bgImg2}
          alt="Background Image"
          className="w-full h-full object-cover object-center opacity-95"
        />
        <div className="absolute inset-0 bg-white/30"></div>
      </div>

      {/* Decorative Golden / Yellow Radial Glows for premium depth */}
      <div className="absolute top-10 left-1/4 h-80 w-80 rounded-full bg-yellow-400/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-amber-500/20 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-yellow-500/40 bg-black text-white text-xs font-semibold tracking-widest uppercase shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
            Client Testimonials
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold text-black font-display tracking-tight">
            Trusted By Businesses{" "}
            <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
              That Want Results
            </span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-black font-bold text-base md:text-lg opacity-90">
            Real feedback from clients who partnered with us to scale their
            business, increase revenue, and build a stronger digital presence.
          </p>
        </div>

        {/* Testimonials Grid / Mobile Slider */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {testimonials.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoPlaying(false);
                }}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  setIsAutoPlaying(false);
                }}
                onMouseLeave={() => setIsAutoPlaying(true)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 cursor-pointer select-none flex flex-col justify-between ${
                  isActive
                    ? "bg-neutral-900/60 border-2 border-yellow-500 shadow-[0_20px_50px_rgba(234,179,8,0.25)] backdrop-blur-lg scale-[1.03] z-10"
                    : "bg-neutral-800/10 border border-neutral-400/20 backdrop-blur-md opacity-70 md:opacity-85 scale-100 hover:opacity-100 hover:bg-neutral-800/15"
                } ${isActive ? "block" : "hidden md:flex"}`}
              >
                {/* Quote Icon */}
                <div className={`absolute top-4 right-6 text-7xl font-bold font-serif leading-none transition-colors duration-300 ${
                  isActive ? "text-yellow-400/15" : "text-black/5"
                }`}>
                  “
                </div>

                <div>
                  {/* Stars Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={`transition-colors duration-300 ${
                          isActive 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "fill-amber-500 text-amber-500"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className={`leading-relaxed mb-8 text-base transition-colors duration-300 ${
                    isActive ? "text-white font-medium" : "text-black font-semibold opacity-95"
                  }`}>
                    "{item.review}"
                  </p>
                </div>

                {/* Client Profile Details */}
                <div className="flex items-center gap-4 mt-auto">
                  {/* Image Avatar with fallback */}
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`h-14 w-14 rounded-full object-cover shadow-md transition-all duration-300 ${
                        isActive ? "ring-2 ring-yellow-400 scale-105" : "ring-2 ring-amber-500/30"
                      }`}
                    />
                  ) : (
                    <div className={`flex h-14 w-14 items-center justify-center rounded-full font-extrabold text-lg shadow-sm transition-all duration-300 ${
                      isActive 
                        ? "bg-yellow-400 text-black" 
                        : "bg-black text-white"
                    }`}>
                      {item.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>
                  )}

                  <div>
                    <h4 className={`font-extrabold transition-colors duration-300 ${
                      isActive ? "text-amber-400" : "text-black"
                    }`}>
                      {item.name}
                    </h4>
                    <p className={`text-sm font-semibold transition-colors duration-300 ${
                      isActive ? "text-yellow-300" : "text-amber-700"
                    }`}>
                      {item.company}
                    </p>
                  </div>
                </div>

                {/* Ambient glow inside active card */}
                {isActive && (
                  <div className="absolute inset-0 opacity-100 transition duration-500 pointer-events-none bg-gradient-to-br from-yellow-500/10 via-transparent to-amber-500/5" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Navigation Controllers */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 border border-yellow-500/30 shadow-md active:scale-95 flex items-center justify-center"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          
          {/* Progress Indicators */}
          <div className="flex items-center gap-2.5">
            {testimonials.map((_, i) => {
              const isActive = activeIndex === i;
              return (
                <motion.div
                  key={i}
                  animate={{
                    width: isActive ? 28 : 10,
                    backgroundColor: isActive ? "#eab308" : "#000000" // Yellow when active, black when inactive
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-2.5 rounded-full cursor-pointer border border-yellow-500/20"
                  onClick={() => {
                    setActiveIndex(i);
                    setIsAutoPlaying(false);
                  }}
                />
              );
            })}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 border border-yellow-500/30 shadow-md active:scale-95 flex items-center justify-center"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Bottom Metrics statistics */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-2xl border border-neutral-400/20 bg-neutral-800/10 backdrop-blur-md p-6 text-center shadow-sm">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent font-display">
              120+
            </h3>
            <p className="text-black font-bold mt-2">Happy Clients</p>
          </div>

          <div className="rounded-2xl border border-neutral-400/20 bg-neutral-800/10 backdrop-blur-md p-6 text-center shadow-sm">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent font-display">
              95%
            </h3>
            <p className="text-black font-bold mt-2">Retention Rate</p>
          </div>

          <div className="rounded-2xl border border-neutral-400/20 bg-neutral-800/10 backdrop-blur-md p-6 text-center shadow-sm">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent font-display">
              5M+
            </h3>
            <p className="text-black font-bold mt-2">Monthly Reach</p>
          </div>

          <div className="rounded-2xl border border-neutral-400/20 bg-neutral-800/10 backdrop-blur-md p-6 text-center shadow-sm">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent font-display">
              4.9/5
            </h3>
            <p className="text-black font-bold mt-2">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;