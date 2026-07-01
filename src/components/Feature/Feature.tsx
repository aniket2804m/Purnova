import React, { useState } from "react";
import { motion } from "framer-motion";

import { brands } from "../data/logo";

const Feature = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Triple the brands for infinite scrolling
  const infiniteBrands = [...brands, ...brands];

  const CARD_WIDTH = 210;

  return (
    <section className="bg-[#1A1A1A] py-[50px] overflow-hidden relative border-t border-[#C9A84C]/10">
      <div className="text-center">
        <div className="w-full">
          <h2
            className="text-[#C9A84C] text-[1.75rem] font-bold font-cinzel tracking-wider mb-5 uppercase"
          >
            Trusted by Brands
          </h2>
        </div>
      </div>

      <div className="w-full py-[20px] [perspective:1700px]">
        <motion.div
          className="flex gap-[30px] p-[10px]"
          animate={isPaused ? "paused" : "animate"}
          variants={{
            animate: {
              x: [0, -(brands.length * CARD_WIDTH)],
              transition: {
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              },
            },
            paused: {},
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {infiniteBrands.map((brand, index) => (
            <motion.div
              key={index}
              className="group flex-shrink-0
w-[120px] h-[120px]
md:w-[140px] md:h-[140px]
lg:w-[160px] lg:h-[160px]
rounded-none
border
border-[#C9A84C]/25
flex items-center justify-center
bg-[#0A0A0A]
overflow-hidden"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(201, 168, 76, 0.8)",
                boxShadow: "0 0 15px rgba(201, 168, 76, 0.15)"
              }}
            >
              <a
                href={brand.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex items-center justify-center overflow-hidden"
              >
                <div className="w-[120px] h-[120px] flex items-center justify-center p-4">
                  <img
                    src={brand.image}
                    loading="lazy"
                    decoding="async"
                    alt={`Brand ${index + 1}`}
                    className="
                      max-w-full
                      max-h-full
                      object-contain
                      filter brightness-[0.9] hover:brightness-[1] transition-all duration-300
                    "
                  />
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Feature);