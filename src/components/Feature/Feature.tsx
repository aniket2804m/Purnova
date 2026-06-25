import React, { useState } from "react";
import { motion } from "framer-motion";

import { brands } from "../data/logo";

const Feature = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Triple the brands for infinite scrolling
  const infiniteBrands = [...brands, ...brands];

  const CARD_WIDTH = 210;

  return (
    <section className="bg-black py-[30px] overflow-hidden relative">
      <div className="mb-[10px] text-center">
        <div className="w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2rem] font-extrabold font-display text-white tracking-[-0.02em]"
          >
            Trusted by Brands
          </motion.h1>
        </div>
      </div>

      <div className="w-full py-[10px] [perspective:1500px]">
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
              className="group flex-shrink-0 w-[150px] flex-[0_0_150px] h-[60px] md:flex-[0_0_160px] md:w-[160px] md:h-[100px] lg:flex-[0_0_179px] lg:w-[259px] lg:h-[80px] border-[1.5px] border-primary/10 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-500 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d] cursor-pointer shadow-[0_8px_25px_-5px_rgba(0,0,0,0.1),0_4px_10px_-5px_rgba(0,0,0,0.04)] hover:bg-white hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3),0_10px_30px_-5px_hsl(var(--primary)/0.2)]"
              whileHover={{
                scale: 1.05,
                rotateY: 15,
                rotateX: 5,
              }}
            >
              <a
                href={brand.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex items-center justify-center overflow-hidden"
              >
                <img
                  src={brand.image}
                  alt={`Brand ${index + 1}`}
                  className="w-auto h-auto max-w-[130px] max-h-[42px] md:max-w-[190px] md:max-h-[80px] object-contain object-center transition-all duration-500 ease-out [transform:translateZ(20px)] block group-hover:[transform:translateZ(35px)_scale(1.05)] group-hover:filter group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.45)] group-hover:drop-shadow-[0_0_12px_hsl(var(--secondary)/0.25)]"
                />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Feature);