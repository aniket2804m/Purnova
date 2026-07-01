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
      className="relative bg-black py-20"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 mb-20 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white">
          Our Services
        </h2>

        <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
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
            <div className="bg-[#232323] border border-yellow-500/30 rounded-[32px] overflow-hidden shadow-[0_0_40px_rgba(255,215,0,0.08)] backdrop-blur-xl">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                
                {/* Left Content */}
                <div className="p-6 sm:p-8 md:p-14">
                  <span className="text-yellow-400 font-bold text-lg sm:text-xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h2 className="mt-4 text-2xl sm:text-3xl md:text-5xl font-bold text-white">
                    {service.title}
                  </h2>

                  <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                    {service.description}
                  </p>

                  <button
                    onClick={() => navigate(service.route)}
                    className="mt-6 sm:mt-8 bg-white hover:bg-yellow-400 transition-all duration-300 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base"
                  >
                    Explore Service ↗
                  </button>
                </div>

                {/* Right Image */}
                <div className="relative w-full h-[250px] sm:h-[300px] md:h-[500px] p-2 sm:p-4 md:p-8 lg:p-12 lg:pl-0">
                  <div className="relative w-full h-full overflow-hidden rounded-2xl md:rounded-[24px]">
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