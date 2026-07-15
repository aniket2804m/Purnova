import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Background Image import
import bgImg2 from "../../img/background.png";

// Real client/team images from src/img/Imgh
import TejasImg from "../../img/Imgh/Tejas.jpg.jpeg";
import AnushkaImg from "../../img/Imgh/Anushka.jpg.jpeg";
import PratapImg from "../../img/Imgh/Pratap.jpg.jpeg";

const testimonials = [
  {
    name: "Tejas",
    company: "E-Commerce Founder",
    image: TejasImg,
    review:
      "Working with this team completely transformed our online presence. Within just a few months, our revenue increased significantly and customer acquisition became much more efficient.",
  },
  {
    name: "Anushka",
    company: "Healthcare Clinic Owner",
    image: AnushkaImg,
    review:
      "Their SEO and advertising strategy helped us attract more local patients than ever before. The results were measurable, transparent, and exceeded our expectations.",
  },
  {
    name: "Pratap",
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
    }, 2000);
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
    <section className="relative overflow-hidden py-20 px-5 md:px-10 lg:px-20 bg-[#0A0A0A] border-t border-[#C9A84C]/10 font-montserrat">
      {/* Background Image & Dark Glow Blend */}
      <div className="absolute inset-0 -z-10">
        <img
          src={bgImg2}
          alt="Background Image"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-10"
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/95 backdrop-blur-sm"></div>
      </div>

      {/* Decorative Golden / Yellow Radial Glows for premium depth */}
      <div className="absolute top-10 left-1/4 h-80 w-80 rounded-none bg-[#C9A84C]/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-none bg-[#C9A84C]/2 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F0E8] font-cinzel tracking-wide leading-tight">
            The Brands Behind {" "}
            <span className="text-[#C9A84C]">
              The Success Stories
            </span>
          </h2>

          <p className="mt-6 max-w-6xl mx-auto text-[#F5F0E8] font-light text-base md:text-lg leading-relaxed">
            Real feedback from clients who partnered with us to scale their
            business, increase revenue, and build a stronger digital presence.Every partnership begins with a goal. More visibility. Better leads. Stronger positioning. Greater growth. Here's what our clients have to say about the journey and the results we created together.
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
                className={`group relative overflow-hidden rounded-none p-8 transition-all duration-500 cursor-pointer select-none flex flex-col justify-between ${
                  isActive
                    ? "bg-[#101010] border-2 border-[#C9A84C] shadow-[0_20px_50px_rgba(201,168,76,0.15)] backdrop-blur-lg scale-[1.03] z-10"
                    : "bg-[#101010]/40 border border-[#C9A84C]/10 backdrop-blur-md opacity-60 md:opacity-80 scale-100 hover:opacity-100 hover:bg-[#101010]/60 hover:border-[#C9A84C]/30"
                } ${isActive ? "block" : "hidden md:flex"}`}
              >
                {/* Quote Icon */}
                <div className={`absolute top-4 right-6 text-7xl font-bold font-serif leading-none transition-colors duration-300 ${
                  isActive ? "text-[#C9A84C]/10" : "text-[#F5F0E8]/3"
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
                            ? "fill-[#C9A84C] text-[#C9A84C]" 
                            : "fill-[#C9A84C]/60 text-[#C9A84C]/60"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className={`leading-relaxed mb-8 text-base font-light transition-colors duration-300 ${
                    isActive ? "text-[#F5F0E8]" : "text-[#F5F0E8]/70"
                  }`}>
                    "{item.review}"
                  </p>
                </div>

                {/* Client Profile Details */}
                <div className="flex items-center gap-4 mt-auto font-montserrat">
                  {/* Image Avatar with fallback */}
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className={`h-14 w-14 rounded-none object-cover shadow-md transition-all duration-300 ${
                        isActive ? "ring-2 ring-[#C9A84C] scale-105" : "ring-2 ring-[#C9A84C]/30"
                      }`}
                    />
                  ) : (
                    <div className={`flex h-14 w-14 items-center justify-center rounded-none font-bold text-lg shadow-sm transition-all duration-300 ${
                      isActive 
                        ? "bg-[#C9A84C] text-[#0A0A0A]" 
                        : "bg-[#101010] text-[#F5F0E8]"
                    }`}>
                      {item.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>
                  )}

                  <div>
                    <h4 className={`font-bold font-cinzel transition-colors duration-300 ${
                      isActive ? "text-[#C9A84C]" : "text-[#F5F0E8]/90"
                    }`}>
                      {item.name}
                    </h4>
                    <p className={`text-xs uppercase tracking-wider transition-colors duration-300 ${
                      isActive ? "text-[#F5F0E8]/90" : "text-[#C9A84C]/75"
                    }`}>
                      {item.company}
                    </p>
                  </div>
                </div>

                {/* Ambient glow inside active card */}
                {isActive && (
                  <div className="absolute inset-0 opacity-100 transition duration-500 pointer-events-none bg-gradient-to-br from-[#C9A84C]/8 via-transparent to-[#C9A84C]/3" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Navigation Controllers */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={handlePrev}
            className="p-3 rounded-none bg-[#0A0A0A] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-300 border border-[#C9A84C]/40 shadow-md active:scale-95 flex items-center justify-center"
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
                    backgroundColor: isActive ? "#C9A84C" : "#1A1A1A"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-2 rounded-none cursor-pointer border border-[#C9A84C]/20"
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
            className="p-3 rounded-none bg-[#0A0A0A] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-300 border border-[#C9A84C]/40 shadow-md active:scale-95 flex items-center justify-center"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Bottom Metrics statistics */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 font-montserrat">
          <div className="rounded-none border border-[#C9A84C]/15 bg-[#101010]/60 backdrop-blur-md p-6 text-center shadow-sm">
            <h3 className="text-3xl font-bold text-[#00A878] font-cinzel">
              120+
            </h3>
            <p className="text-[#F5F0E8]/80 font-light mt-2">Happy Clients</p>
          </div>

          <div className="rounded-none border border-[#C9A84C]/15 bg-[#101010]/60 backdrop-blur-md p-6 text-center shadow-sm">
            <h3 className="text-3xl font-bold text-[#00A878] font-cinzel">
              95%
            </h3>
            <p className="text-[#F5F0E8]/80 font-light mt-2">Retention Rate</p>
          </div>

          <div className="rounded-none border border-[#C9A84C]/15 bg-[#101010]/60 backdrop-blur-md p-6 text-center shadow-sm">
            <h3 className="text-3xl font-bold text-[#00A878] font-cinzel">
              5M+
            </h3>
            <p className="text-[#F5F0E8]/80 font-light mt-2">Monthly Reach</p>
          </div>

          <div className="rounded-none border border-[#C9A84C]/15 bg-[#101010]/60 backdrop-blur-md p-6 text-center shadow-sm">
            <h3 className="text-3xl font-bold text-[#00A878] font-cinzel">
              4.9/5
            </h3>
            <p className="text-[#F5F0E8]/80 font-light mt-2">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
