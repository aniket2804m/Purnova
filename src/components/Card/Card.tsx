import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion} from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

import { services } from "../data/Card";

gsap.registerPlugin(ScrollTrigger);

const Card = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".stack-card");

      cards.forEach((card: any, index) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: () => window.innerWidth < 768 ? "top 80px" : "top 120px",
            endTrigger: containerRef.current,
            end: "bottom bottom",
            scrub: true,
          },
          scale: 0.85,
          y: () => window.innerWidth < 768 ? -75 : -150,
          opacity: 0.5,
          transformOrigin: "top center",
          ease: "none",
        });
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0A0A0A] py-20 border-t border-[#C9A84C]/10"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-1/4 w-96 h-96 bg-[#C9A84C]/3 rounded-none blur-[150px]" />
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-[#C9A84C]/2 rounded-none blur-[150px]" />
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 mb-24 text-center">

  {/* Section Title */}
  <motion.h2
    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="text-4xl md:text-6xl lg:text-7xl font-bold font-cinzel text-[#F5F0E8] mt-10"
  >
    Our{" "}
    <span className="bg-gradient-to-r from-[#FFF3C4] via-[#C9A84C] to-[#A97C20] bg-clip-text text-transparent">
      Services
    </span>
  </motion.h2>

  {/* Premium Divider */}
  <motion.div
    initial={{ width: 0 }}
    whileInView={{ width: "120px" }}
    viewport={{ once: true }}
    transition={{ delay: 0.3, duration: 1 }}
    className="h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto mt-6"
  />

  {/* Tagline */}
  <motion.p
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.4, duration: 1 }}
    className="relative inline-block mt-8 font-cormorant italic text-xl sm:text-2xl lg:text-3xl"
  >
    <span className="absolute -left-6 -top-2 text-5xl text-[#C9A84C]/30">
      “
    </span>

    <span className="bg-gradient-to-r from-[#F7E7A8] via-[#C9A84C] to-[#F7E7A8] bg-clip-text text-transparent">
      Marketing Built For Growth, Not Guesswork.
    </span>

    <span className="absolute -right-6 bottom-0 text-5xl text-[#C9A84C]/30">
      ”
    </span>
  </motion.p>

  {/* Description */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.6, duration: 1 }}
    className="mt-10 max-w-5xl mx-auto"
  >
    <p className="relative border-l-2 border-[#C9A84C]/40 pl-6 text-left text-[#F5F0E8]/80 font-montserrat font-light text-base sm:text-lg lg:text-xl leading-[2] tracking-wide hover:text-[#F5F0E8] transition-all duration-500">

      <span className="absolute -left-[5px] top-3 w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse"></span>

      Every business has different{" "}
      <span className="text-[#C9A84C] font-medium">goals</span>,{" "}
      <span className="text-[#C9A84C] font-medium">challenges</span>, and{" "}
      <span className="text-[#C9A84C] font-medium">opportunities</span>.

      That's why we combine{" "}
      <span className="text-white font-medium">strategy</span>,{" "}
      <span className="text-white font-medium">creativity</span>,{" "}
      <span className="text-white font-medium">technology</span>, and{" "}
      <span className="text-white font-medium">performance marketing</span>{" "}
      to create solutions that help brands{" "}
      <span className="text-[#C9A84C]">attract attention</span>,{" "}
      <span className="text-[#C9A84C]">generate demand</span>, and drive{" "}
      <span className="bg-gradient-to-r from-[#FFF3C4] via-[#C9A84C] to-[#A97C20] bg-clip-text text-transparent font-semibold">
        measurable growth.
      </span>
    </p>
  </motion.div>

</div>

      {/* Cards */}
      <div className="relative flex flex-col items-center gap-16 md:gap-24 max-w-7xl mx-auto pb-32">
        {services.map((service, index) => (
          <div
            key={index}
            className="stack-card sticky w-[92%] sm:w-[90%] max-w-6xl top-[80px] md:top-[120px]"
            style={{
              zIndex: index + 1,
            }}
          >
            <div className="bg-[#101010] border border-[#C9A84C]/15 rounded-none overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                
                {/* Left Content */}
                <div className="p-6 sm:p-8 md:p-14">
                  <span className="text-[#C9A84C] font-montserrat font-bold text-lg sm:text-xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-4 text-2xl sm:text-3xl md:text-5xl font-bold font-cinzel text-[#F5F0E8] tracking-wide">
                    {service.title}
                  </h3>

                 {/* Short Tagline */}
<p className="mt-6 inline-flex items-center gap-3 text-[#C9A84C] font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm">
  <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse"></span>
  {service.short}
</p>

{/* Description */}
<p className="mt-6 border-l border-[#C9A84C]/40 pl-5 text-[#F5F0E8]/75 font-montserrat text-sm sm:text-base md:text-lg leading-8 tracking-wide">
  {service.description}
</p>

                  <button
                    onClick={() => navigate(service.route)}
                    className="mt-6 sm:mt-8 bg-[#C9A84C] hover:bg-[#F5F0E8] transition-all duration-300 text-[#0A0A0A] px-6 sm:px-8 py-3.5 rounded-none font-montserrat font-semibold text-xs tracking-widest uppercase"
                  >
                    {service.explore}↗
                  </button>
                </div>

                {/* Right Image */}
                <div className="relative w-full h-[250px] sm:h-[300px] md:h-[500px] p-2 sm:p-4 md:p-8 lg:p-12 lg:pl-0">
                  <div className="relative w-full h-full overflow-hidden rounded-none">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Card;