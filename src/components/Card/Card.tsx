import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

import { services } from "../data/Card";

gsap.registerPlugin(ScrollTrigger);

const Card = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
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
      <div className="max-w-7xl mx-auto px-5 md:px-10 mb-20 text-center">
        <h2 className="text-4xl mt-10 md:text-6xl font-bold font-cinzel text-[#F5F0E8]">
          Our <span className="text-[#C9A84C]">Services</span>
        </h2>

        <p className="mt-5 font-montserrat text-[#F5F0E8]/70 max-w-2xl mx-auto text-sm sm:text-base">
          Scroll down to explore our services one by one with an immersive
          stacked card experience.
        </p>
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

                  <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg font-montserrat text-[#F5F0E8]/70 leading-relaxed">
                    {service.description}
                  </p>

                  <button
                    onClick={() => navigate(service.route)}
                    className="mt-6 sm:mt-8 bg-[#C9A84C] hover:bg-[#F5F0E8] transition-all duration-300 text-[#0A0A0A] px-6 sm:px-8 py-3.5 rounded-none font-montserrat font-semibold text-xs tracking-widest uppercase"
                  >
                    Explore Service ↗
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