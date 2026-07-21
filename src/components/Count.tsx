import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import bgImg2 from "../img/background.png";

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
    <div id="count" ref={containerRef} className="relative overflow-hidden py-16 px-5 md:px-10 lg:px-20 bg-[#0A0A0A] border-t border-[#C9A84C]/15">
      {/* Background Image & Dark Glow Blend */}
      <div className="absolute inset-0">
        <img
          src={bgImg2}
          alt="Background Image"
          className="w-full h-full object-cover object-center opacity-10"
        />
        <div className="absolute inset-0 bg-black/90"></div>
      </div>

      {/* Decorative Golden / Yellow Radial Glows for premium depth */}
      <div className="absolute top-10 left-1/4 h-80 w-80 rounded-none bg-[#C9A84C]/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-none bg-[#C9A84C]/2 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header Section */}
        <div className="count-header text-center mb-16 opacity-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F0E8] font-cinzel tracking-wide">
            Why Choose <span className="text-[#C9A84C]">Purnova ?</span>
          </h2>
        </div>

        {/* Text descriptions */}
       <div className="max-w-5xl mx-auto text-center mb-20 space-y-10">

  {/* Opening Quote */}
  <p className="count-para relative inline-block text-[#C9A84C] font-cormorant italic text-2xl sm:text-3xl lg:text-4xl tracking-wide">
    <span className="absolute -left-6 -top-3 text-5xl text-[#C9A84C]/30">“</span>

    <span className="bg-gradient-to-r from-[#F7E7A8] via-[#C9A84C] to-[#F7E7A8] bg-clip-text text-transparent">
      Strategy. Creativity. Growth.
    </span>

    <span className="absolute -right-6 bottom-0 text-5xl text-[#C9A84C]/30">”</span>
  </p>

  {/* Paragraph 1 */}
  <div className="count-para border-l-2 border-[#C9A84C]/50 pl-6 text-left">
    <p className="text-[#F5F0E8]/80 font-montserrat text-base sm:text-lg lg:text-xl leading-9 tracking-wide">
      At <span className="text-[#C9A84C] font-medium">Purnova</span>, we believe great marketing isn't about being louder.
      It's about being <span className="text-white font-medium">clearer</span>,
      more <span className="text-white font-medium">memorable</span>, and
      <span className="text-[#C9A84C]"> impossible to ignore.</span>
    </p>
  </div>

  {/* Paragraph 2 */}
  <div className="count-para border-l-2 border-[#C9A84C]/40 pl-6 text-left">
    <p className="text-[#F5F0E8]/80 font-montserrat text-base sm:text-lg lg:text-xl leading-9 tracking-wide">
      We partner with businesses that want more than
      <span className="text-[#C9A84C]"> likes</span> and
      <span className="text-[#C9A84C]"> impressions</span>.
      They want stronger brands, better customer connections,
      qualified leads, and
      <span className="text-white font-medium"> sustainable growth.</span>
    </p>
  </div>

  {/* Paragraph 3 */}
  <div className="count-para border-l-2 border-[#C9A84C]/40 pl-6 text-left">
    <p className="text-[#F5F0E8]/80 font-montserrat text-base sm:text-lg lg:text-xl leading-9 tracking-wide">
      That's why every project begins with
      <span className="text-[#C9A84C]"> strategy</span>,
      is powered by
      <span className="text-[#C9A84C]"> creativity</span>,
      and is measured by
      <span className="text-white font-medium"> results.</span>
    </p>
  </div>

  {/* Paragraph 4 */}
  <div className="count-para border-l-2 border-[#C9A84C]/40 pl-6 text-left">
    <p className="text-[#F5F0E8]/80 font-montserrat text-base sm:text-lg lg:text-xl leading-9 tracking-wide">
      From
      <span className="text-[#C9A84C]"> branding</span> and
      <span className="text-[#C9A84C]"> content</span> to
      <span className="text-white font-medium"> websites</span> and
      <span className="text-white font-medium"> performance marketing</span>,
      we build systems that help businesses grow today and stay relevant tomorrow.
    </p>
  </div>

  {/* Closing Quote */}
  <div className="count-para pt-6">
    <p className="font-cormorant italic text-xl sm:text-2xl lg:text-3xl leading-relaxed">
      <span className="bg-gradient-to-r from-[#C9A84C] via-[#F7E7A8] to-[#C9A84C] bg-clip-text text-transparent">
        “Because marketing should do more than look good.
        <br />
        It should move your business forward.”
      </span>
    </p>
  </div>

</div>

        {/* Count Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((item, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <motion.div
                key={index}
                className={`count-card group relative overflow-hidden rounded-none p-8 text-center transition-all duration-500 cursor-pointer select-none border opacity-0 ${
                  isHovered
                    ? "bg-[#101010] border-[#C9A84C] shadow-[0_15px_40px_rgba(201,168,76,0.1)] backdrop-blur-lg scale-[1.05] z-10"
                    : "bg-[#101010] border-[#C9A84C]/15 backdrop-blur-md scale-100"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileTap={{ scale: 0.98 }}
              >
                {/* Large Background Suffix */}
                <div className={`absolute -bottom-6 right-2 text-8xl font-black transition-colors duration-500 pointer-events-none select-none ${
                  isHovered ? "text-[#C9A84C]/15" : "text-[#C9A84C]/5"
                }`}>
                  {item.suffix}
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold mb-4 text-[#00A878]">
                  <CountUp
                    end={item.number}
                    duration={3}
                    suffix={item.suffix}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </h3>

                <p className="text-base sm:text-lg font-cinzel font-bold mb-1 text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors duration-300">
                  {item.title}
                </p>

                <p className="text-xs font-montserrat text-[#F5F0E8]/50">
                  {item.subtitle}
                </p>

                {/* Ambient internal light */}
                {isHovered && (
                  <div className="absolute inset-0 opacity-100 transition duration-500 pointer-events-none bg-gradient-to-br from-[#C9A84C]/5 via-transparent to-transparent" />
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
