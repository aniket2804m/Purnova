import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import bgImg2 from "../img/bgImg1.png";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    number: 5000,
    suffix: "+",
    title: "Projects",
    subtitle: "Completed",
  },
  {
    number: 50,
    suffix: "+",
    title: "Happy",
    subtitle: "Clients",
  },
  {
    number: 6,
    suffix: "x",
    title: "Average ROI",
    subtitle: "Growth",
  },
  {
    number: 3,
    suffix: "+",
    title: "Years of",
    subtitle: "Experience",
  },
];

const Count = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = containerRef.current?.querySelector(".count-header");
    const paragraphs = containerRef.current?.querySelectorAll(".count-para");
    const cards = containerRef.current?.querySelectorAll(".count-card");

    const ctx = gsap.context(() => {
      // Header animation
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%"
            }
          }
        );
      }

      // Paragraph animation
      if (paragraphs && paragraphs.length > 0) {
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%"
            }
          }
        );
      }

      // Cards stagger animation
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.93 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%"
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="count" ref={containerRef} className="relative overflow-hidden py-8 px-5 md:px-10 lg:px-20 bg-white">
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
        {/* Header Section */}
        <div className="count-header text-center mb-16 opacity-0">
        
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black font-display tracking-tight">
            
            <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
            Why Choose Purnova ?
            </span>
          </h2>
        </div>

        {/* Text descriptions */}
        <div className="max-w-5xl mx-auto text-center mb-16 space-y-6">
          <p className="count-para text-black font-extrabold text-lg sm:text-xl lg:text-2xl leading-relaxed opacity-95">
            "Purnova Where the most ambitious brands come to become unforgettable."
          </p>

          <p className="count-para text-black font-bold text-sm sm:text-base lg:text-lg leading-relaxed opacity-85">
            We don’t look at your business as a checklist of deliverables; we see it as an unfolding legacy. We take the raw, powerful architecture of what you’ve built and breathe an undeniable, modern force into it aligning your strategy, your creative, and your scale until they command the entire landscape.
            The era of merely competing is over. It is time to occupy the space only you can inhabit.
            Stop chasing the market. Become the standard.
          </p>
        </div>

        {/* Count Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((item, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <motion.div
                key={index}
                className={`count-card group relative overflow-hidden rounded-3xl p-8 text-center transition-all duration-500 cursor-pointer select-none border opacity-0 ${
                  isHovered
                    ? "bg-neutral-900/60 border-yellow-500 shadow-[0_20px_50px_rgba(234,179,8,0.25)] backdrop-blur-lg scale-[1.05] z-10"
                    : "bg-neutral-800/10 border-neutral-400/20 backdrop-blur-md scale-100 hover:bg-neutral-800/15"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileTap={{ scale: 0.98 }}
              >
                {/* Large Background Suffix */}
                <div className={`absolute -bottom-6 right-2 text-8xl font-black transition-colors duration-500 opacity-10 pointer-events-none select-none ${
                  isHovered ? "text-yellow-400/25" : "text-black/10"
                }`}>
                  {item.suffix}
                </div>

                <h3 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-4 transition-all duration-300 ${
                  isHovered
                    ? "text-yellow-400"
                    : "bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-500 bg-clip-text text-transparent"
                }`}>
                  <CountUp
                    end={item.number}
                    duration={3}
                    suffix={item.suffix}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </h3>

                <p className={`text-lg sm:text-xl font-extrabold mb-1 transition-colors duration-300 ${
                  isHovered ? "text-white" : "text-black"
                }`}>
                  {item.title}
                </p>

                <p className={`text-sm font-semibold transition-colors duration-300 ${
                  isHovered ? "text-yellow-300/90" : "text-black/70"
                }`}>
                  {item.subtitle}
                </p>

                {/* Ambient internal light */}
                {isHovered && (
                  <div className="absolute inset-0 opacity-100 transition duration-500 pointer-events-none bg-gradient-to-br from-yellow-500/5 via-transparent to-amber-500/5" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Count;
